import * as moment from "moment";
import "rxjs/add/observable/never";
import "rxjs/add/operator/delay";
import { Subject } from "rxjs/Subject";
import { tg } from "../../components/App";
import { API } from "../Codegen/API/APISchema";
import { convenienceMessageFor } from "../Convenience/MessageFor";
import { combineHash } from "../DataStructures/HashMap/Combine";
import { Hashable } from "../DataStructures/HashMap/Hashable";
import { HashMap } from "../DataStructures/HashMap/HashMap";
import { DataCenter } from "../Session/DataCenter";
import { PersistentStorage } from "../Storage/PersistentStorage";
import { TLInt } from "../TL/Types/TLInt";
import { TLVector } from "../TL/Types/TLVector";
import { Update } from "./Update";

export class UpdatesHandler {
    private state: UpdatesState = {
        date: 0,
        pts: 0,
        qts: 0,
        seq: 0,
    };
    private shouldSyncState = false;
    readonly updates = new Subject<Update>();

    constructor(private readonly dataCenter: DataCenter,
                private readonly storage: PersistentStorage.Storage) {
        this.storage.readUpdatesState().subscribe(state => {
            if (state) {
                this.state = state;
            }
        });
        setInterval(() => {
            if (this.shouldSyncState) {
                this.shouldSyncState = false;
                this.obtainUpdatesDifference();
            }
        }, 5000);
    }

    feedUpdates(updates: API.UpdatesType | (API.UpdateShortSentMessage & { randomId: ArrayBuffer })) {
        switch (updates.constructor) {
            case API.UpdatesTooLong: {
                this.obtainUpdatesDifference();
            } break;

            case API.UpdateShortMessage: {
                const update = updates as API.UpdateShortMessage;
                this.storage.readMyUserId()
                    .filter(myUserId => !!myUserId)
                    .subscribe(myUserId => {
                        const fromId = update.out ? myUserId! : update.userId.value;
                        const toId = update.out ? update.userId.value : myUserId!;
                        const msg = new API.Message(
                            update.out,
                            update.mentioned,
                            update.mediaUnread,
                            update.silent,
                            false,
                            update.id,
                            new TLInt(fromId),
                            new API.PeerUser(new TLInt(toId)),
                            update.fwdFrom,
                            update.viaBotId,
                            update.replyToMsgId,
                            update.date,
                            update.message,
                            undefined,
                            undefined,
                            update.entities,
                            undefined,
                            undefined
                        );
                        this.processUpdate(new API.UpdateNewMessage(msg, update.pts, update.ptsCount));
                    });
            } break;

            case API.UpdateShortChatMessage: {
                const update = updates as API.UpdateShortChatMessage;
                const msg = new API.Message(
                    update.out,
                    update.mentioned,
                    update.mediaUnread,
                    update.silent,
                    false,
                    update.id,
                    update.fromId,
                    new API.PeerChat(update.chatId),
                    update.fwdFrom,
                    update.viaBotId,
                    update.replyToMsgId,
                    update.date,
                    update.message,
                    undefined,
                    undefined,
                    update.entities,
                    undefined,
                    undefined
                );

                this.processUpdate(new API.UpdateNewMessage(msg, update.pts, update.ptsCount));
            } break;

            case API.UpdateShort: {
                const update = updates as API.UpdateShort;
                this.applyUpdatesState({
                    date: update.date.value,
                });
                this.processUpdate(update.update);
            } break;

            case API.UpdatesCombined: {
                const upd = updates as API.UpdatesCombined;
                if (Math.max(upd.seq.value, upd.seqStart.value) > this.state.seq + 1) {
                    this.obtainUpdatesDifference();
                }
                this.applyUpdatesState({
                    date: upd.date.value,
                    seq: upd.seq.value,
                });
                this.processUpdates({
                    updates: upd.updates,
                    chats: upd.chats,
                    users: upd.users,
                });
            } break;

            case API.Updates: {
                const upd = updates as API.Updates;
                if (upd.seq.value > this.state.seq + 1) {
                    this.obtainUpdatesDifference();
                }
                this.applyUpdatesState({
                    date: upd.date.value,
                    seq: upd.seq.value,
                });
                this.processUpdates({
                    updates: upd.updates,
                    chats: upd.chats,
                    users: upd.users,
                });
            } break;

            case API.UpdateShortSentMessage: {
                const upd = updates as API.UpdateShortSentMessage & { randomId: ArrayBuffer };
                this.applyUpdatesState({
                    date: upd.date.value,
                });
                this.processUpdate(upd);
            } break;
        }
    }

