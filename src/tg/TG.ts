import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/skip";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { AppConfig } from "./AppConfig";
import { API } from "./Codegen/API/APISchema";
import { Hashable } from "./DataStructures/HashMap/Hashable";
import { FileManager } from "./Files/FileManager";
import { DataCenter, ErrorType } from "./Session/DataCenter";
import { sha256 } from "./SHA/SHA";
import { PersistentStorage } from "./Storage/PersistentStorage";
import { TLBytes } from "./TL/Types/TLBytes";
import { TLInt } from "./TL/Types/TLInt";
import { TLString } from "./TL/Types/TLString";
import { UpdatesHandler } from "./Updates/UpdatesHandler";
import { concat } from "./Utils/BytesConcat";

export class TG {
    private readonly storage = PersistentStorage.defaultStorage;
    private readonly authorizedSubject = new BehaviorSubject(false);
    private readonly fileDataCenters: { [index: number]: DataCenter } = {};

    private mainDataCenter: DataCenter;
    private updatesHandler: UpdatesHandler;
    private fileManager: FileManager;

    constructor(readonly appConfig: AppConfig) {
        this.mainDataCenter = new DataCenter(appConfig.apiId);

        this.initMainDc();
        this.initFileManager();
    }

    private initMainDc() {
        this.storage.readAuthorization()
            .subscribe(auth => {
                if (auth) {
                    this.mainDataCenter.init(
                        this.appConfig.rsaKeys,
                        auth.host,
                        auth.authKey);
                } else {
                    this.mainDataCenter.init(
                        this.appConfig.rsaKeys,
                        this.appConfig.entryDC);
                }
            });

        this.mainDataCenter.delegate = {
            authorized: this.didAuthorize.bind(this),
            migrated: this.migrated.bind(this),
            shouldSyncUpdatesState: this.shouldSyncUpdatesState.bind(this),
            receivedUpdates: this.receivedUpdates.bind(this),
        };

        this.updatesHandler = new UpdatesHandler(
            this.mainDataCenter, this.storage);

        // Clear storage if the key for the main DC has been revoked.
        this.mainDataCenter.authorized
            .skip(1)
            .filter(auth => !auth)
            .subscribe(() => {
                this.storage.clear();
            });

        this.mainDataCenter.authorized.subscribe(this.authorizedSubject);
    }

    private initFileManager() {
        this.fileManager = new FileManager(this.storage, (dcId) => {
            return new Observable<DataCenter | undefined>(observer => {
                this.mainDataCenter.dcOptions.subscribe(options => {
                    if (this.fileDataCenters[dcId]) {
                        observer.next(this.fileDataCenters[dcId]);
                        return;
                    }

                    const option = options
                        .find(dc => dc.id.value === dcId && !dc.ipv6);
                    if (!option) {
                        observer.error();
                        return;
                    }

                    const dc = new DataCenter(this.appConfig.apiId);
                    this.fileDataCenters[dcId] = dc;

                    dc.delegate = {
                        authorized: (userId, dcId, host, authKey) => {
                            this.storage.writeAuthorization({
                                dcId: dcId,
                                host: host,
                                authKey: authKey.buffer,
                                main: 0,
                            });
                        }
                    };

                    this.storage.readAuthorization(dcId)
                        .subscribe(auth => {
                            dc.init(
                                this.appConfig.rsaKeys,
                                `${option.ipAddress.string}:${option.port.value}`,
                                auth ? auth.authKey : undefined);
                        });

                    dc.authorized
                        .filter(auth => !auth)
                        .subscribe(() => {
                            dc.importAuthorization(this.mainDataCenter);
                        });

                    // Skip the value after the key is read
                    // from the storage and loaded up.
                    // We are only interested in events
                    // when the key is revoked here.
                    dc.authorized.skip(1).subscribe(auth => {
                        if (!auth) {
                            dc.close();
                            this.storage.removeAuthorization(dcId);
                            delete this.fileDataCenters[dcId];
                        }
                    });

                    observer.next(dc);
                });
            });
        });
    }

