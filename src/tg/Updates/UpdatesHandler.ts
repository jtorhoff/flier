import * as moment from "moment";
import "rxjs/add/observable/never";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { tg } from "../../components/App";
import { API } from "../Codegen/API/APISchema";
import { convenienceMessageFor } from "../Convenience/MessageFor";
import { HashMap } from "../DataStructures/HashMap/HashMap";
import { HashablePeer } from "../Hashable/HashablePeer";
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
    private shouldSyncUpdatesState = false;
    private pendingPtsUpdates: {
        pts: number,
        ptsCount: number,
        update: API.UpdatesType | API.UpdateShortSentMessage
    }[] = [];

    readonly updates = new Subject<Update>();

    constructor(private readonly dataCenter: DataCenter,
                private readonly storage: PersistentStorage.Storage) {
        this.storage.readUpdatesState().subscribe(state => {
            if (state) {
                this.state = state;
            }
        });
    }

    feedUpdates(updates: API.UpdatesType) {
        switch (updates.constructor) {
            case API.UpdatesTooLong: {
                this.obtainUpdatesDifference();
            } break;

            case API.UpdateShortMessage: {
                // TODO avoid unnecessary sync
                this.obtainUpdatesDifference();
            } break;

            case API.UpdateShortChatMessage: {
                // TODO avoid unnecessary sync
                this.obtainUpdatesDifference();
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
                    this.shouldSyncUpdatesState = true;
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
                    this.shouldSyncUpdatesState = true;
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
                this.processUpdate(updates as API.UpdateShortSentMessage);
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
            new TLInt(this.state.date),
            new TLInt(this.state.qts));
        this.dataCenter.call(getDifference).subscribe(
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
            this.storage.writeMessages(...updates.messages.items).subscribe();
        }
        if (updates.chats) {
            this.storage.writeChats(...updates.chats.items).subscribe();
        }
        if (updates.users) {
            this.storage.writeUsers(...updates.users.items).subscribe();
        }
        if (updates.updates) {
            for (let update of updates.updates.items) {
                this.processUpdate(update);
            }
        }

        if (updates.messages) {
            for (let message of updates.messages.items) {
                const fromId = (message as API.Message & API.MessageService)
                    .fromId;
                if (!fromId) continue;

                this.storage.readUsers(fromId.value).subscribe(
                    user => {
                        if (user[0]) {
                            const msg = convenienceMessageFor(message, user[0]);
                            if (msg) {
                                this.updates.next(new Update.NewMessage(msg));
                            }
                        }
                    });
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

    private processUpdate(update: API.UpdateType | API.UpdateShortSentMessage) {
        const meta = UpdatesHandler.metadataForUpdate(update);
        if (meta) {
            const pts = meta.pts;
            const ptsCount = meta.ptsCount;

            if (pts < this.state.pts) {
                return;
            }

            if (this.state.pts + ptsCount !== pts) {
                this.pendingPtsUpdates.push({
                    pts: pts,
                    ptsCount: ptsCount,
                    update: update,
                });
                this.shouldSyncUpdatesState = true;
            } else {
                this.applyUpdatesState({
                    pts: pts,
                });
                this.dropPendingUpdates();
            }
        }

        this.applyUpdate(update);
    }

    private applyUpdate(update: API.UpdateType | API.UpdateShortSentMessage) {
        switch (update.constructor) {
            case API.UpdateNewMessage: {
                const message = (update as API.UpdateNewMessage).message;
                this.storage.writeMessages(message).subscribe();

                const fromId = (message as API.Message & API.MessageService)
                    .fromId;
                if (!fromId) break;

                this.storage.readUsers(fromId.value).subscribe(
                    user => {
                        if (user[0]) {
                            const msg = convenienceMessageFor(message, user[0]);
                            if (msg) {
                                this.updates.next(new Update.NewMessage(msg));
                            }
                        }
                    });
            } break;

            case API.UpdateMessageID: {
                // TODO
            } break;

            case API.UpdateDeleteMessages: {
                const ids = (update as API.UpdateDeleteMessages).messages
                    .items.map(id => id.value);
                this.storage.deleteMessages(...ids).subscribe(msgs => {
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

            case API.UpdateNewAuthorization: {
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
                this.updates.next(new Update.ReadHistoryInbox(upd.peer, upd.maxId.value));
            } break;

            case API.UpdateReadHistoryOutbox: {
                const upd = update as API.UpdateReadHistoryOutbox;
                this.updates.next(new Update.ReadHistoryOutbox(upd.peer, upd.maxId.value));
            } break;

            case API.UpdateWebPage: {
                // TODO
            } break;

            case API.UpdateReadMessagesContents: {
                const upd = update as API.UpdateReadMessagesContents;
                for (let msgId of upd.messages.items) {
                    this.storage.updateMessage(msgId.value, {
                        mediaUnread: false,
                    }).switchMap(msg => {
                        if (msg instanceof API.Message || msg instanceof API.MessageService) {
                            if (msg.fromId) {
                                return this.storage.readUsers(msg.fromId.value)
                                    .map(users => [msg, users[0]]);
                            }
                        }
                        return Observable.never();
                    }).map((msgUser: [API.MessageType, API.UserType]) => {
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
                const upd = update as API.UpdateEditMessage;
                this.storage.writeMessages(upd.message).switchMap(msg => {
                    if (msg instanceof API.Message || msg instanceof API.MessageService) {
                        if (msg.fromId) {
                            return this.storage.readUsers(msg.fromId.value)
                                .map(users => [msg, users[0]]);
                        }
                    }
                    return Observable.never();
                }).map((msgUser: [API.MessageType, API.UserType]) => {
                    if (msgUser && msgUser[1]) {
                        return convenienceMessageFor(msgUser[0], msgUser[1]);
                    }
                    return undefined;
                }).subscribe(msg => {
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

            case API.UpdateShortSentMessage: {
                // TODO
            } break;

            default:
                throw new Error();
        }
    }

    private dropPendingUpdates() {
        this.pendingPtsUpdates.sort((a, b) => {
            return a.pts - b.pts;
        });

        let curPts = this.state.pts;
        let goodPts = 0;
        let goodIndex = 0;
        this.pendingPtsUpdates.forEach((update, index) => {
             curPts += update.ptsCount;
             if (curPts >= update.pts) {
                 goodPts = update.pts;
                 goodIndex = index;
             }
        });

        if (goodPts > 0) {
            this.state.pts = goodPts;
            for (let update of this.pendingPtsUpdates.slice(0, goodIndex + 1)) {
                this.applyUpdate(update.update);
            }
            this.pendingPtsUpdates = this.pendingPtsUpdates.slice(goodIndex,);
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