    syncUpdatesState() {
        if (this.state.pts === 0) {
            this.dataCenter.call(new API.updates.GetState()).subscribe(
                (state: API.updates.State) => {
                    this.applyUpdatesState({
                        date: state.date.value,
                        pts: state.pts.value,
                        qts: state.qts.value,
                        seq: state.seq.value,
                    });
                });
        } else {
            this.obtainUpdatesDifference();
        }
    }

    private applyUpdatesState(state: Partial<UpdatesState>) {
        this.state = { ...this.state, ...state };
        this.storage.writeUpdatesState(this.state).subscribe();
    }

    private obtainUpdatesDifference() {
        const getDifference = new API.updates.GetDifference(
            new TLInt(this.state.pts),
            undefined,
            new TLInt(this.state.date),
            new TLInt(this.state.qts));
        this.dataCenter.call(getDifference)
            .do(diff => {
                let otherUpdates: Array<API.UpdateType> = [];
                if (diff instanceof API.updates.Difference) {
                    otherUpdates = diff.otherUpdates.items;
                } else if (diff instanceof API.updates.DifferenceSlice) {
                    otherUpdates = diff.otherUpdates.items;
                }
                const randomIds = otherUpdates
                    .filter(upd => upd instanceof API.UpdateMessageID)
                    .map(upd => (upd as API.UpdateMessageID).randomId.serialized().buffer);

                this.storage.clearMessageRandomIds(randomIds)
                    .subscribe();
            })
            .subscribe(
            diff => {
                if (diff instanceof API.updates.DifferenceEmpty) {
                    this.applyUpdatesState({
                        date: diff.date.value,
                        seq: diff.seq.value,
                    });
                } else if (diff instanceof API.updates.Difference) {
                    this.applyUpdatesState({
                        date: diff.state.date.value,
                        pts: diff.state.pts.value,
                        qts: diff.state.qts.value,
                        seq: diff.state.seq.value,
                    });
                    this.processUpdates({
                        messages: diff.newMessages,
                        updates: diff.otherUpdates,
                        chats: diff.chats,
                        users: diff.users,
                    });
                } else if (diff instanceof API.updates.DifferenceSlice) {
                    this.applyUpdatesState({
                        date: diff.intermediateState.date.value,
                        pts: diff.intermediateState.pts.value,
                        qts: diff.intermediateState.qts.value,
                        seq: diff.intermediateState.seq.value,
                    });
                    this.processUpdates({
                        messages: diff.newMessages,
                        updates: diff.otherUpdates,
                        chats: diff.chats,
                        users: diff.users,
                    });
                    this.obtainUpdatesDifference();
                }
            });
    }

    private processUpdates(updates: Partial<{
        messages: TLVector<API.MessageType>,
        updates: TLVector<API.UpdateType>,
        chats: TLVector<API.ChatType>,
        users: TLVector<API.UserType>
    }>) {
        if (updates.messages) {
            for (let message of updates.messages.items) {
                let updMsgId: API.UpdateMessageID | undefined = undefined;
                if (updates.updates) {
                    updMsgId = updates.updates.items.find(upd =>
                        upd instanceof API.UpdateMessageID &&
                        upd.id.equals(message.id)) as API.UpdateMessageID;
                }
                if (updMsgId) {
                    this.storage.readMessages(updMsgId.randomId.serialized().buffer)
                        .map(msgs => msgs[0])
                        .subscribe(msg => {
                            if (msg && (msg instanceof API.Message || msg instanceof API.MessageService)) {
                                const upd = new API.UpdateShortSentMessage(
                                    msg.out,
                                    message.id,
                                    new TLInt(0),
                                    new TLInt(0),
                                    msg.date,
                                    msg instanceof API.Message ? msg.media : undefined,
                                    msg instanceof API.Message ? msg.entities : undefined,
                                );
                                Object.assign(upd, { randomId: updMsgId!.randomId.serialized().buffer });
                                this.applyUpdate(upd);
                            } else {
                                this.storage.readMessages(message.id.value)
                                    .map(msgs => msgs[0])
                                    .subscribe(msg => {
                                        if (!msg) {
                                            this.applyUpdate(new API.UpdateNewMessage(
                                                message, new TLInt(0), new TLInt(0)));
                                        }
                                    })
                            }
                        });
                } else {
                    this.applyUpdate(new API.UpdateNewMessage(
                        message, new TLInt(0), new TLInt(0)));
                }
            }
        }
        if (updates.chats) {
            this.storage.writeChats(...updates.chats.items).subscribe();
        }
        if (updates.users) {
            this.storage.writeUsers(...updates.users.items).subscribe();
        }

        if (updates.updates) {
            for (let update of updates.updates.items) {
                if (update instanceof API.UpdateNewMessage) {
                    const updMsgId = updates.updates.items.find(upd =>
                        upd instanceof API.UpdateMessageID &&
                        upd.id.equals((update as API.UpdateNewMessage).message.id)) as API.UpdateMessageID;
                    if (updMsgId && (update.message instanceof API.Message || update.message instanceof API.MessageService)) {
                        const upd = new API.UpdateShortSentMessage(
                            update.message.out,
                            update.message.id,
                            update.pts,
                            update.ptsCount,
                            update.message.date,
                            update.message instanceof API.Message ? update.message.media : undefined,
                            update.message instanceof API.Message ? update.message.entities : undefined,
                        );
                        Object.assign(upd, { randomId: updMsgId.randomId.serialized().buffer });
                        this.processUpdate(upd);
                    } else {
                        this.processUpdate(update);
                    }
                } else {
                    this.processUpdate(update);
                }
            }
        }

        if (updates.chats) {
            for (let chat of updates.chats.items) {
                if (chat instanceof API.Chat) {
                    this.updates.next(new Update.Chat(chat));
                } else if (chat instanceof API.ChatForbidden) {
                    this.updates.next(new Update.Chat(chat));
                } else if (chat instanceof API.Channel) {
                    this.updates.next(new Update.Channel(chat));
                } else if (chat instanceof API.ChannelForbidden) {
                    this.updates.next(new Update.Channel(chat));
                }
            }
        }

        if (updates.users) {
            for (let user of updates.users.items) {
                if (user instanceof API.User) {
                    this.updates.next(new Update.User(user));
                }
            }
        }
    }