    private didAuthorize(userId: number,
                         dcId: number,
                         host: string,
                         authKey: Uint8Array) {
        this.storage.writeMyUserId(userId);
        this.storage.writeAuthorization({
            dcId: dcId,
            host: host,
            authKey: authKey.buffer,
            main: 1,
        });
    }

    private migrated(from: DataCenter, to: DataCenter) {
        if (from === this.mainDataCenter) {
            this.mainDataCenter = to;
            this.initMainDc();
            this.initFileManager();
            from.close();
        }
    }

    private shouldSyncUpdatesState() {
        this.updatesHandler.syncUpdatesState();
    }

    private receivedUpdates(updates: API.UpdatesType) {
        this.updatesHandler.feedUpdates(updates);
    }

    get authorized(): Observable<boolean> {
        return this.authorizedSubject.skip(1);
    }

    sendCode(phoneNumber: string): Observable<API.auth.SentCode> {
        const fun = new API.auth.SendCode(
            false,
            new TLString(phoneNumber),
            undefined,
            new TLInt(this.appConfig.apiId),
            new TLString(this.appConfig.apiHash));

        return this.mainDataCenter.call(fun);
    }

    signIn(phoneNumber: string,
           phoneCodeHash: string,
           phoneCode: string): Observable<API.auth.Authorization> {
        const fun = new API.auth.SignIn(
            new TLString(phoneNumber),
            new TLString(phoneCodeHash),
            new TLString(phoneCode));

        return this.mainDataCenter.call(fun);
    }

    signUp(phoneNumber: string,
           phoneCodeHash: string,
           phoneCode: string,
           firstName: string,
           lastName: string): Observable<API.auth.Authorization> {
        const fun = new API.auth.SignUp(
            new TLString(phoneNumber),
            new TLString(phoneCodeHash),
            new TLString(phoneCode),
            new TLString(firstName),
            new TLString(lastName));

        return this.mainDataCenter.call(fun);
    }

    getPassword(): Observable<API.account.PasswordType> {
        return this.mainDataCenter.call(new API.account.GetPassword());
    }

    checkPassword(password: string): Observable<API.auth.Authorization> {
        return this.getPassword().flatMap(pass => {
            if (pass instanceof API.account.Password) {
                const salt = pass.currentSalt.bytes;
                const hash = sha256(concat(
                    salt, new TextEncoder().encode(password), salt));

                return this.mainDataCenter
                    .call(new API.auth.CheckPassword(new TLBytes(hash)));
            } else {
                return Observable.throw({
                    type: ErrorType.badRequest,
                    details: "PASSWORD_NOT_SET",
                });
            }
        });
    }

    getChats(limit: number, offset?: Chat): Observable<Array<Chat>> {
        let offsetId = 0;
        let offsetDate = 0;
        let inputPeer: API.InputPeerType = new API.InputPeerEmpty();

        if (offset) {
            offsetId = offset.topMessage.id;
            offsetDate = offset.topMessage.date;
            inputPeer = offset.inputPeer;
        }

        const fun = new API.messages.GetDialogs(
            new TLInt(offsetDate),
            new TLInt(offsetId),
            inputPeer,
            new TLInt(limit)
        );

        return this.mainDataCenter.call(fun)
            .map((dialogs: API.messages.DialogsType) => {
                return chatsArrayForDialogs(dialogs);
            });
    }

    getFile(location: API.FileLocation): Observable<Blob> {
        return this.fileManager.getFile(location);
    }
}

export class Chat {
    private _unreadCount: number;

    constructor(readonly peer: API.PeerType,
                readonly readInboxMaxId: number,
                readonly readOutboxMaxId: number,
                unreadCount: number,
                readonly topMessage: Message,
                readonly kind: ChatKind) {
        this._unreadCount = unreadCount;
    }

    get unreadCount(): number {
        return this._unreadCount;
    }

    get inputPeer(): API.InputPeerType {
        switch (this.kind.kind) {
            case "dialog": {
                if (this.kind.user instanceof API.User &&
                    this.kind.user.accessHash) {
                    return new API.InputPeerUser(
                        this.kind.user.id, this.kind.user.accessHash);
                }
            }
                break;

            case "group":
                return new API.InputPeerChat(this.kind.chat.id);

            case "channel": {
                if (this.kind.channel instanceof API.User &&
                    this.kind.channel.accessHash) {
                    return new API.InputPeerChannel(
                        this.kind.channel.id, this.kind.channel.accessHash);
                }
            }
                break;
        }

        return new API.InputPeerEmpty();
    }

