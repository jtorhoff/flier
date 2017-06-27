import { DataCenter } from "../Session/DataCenter";
import { PersistentStorage } from "../Storage/PersistentStorage";
import { TLInt } from "../TL/Types/TLInt";
import { API } from "../Codegen/API/APISchema";
import { TLVector } from "../TL/Types/TLVector";
import { Update } from "./Update";
import { Subject } from "rxjs/Subject";

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
                this.processUpdate(update);
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
        this.state = {...this.state, state};
        this.storage.writeUpdatesState(this.state);
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
            this.storage.writeMessages(updates.messages.items);
        }
        if (updates.chats) {
            this.storage.writeChats(updates.chats.items);
        }
        if (updates.users) {
            this.storage.writeUsers(updates.users.items);
        }
        if (updates.updates) {
            for (let update of updates.updates.items) {
                this.processUpdate(update);
            }
        }

        // TODO send notifications
    }

    private processUpdate(update: API.UpdateType | API.UpdateShortSentMessage) {
        const meta = UpdatesHandler.metadataForUpdate(update);
        if (meta) {
            const pts = meta.pts;
            const ptsCount = meta.ptsCount;

            if (pts <= this.state.pts) {
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
        // TODO

        switch (update.constructor) {
            case API.UpdateNewMessage:
                break;

            case API.UpdateMessageID:
                break;

            case API.UpdateDeleteMessages:
                break;

            case API.UpdateUserTyping:
                break;

            case API.UpdateChatUserTyping:
                break;

            case API.UpdateChatParticipants:
                break;

            case API.UpdateUserStatus:
                break;

            case API.UpdateUserName:
                break;

            case API.UpdateUserPhoto:
                break;

            case API.UpdateContactRegistered:
                break;

            case API.UpdateContactLink:
                break;

            case API.UpdateNewAuthorization:
                break;

            case API.UpdateNewEncryptedMessage:
                break;

            case API.UpdateEncryptedChatTyping:
                break;

            case API.UpdateEncryption:
                break;

            case API.UpdateEncryptedMessagesRead:
                break;

            case API.UpdateChatParticipantAdd:
                break;

            case API.UpdateChatParticipantDelete:
                break;

            case API.UpdateDcOptions:
                break;

            case API.UpdateUserBlocked:
                break;

            case API.UpdateNotifySettings:
                break;

            case API.UpdateServiceNotification:
                break;

            case API.UpdatePrivacy:
                break;

            case API.UpdateUserPhone:
                break;

            case API.UpdateReadHistoryInbox:
                break;

            case API.UpdateReadHistoryOutbox:
                break;

            case API.UpdateWebPage:
                break;

            case API.UpdateReadMessagesContents:
                break;

            case API.UpdateChannelTooLong:
                break;

            case API.UpdateChannel:
                break;

            case API.UpdateNewChannelMessage:
                break;

            case API.UpdateReadChannelInbox:
                break;

            case API.UpdateDeleteChannelMessages:
                break;

            case API.UpdateChannelMessageViews:
                break;

            case API.UpdateChatAdmins:
                break;

            case API.UpdateChatParticipantAdmin:
                break;

            case API.UpdateNewStickerSet:
                break;

            case API.UpdateStickerSetsOrder:
                break;

            case API.UpdateStickerSets:
                break;

            case API.UpdateSavedGifs:
                break;

            case API.UpdateBotInlineQuery:
                break;

            case API.UpdateBotInlineSend:
                break;

            case API.UpdateEditChannelMessage:
                break;

            case API.UpdateChannelPinnedMessage:
                break;

            case API.UpdateBotCallbackQuery:
                break;

            case API.UpdateEditMessage:
                break;

            case API.UpdateInlineBotCallbackQuery:
                break;

            case API.UpdateReadChannelOutbox:
                break;

            case API.UpdateDraftMessage:
                break;

            case API.UpdateReadFeaturedStickers:
                break;

            case API.UpdateRecentStickers:
                break;

            case API.UpdateConfig:
                break;

            case API.UpdatePtsChanged:
                break;

            case API.UpdateShortSentMessage:
                break;

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
        let pts = (update as any).pts;
        let ptsCount = (update as any).ptsCount || 0;

        if (pts) {
            return {
                pts: pts,
                ptsCount: ptsCount,
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