    private processUpdate(update: API.UpdateType | (API.UpdateShortSentMessage & { randomId: ArrayBuffer })) {
        const meta = UpdatesHandler.metadataForUpdate(update);
        if (meta) {
            const pts = meta.pts;
            const ptsCount = meta.ptsCount;

            if (this.state.pts + ptsCount !== pts) {
                this.shouldSyncState = true;
                return;
            } else {
                this.applyUpdatesState({
                    pts: pts,
                });
            }
        }

        this.applyUpdate(update);
    }

    applyUpdate(update: API.UpdateType | (API.UpdateShortSentMessage & { randomId: ArrayBuffer })) {
        switch (update.constructor) {
            case API.UpdateNewMessage: {
                const message = (update as API.UpdateNewMessage).message;
                const fromId = (message as API.Message & API.MessageService)
                    .fromId;
                if (!fromId) break;

                this.storage.writeMessages(message)
                    .flatMap(() => this.storage.readUsers(fromId.value))
                    .flatMap(users => users)
                    .map(user => {
                        return convenienceMessageFor(message, user);
                    })
                    .do(msg => {
                        if (msg) {
                            this.updates.next(new Update.NewMessage(msg));
                        }
                    })
                    .subscribe();
            } break;

            case API.UpdateMessageID: {
                // ignore
            } break;

            case API.UpdateShortSentMessage: {
                const upd = update as API.UpdateShortSentMessage & { randomId: ArrayBuffer };

                this.storage.updateMessage(upd.randomId, {
                    id: upd.id,
                    date: upd.date,
                    entities: upd.entities,
                    media: upd.media,
                }).flatMap(msg => {
                    if (msg instanceof API.Message || msg instanceof API.MessageService) {
                        if (msg.fromId) {
                            return this.storage.readUsers(msg.fromId.value)
                                .map(users => [msg, users[0]]);
                        }
                    }
                    throw new Error();
                }).map(msgUser => {
                    if (msgUser && msgUser[1]) {
                        return convenienceMessageFor(msgUser[0], msgUser[1]);
                    }
                    return undefined;
                }).subscribe(msg => {
                    if (msg) {
                        Object.assign(msg, { randomId: upd.randomId });
                        this.updates.next(new Update.EditMessage(msg));
                    }
                });
            } break;

            case API.UpdateDeleteMessages: {
                const ids = (update as API.UpdateDeleteMessages).messages
                    .items.map(id => id.value);
                this.storage.deleteMessages(...ids)
                    .map(msgs => {
                        const map = new HashMap<HashablePeer, Array<number>>();
                        for (let msg of msgs) {
                            const peer = new HashablePeer(msg.peer);
                            const list = map.get(peer);
                            if (list) {
                                list.push(msg.msgId);
                            } else {
                                map.put(peer, [msg.msgId]);
                            }
                        }
                        return map;
                    })
                    .do(map => {
                        map.keys.map(peer => {
                            tg.getMessageHistory(peer.peer, 1)
                                .flatMap(msgs => msgs)
                                .subscribe(msg => {
                                    if (msg) {
                                        this.updates.next(new Update.TopMessage(msg));
                                    }
                                })
                        });
                    })
                    .subscribe(map => {
                        this.updates.next(new Update.DeleteMessages(map));
                    });
            } break;

            case API.UpdateUserTyping:
            case API.UpdateChatUserTyping: {
                const upd = update as API.UpdateUserTyping & API.UpdateChatUserTyping;
                let peer: API.PeerChat | API.PeerUser;
                if (upd.chatId) {
                    peer = new API.PeerChat(upd.chatId);
                } else {
                    peer = new API.PeerUser(upd.userId);
                }

                this.storage.readUsers(upd.userId.value)
                    .map(users => users[0])
                    .subscribe(user => {
                        if (user instanceof API.User) {
                            this.updates.next(
                                new Update.UserTyping(
                                    peer,
                                    user,
                                    upd.action,
                                    moment().unix() + tg.offlineBlurTimeout / 1000));
                        }
                    });
            } break;

            case API.UpdateChatParticipants:
                // TODO
                break;

            case API.UpdateUserStatus: {
                const upd = update as API.UpdateUserStatus;
                this.storage.updateUser(upd.userId.value, { status: upd.status })
                    .subscribe(user => {
                        if (user) {
                            this.updates.next(new Update.User(user));
                        }
                    });
            } break;

            case API.UpdateUserName: {
                const upd = update as API.UpdateUserName;
                this.storage.updateUser(upd.userId.value, {
                    firstName: upd.firstName,
                    lastName: upd.lastName,
                    username: upd.firstName,
                }).subscribe(user => {
                    if (user) {
                        this.updates.next(new Update.User(user));
                    }
                });
            } break;

            case API.UpdateUserPhoto: {
                const upd = update as API.UpdateUserPhoto;
                this.storage.updateUser(upd.userId.value, {
                    photo: upd.photo,
                }).subscribe(user => {
                    if (user) {
                        this.updates.next(new Update.User(user));
                    }
                });
            } break;

            case API.UpdateContactRegistered: {
                // TODO
            } break;

            case API.UpdateContactLink: {
                // TODO
            } break;

            case API.UpdateNewEncryptedMessage:
                break;

            case API.UpdateEncryptedChatTyping:
                break;

            case API.UpdateEncryption:
                break;

            case API.UpdateEncryptedMessagesRead:
                break;

            case API.UpdateChatParticipantAdd: {
                // TODO
            } break;

            case API.UpdateChatParticipantDelete: {
                // TODO
            } break;

            case API.UpdateDcOptions: {
                // TODO
            } break;

            case API.UpdateUserBlocked: {
                // TODO
            } break;

            case API.UpdateNotifySettings: {
                // TODO
            } break;

            case API.UpdateServiceNotification: {
                // TODO
            } break;

            case API.UpdatePrivacy: {
                // TODO
            } break;

            case API.UpdateUserPhone: {
                const upd = update as API.UpdateUserPhone;
                this.storage.updateUser(upd.userId.value, {
                    phone: upd.phone,
                }).subscribe(user => {
                    if (user) {
                        this.updates.next(new Update.User(user));
                    }
                });
            } break;

            case API.UpdateReadHistoryInbox: {
                const upd = update as API.UpdateReadHistoryInbox;
                this.storage.updateDialog(upd.peer, { readInboxMaxId: upd.maxId })
                    .subscribe(() => {
                        this.updates.next(new Update.ReadHistoryInbox(upd.peer, upd.maxId.value));
                    });
            } break;

            case API.UpdateReadHistoryOutbox: {
                const upd = update as API.UpdateReadHistoryOutbox;
                this.storage.updateDialog(upd.peer, { readOutboxMaxId: upd.maxId })
                    .subscribe(() => {
                        this.updates.next(new Update.ReadHistoryOutbox(upd.peer, upd.maxId.value));
                    });
            } break;

            case API.UpdateWebPage: {
                // TODO
            } break;

            case API.UpdateReadMessagesContents: {
                const upd = update as API.UpdateReadMessagesContents;
                for (let msgId of upd.messages.items) {
                    this.storage.updateMessage(msgId.value, {
                        mediaUnread: false,
                    }).flatMap(msg => {
                        if (msg instanceof API.Message || msg instanceof API.MessageService) {
                            if (msg.fromId) {
                                return this.storage.readUsers(msg.fromId.value)
                                    .map(users => [msg, users[0]]);
                            }
                        }
                        throw new Error();
                    }).map(msgUser => {
                        if (msgUser && msgUser[1]) {
                            return convenienceMessageFor(msgUser[0], msgUser[1]);
                        }
                        return undefined;
                    }).subscribe(msg => {
                        if (msg) {
                            this.updates.next(new Update.EditMessage(msg));
                        }
                    });
                }
            } break;

            case API.UpdateChannelTooLong: {
                // TODO
            } break;

            case API.UpdateChannel: {
                // TODO
            } break;

            case API.UpdateNewChannelMessage: {
                // TODO
            } break;

            case API.UpdateReadChannelInbox: {
                // TODO
            } break;

            case API.UpdateDeleteChannelMessages: {
                // TODO
            } break;

            case API.UpdateChannelMessageViews: {
                // TODO
            } break;

            case API.UpdateChatAdmins: {
                // TODO
            } break;

            case API.UpdateChatParticipantAdmin: {
                // TODO
            } break;

            case API.UpdateNewStickerSet: {
                // TODO
            } break;

            case API.UpdateStickerSetsOrder: {
                // TODO
            } break;

            case API.UpdateStickerSets: {
                // TODO
            } break;

            case API.UpdateSavedGifs: {
                // TODO
            } break;

            case API.UpdateBotInlineQuery: {
                // TODO
            } break;

            case API.UpdateBotInlineSend: {
                // TODO
            } break;

            case API.UpdateEditChannelMessage: {
                // TODO
            } break;

            case API.UpdateChannelPinnedMessage: {
                // TODO
            } break;

            case API.UpdateBotCallbackQuery: {
                // TODO
            } break;

            case API.UpdateEditMessage: {
                const message = (update as API.UpdateEditMessage).message;
                const fromId = (message as API.Message & API.MessageService)
                    .fromId;
                if (!fromId) break;

                this.storage.writeMessages(message)
                    .flatMap(any => this.storage.readUsers(fromId.value))
                    .flatMap(users => users)
                    .map(user => {
                        return convenienceMessageFor(message, user);
                    })
                    .subscribe(msg => {
                        if (msg) {
                            this.updates.next(new Update.EditMessage(msg));
                        }
                    });
            } break;

            case API.UpdateInlineBotCallbackQuery: {
                // TODO
            } break;

            case API.UpdateReadChannelOutbox: {
                // TODO
            } break;

            case API.UpdateDraftMessage: {
                const upd = update as API.UpdateDraftMessage;
                this.updates.next(new Update.DraftMessage(upd.peer, upd.draft));
            } break;

            case API.UpdateReadFeaturedStickers: {
                // TODO
            } break;

            case API.UpdateRecentStickers: {
                // TODO
            } break;

            case API.UpdateConfig: {
                // TODO
            } break;

            case API.UpdatePtsChanged:
                break;

            default:
                throw new Error();
        }
    }