    get peerId(): number {
        if (this.peer instanceof API.PeerUser) {
            return this.peer.userId.value;
        } else if (this.peer instanceof API.PeerChat) {
            return this.peer.chatId.value;
        } else if (this.peer instanceof API.PeerChannel) {
            return this.peer.channelId.value;
        }

        return 0;
    }

    get photoSmall(): API.FileLocation | undefined {
        switch (this.kind.kind) {
            case "dialog": {
                const user = this.kind.user;
                if (user instanceof API.User) {
                    if (user.photo instanceof API.UserProfilePhoto) {
                        if (user.photo.photoSmall instanceof API.FileLocation) {
                            return user.photo.photoSmall;
                        }
                    }
                }
            }
                break;

            case "group": {
                const chat = this.kind.chat;
                if (chat instanceof API.Chat) {
                    if (chat.photo instanceof API.ChatPhoto) {
                        if (chat.photo.photoSmall instanceof API.FileLocation) {
                            return chat.photo.photoSmall;
                        }
                    }
                }
            }
                break;

            case "channel": {
                const channel = this.kind.channel;
                if (channel instanceof API.Channel) {
                    if (channel.photo instanceof API.ChatPhoto) {
                        if (channel.photo.photoSmall instanceof API.FileLocation) {
                            return channel.photo.photoSmall;
                        }
                    }
                }
            }
                break;
        }

        return undefined;
    }

    get title(): string {
        let title: string | undefined;

        switch (this.kind.kind) {
            case "dialog": {
                const user = this.kind.user;
                if (user instanceof API.User) {
                    const firstName = user.firstName || TLString.empty;
                    const lastName = user.lastName || TLString.empty;
                    title = [firstName.string, lastName.string]
                        .join(" ")
                        .trim();
                }
            }
                break;

            case "group": {
                const group = this.kind.chat;
                if (group instanceof API.Chat) {
                    title = group.title.string;
                } else if (group instanceof API.ChatForbidden) {
                    title = group.title.string;
                }
            }
                break;

            case "channel": {
                const channel = this.kind.channel;
                if (channel instanceof API.Channel) {
                    title = channel.title.string;
                } else if (channel instanceof API.ChannelForbidden) {
                    title = channel.title.string;
                }
            }
                break;
        }

        if (title && title !== "") {
            return title;
        }

        return "Not Available";
    }
}

type ChatKind =
    { kind: "dialog", user: API.UserType } |
    { kind: "group", chat: API.ChatType } |
    { kind: "channel", channel: API.ChatType };

export class Message {
    readonly id: number;
    readonly date: number;
    readonly out: boolean;
    readonly mentioned: boolean;
    readonly silent: boolean;
    readonly post: boolean;
    readonly from?: API.UserType;
    readonly to?: API.PeerType;
    readonly fwdFrom?: { userId: number, date: number } |
        { channelId: number, postId: number, date: number };
    readonly viaBotId?: number;
    readonly replyToMsgId?: number;
    readonly message?: string;
    readonly media?: API.MessageMediaType;
    readonly entities?: Array<API.MessageEntityType>;
    readonly views?: number;
    readonly editDate?: number;
    readonly action?: API.MessageActionType;

    constructor(message: {
        id: number,
        date: number,
        out: boolean,
        mentioned: boolean,
        silent: boolean,
        post: boolean,
        from?: API.UserType,
        to?: API.PeerType,
        fwdFrom?: { userId: number, date: number } |
            { channelId: number, postId: number, date: number },
        viaBotId?: number,
        replyToMsgId?: number,
        message?: string,
        media?: API.MessageMediaType,
        entities?: Array<API.MessageEntityType>,
        views?: number,
        editDate?: number,
        action?: API.MessageActionType,
    }) {
        this.id = message.id;
        this.date = message.date;
        this.out = message.out;
        this.mentioned = message.mentioned;
        this.silent = message.silent;
        this.post = message.post;
        this.from = message.from;
        this.to = message.to;
        this.fwdFrom = message.fwdFrom;
        this.viaBotId = message.viaBotId;
        this.replyToMsgId = message.replyToMsgId;
        this.message = message.message;
        this.media = message.media;
        this.entities = message.entities;
        this.views = message.views;
        this.editDate = message.editDate;
        this.action = message.action;
    }

    toString(): string {
        if (this.message) {
            return this.message;
        }

        return "Not supported yet";
    }
}

const chatsArrayForDialogs = (dialogs: API.messages.DialogsType): Array<Chat> => {
    const result: Chat[] = [];

    for (let dialog of dialogs.dialogs.items) {
        const message = dialogs.messages.items
            .find(item => item.id.equals(dialog.topMessage));
        if (!message) continue;

        let kind: ChatKind;
        switch (dialog.peer.constructor) {
            case API.PeerUser: {
                const peer = dialog.peer as API.PeerUser;
                kind = {
                    kind: "dialog",
                    user: dialogs.users.items
                        .find(item => item.id.equals(peer.userId))!
                };
            }
                break;

            case API.PeerChat: {
                const peer = dialog.peer as API.PeerChat;
                kind = {
                    kind: "group",
                    chat: dialogs.chats.items
                        .find(item => item.id.equals(peer.chatId))!
                };
            }
                break;

            case API.PeerChannel: {
                const peer = dialog.peer as API.PeerChannel;
                kind = {
                    kind: "channel",
                    channel: dialogs.chats.items
                        .find(item => item.id.equals(peer.channelId))!
                };
            }
                break;

            default:
                continue;
        }

        let msg: Message | undefined;
        let fromId = (message as API.Message & API.MessageService).fromId;
        if (fromId) {
            const from = dialogs.users.items
                .find(item => item.id.equals(fromId!));
            msg = messageFor(message, from);
        } else {
            msg = messageFor(message);
        }
        if (!msg) continue;

        const chat = new Chat(
            dialog.peer,
            dialog.readInboxMaxId.value,
            dialog.readOutboxMaxId.value,
            dialog.unreadCount.value,
            msg,
            kind);

        result.push(chat);
    }

    return result;
};

const messageFor = (message: API.MessageType, from?: API.UserType): Message | undefined => {
    if (message instanceof API.MessageEmpty) {
        return undefined;
    }

    const msg = message as (API.Message & API.MessageService);
    let fwdFrom;
    if (msg.fwdFrom) {
        const fwd = msg.fwdFrom;
        if (fwd.fromId) {
            fwdFrom = { userId: fwd.fromId.value, date: fwd.date.value };
        } else if (fwd.channelId && fwd.channelPost) {
            fwdFrom = {
                channelId: fwd.channelId.value,
                postId: fwd.channelPost.value,
                date: fwd.date.value
            };
        } else {
            throw new Error();
        }
    }

    return new Message({
        id: msg.id.value,
        date: msg.date.value,
        out: msg.out,
        mentioned: msg.mentioned,
        silent: msg.silent,
        post: msg.post,
        from: from,
        to: msg.toId,
        fwdFrom: fwdFrom,
        viaBotId: msg.viaBotId ? msg.viaBotId.value : undefined,
        replyToMsgId: msg.replyToMsgId ? msg.replyToMsgId.value : undefined,
        message: msg.message ? msg.message.string : undefined,
        media: msg.media,
        entities: msg.entities ? msg.entities.items : undefined,
        views: msg.views ? msg.views.value : undefined,
        editDate: msg.editDate ? msg.editDate.value : undefined,
        action: msg.action,
    });
};

class HashableFileLocation extends API.FileLocation implements Hashable {
    constructor(file: API.FileLocation) {
        super(file.dcId, file.volumeId, file.localId, file.secret);
    }

    get hashValue(): number {
        return this.volumeId.hashValue ^ this.localId.hashValue ^ this.secret.hashValue;
    }

    equals(to: HashableFileLocation): boolean {
        return this.dcId.equals(to.dcId)
            && this.volumeId.equals(to.volumeId)
            && this.localId.equals(to.localId)
            && this.secret.equals(to.secret);
    }
}