    private static metadataForUpdate(update: API.UpdateType | API.UpdateShortSentMessage): { pts: number, ptsCount: number, channel: boolean } | undefined {
        let channel = false;
        let pts: TLInt = (update as any).pts;
        let ptsCount: TLInt = (update as any).ptsCount || new TLInt(0);

        if (pts) {
            return {
                pts: pts.value,
                ptsCount: ptsCount.value,
                channel: channel,
            }
        }

        return undefined;
    }
}

interface UpdatesState {
    date: number;
    pts: number;
    qts: number;
    seq: number;
}

export class HashablePeer implements Hashable {
    readonly hashValue: number;

    constructor(readonly peer: API.PeerType) {
        if (peer instanceof API.PeerUser) {
            this.hashValue = combineHash("u".charCodeAt(0), peer.userId.hashValue);
        } else if (peer instanceof API.PeerChat) {
            this.hashValue = combineHash("g".charCodeAt(0), peer.chatId.hashValue);
        } else if (peer instanceof API.PeerChannel) {
            this.hashValue = combineHash("c".charCodeAt(0), peer.channelId.hashValue);
        }
    }

    equals(to: HashablePeer): boolean {
        if (this.peer instanceof API.PeerUser && to.peer instanceof API.PeerUser) {
            return this.peer.userId.equals(to.peer.userId);
        } else if (this.peer instanceof API.PeerChat && to.peer instanceof API.PeerChat) {
            return this.peer.chatId.equals(to.peer.chatId);
        } else if (this.peer instanceof API.PeerChannel && to.peer instanceof API.PeerChannel) {
            return this.peer.channelId.equals(to.peer.channelId);
        }

        return false;
    }
}