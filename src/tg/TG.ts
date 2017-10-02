import "rxjs/add/observable/interval";
import "rxjs/add/operator/combineAll";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/concatAll";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeAll";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/reduce";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/single";
import "rxjs/add/operator/skip";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toArray";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AppConfig } from "./AppConfig";
import { API } from "./Codegen/API/APISchema";
import { ConvenienceChat } from "./Convenience/Chat";
import { convenienceChatsArrayForDialogs } from "./Convenience/ChatsArrayForDialog";
import { ConvenienceMessage } from "./Convenience/Message";
import { convenienceMessageFor } from "./Convenience/MessageFor";
import {
    FileManager,
    FileLocation,
    DocumentLocation
} from "./Files/FileManager";
import { DataCenter, ErrorType, NetworkState } from "./Session/DataCenter";
import { sha256 } from "./SHA/SHA";
import { PersistentStorage } from "./Storage/PersistentStorage";
import { TLBytes } from "./TL/Types/TLBytes";
import { TLInt } from "./TL/Types/TLInt";
import { TLLong } from "./TL/Types/TLLong";
import { TLString } from "./TL/Types/TLString";
import { Update } from "./Updates/Update";
import { UpdatesHandler } from "./Updates/UpdatesHandler";
import { concat } from "./Utils/BytesConcat";

export type Chat = ConvenienceChat;
export type Message = ConvenienceMessage;

export class TG {
    private readonly storage = PersistentStorage.defaultStorage;
    private readonly authorizedSubject = new BehaviorSubject(false);
    private readonly fileDataCenters: { [index: number]: DataCenter } = {};
    private readonly updatesSubject = new Subject<Update>();
    private readonly stateSubject = new BehaviorSubject(NetworkState.waitingForNetwork);

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
                this.storage.clear().subscribe();
            });

        this.mainDataCenter.authorized.subscribe(this.authorizedSubject);
        this.updatesHandler.updates.subscribe(this.updatesSubject);
        this.mainDataCenter.state.subscribe(this.stateSubject);
    }

    private initFileManager() {
        this.fileManager = new FileManager(this.storage, (dcId) => {
            return new Observable<DataCenter>(observer => {
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
                        .map(auth => {
                            dc.init(
                                this.appConfig.rsaKeys,
                                `${option.ipAddress.string}:${option.port.value}`,
                                auth ? auth.authKey : undefined);
                        })
                        .subscribe();

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
                            this.storage.deleteAuthorization(dcId);
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

    get updates(): Observable<Update> {
        return this.updatesSubject.asObservable();
    }

    get offlineBlurTimeout(): number {
        const config = this.mainDataCenter.config;
        if (config) {
            return config.offlineBlurTimeoutMs.value;
        }

        return 5000;
    }

    get onlineUpdatePeriod(): number {
        if (this.mainDataCenter.config) {
            return this.mainDataCenter.config.onlineUpdatePeriodMs.value;
        }

        return 0;
    }

    get state(): Observable<NetworkState> {
        return this.stateSubject.asObservable();
    }

    get stateValue(): NetworkState {
        return this.stateSubject.value;
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
            true,
            new TLInt(offsetDate),
            new TLInt(offsetId),
            inputPeer,
            new TLInt(limit)
        );

        return this.mainDataCenter.call(fun)
            .do((dialogs: API.messages.DialogsType) => {
                Observable.merge(
                    this.storage.writeDialogs(...dialogs.dialogs.items),
                    this.storage.writeMessages(...dialogs.messages.items),
                    this.storage.writeChats(...dialogs.chats.items),
                    this.storage.writeUsers(...dialogs.users.items))
                    .subscribe();
            })
            .map((dialogs: API.messages.DialogsType) => {
                return convenienceChatsArrayForDialogs({
                    dialogs: dialogs.dialogs.items,
                    messages: dialogs.messages.items,
                    chats: dialogs.chats.items,
                    users: dialogs.users.items,
                });
            });
    }

    getChat(peer: API.PeerType): Observable<Chat> {
        return this.storage.readDialogs(peer)
            .flatMap(dialog => dialog)
            .flatMap(dialog => {
                let peerObservable: Observable<API.ChatType> | Observable<API.UserType>;
                if (dialog.peer instanceof API.PeerChannel) {
                    peerObservable = this.storage
                        .readChats(dialog.peer.channelId.value)
                        .map(chats => chats[0]);
                } else if (dialog.peer instanceof API.PeerChat) {
                    peerObservable = this.storage
                        .readChats(dialog.peer.chatId.value)
                        .map(chats => chats[0]);
                } else if (dialog.peer instanceof API.PeerUser) {
                    peerObservable = this.storage
                        .readUsers(dialog.peer.userId.value)
                        .map(users => users[0]);
                } else {
                    throw new Error();
                }
                const msgObservable = this.storage
                    .readMessages(dialog.topMessage.value)
                    .map(msgs => msgs[0]);

                return Observable.merge(
                    Observable.of(dialog),
                    peerObservable,
                    msgObservable
                        .flatMap(msg => {
                            if (msg instanceof API.Message || msg instanceof API.MessageService) {
                                if (msg.fromId) {
                                    return Observable.merge(
                                        Observable.of(msg),
                                        this.storage.readUsers(msg.fromId.value)
                                            .map(users => users[0]));
                                }
                            }
                            return Observable.of(msg);
                        })
                )
            })
            .combineLatest()
            .reduce((list: any[], value) => list.concat(value))
            .map((dialog: [API.Dialog, API.ChatType | API.UserType, API.MessageType, API.UserType | undefined]) => {
                const dialogs = [dialog[0]];
                const messages = [dialog[2]];
                let chats: API.ChatType[] = [];
                let users: API.UserType[] = [];
                if (dialog[1] instanceof API.User || dialog[1] instanceof API.UserEmpty) {
                    users = users.concat(dialog[1]);
                } else {
                    chats = chats.concat(dialog[1]);
                }
                if (dialog[3]) {
                    users = users.concat(dialog[3]!);
                }
                return convenienceChatsArrayForDialogs({
                    dialogs: dialogs,
                    messages: messages,
                    chats: chats,
                    users: users,
                })[0]
            });
    }

    getMessageHistory(peerChat: API.PeerType | Chat,
                      limit: number,
                      offsetId?: number): Observable<Array<Message>> {
        let inputPeerObservable: Observable<API.InputPeerType>;
        let peer: API.PeerType;
        if (peerChat instanceof API.PeerUser ||
            peerChat instanceof API.PeerChat ||
            peerChat instanceof API.PeerChannel) {
            inputPeerObservable = this.inputPeerByPeer(peerChat);
            peer = peerChat;
        } else {
            inputPeerObservable = Observable.of(peerChat.inputPeer);
            peer = peerChat.peer;
        }

        return inputPeerObservable.flatMap(inputPeer =>
                this.storage.readMessageHistory(peer, limit, offsetId)
                    .map(msgs => [inputPeer, msgs])
            )
            .switchMap((inputPeerMsgs: [API.InputPeerUser | API.InputPeerChat | API.InputPeerChannel, API.MessageType[]]) => {
                const inputPeer = inputPeerMsgs[0];
                const msgs = inputPeerMsgs[1];
                if (msgs.length > 0) {
                    return Observable.of(msgs);
                } else {
                    return this.mainDataCenter.call(
                        new API.messages.GetHistory(
                            inputPeer,
                            new TLInt(offsetId || 0),
                            new TLInt(0),
                            new TLInt(0),
                            new TLInt(limit),
                            new TLInt(0),
                            new TLInt(0)))
                        .do((messages: API.messages.MessagesType) => {
                            Observable.merge(
                                this.storage.writeMessages(...messages.messages.items),
                                this.storage.writeUsers(...messages.users.items),
                                this.storage.writeChats(...messages.chats.items),
                            ).subscribe();
                        })
                        .map((messages: API.messages.MessagesType) => {
                            return messages.messages.items;
                        });
                }
            })
            .switchMap(msgs => {
                const users = msgs.map(msg => {
                    if (msg instanceof API.Message || msg instanceof API.MessageService) {
                        if (msg.fromId) {
                            return msg.fromId.value;
                        }
                    }
                    return 0;
                });
                return Observable.merge(
                    Observable.of(msgs),
                    this.storage.readUsers(...users));
            })
            .combineLatest()
            .reduce((list: any[], value: API.MessageType[] | API.UserType[]) => list.concat(value))
            .map((msgsUsers: Array<API.MessageType[] | API.UserType[]>) => {
                const msgs: API.MessageType[] = msgsUsers[0];
                const users: API.UserType[] = msgsUsers[1];

                return msgs.map(msg => {
                    let user: API.UserType | undefined = undefined;
                    if (msg instanceof API.Message || msg instanceof API.MessageService) {
                        if (msg.fromId) {
                            const fromId = msg.fromId;
                            user = users.find(u => u.id.equals(fromId));
                        }
                    }
                    return convenienceMessageFor(msg, user);
                }).filter(msg => typeof msg !== "undefined") as Array<Message>
            })
    }
    //
    // getMessageHistory(peer: API.PeerType | API.InputPeerType,
    //                   limit: number,
    //                   offsetId?: number): Observable<Array<Message>> {
    //     let observable: Observable<API.InputPeerType>;
    //     if (peer instanceof API.PeerUser ||
    //         peer instanceof API.PeerChat ||
    //         peer instanceof API.PeerChannel) {
    //         observable = this.inputPeerByPeer(peer);
    //     } else {
    //         observable = Observable.of(peer);
    //     }
    //
    //     return observable.flatMap((inputPeer: API.InputPeerType) => {
    //             const peer = this.peerByInputPeer(inputPeer);
    //             return this.storage.readMessageHistory(peer, limit, offsetId)
    //                 .map(msgs => [inputPeer, msgs]);
    //         })
    //         .switchMap((inputPeerMsgs: [API.InputPeerUser | API.InputPeerChat | API.InputPeerChannel, API.MessageType[]]) => {
    //             const inputPeer = inputPeerMsgs[0];
    //             const msgs = inputPeerMsgs[1];
    //             if (msgs.length > 0) {
    //                 return Observable.of(msgs);
    //             } else {
    //                 return this.mainDataCenter.call(
    //                     new API.messages.GetHistory(
    //                         inputPeer,
    //                         new TLInt(offsetId || 0),
    //                         new TLInt(0),
    //                         new TLInt(0),
    //                         new TLInt(limit),
    //                         new TLInt(0),
    //                         new TLInt(0)))
    //                     .do((messages: API.messages.MessagesType) => {
    //                         Observable.merge(
    //                             this.storage.writeMessages(...messages.messages.items),
    //                             this.storage.writeUsers(...messages.users.items),
    //                             this.storage.writeChats(...messages.chats.items),
    //                         ).subscribe();
    //                     })
    //                     .map((messages: API.messages.MessagesType) => {
    //                         return messages.messages.items;
    //                     });
    //             }
    //         })
    //         .switchMap(msgs => {
    //             const users = msgs.map(msg => {
    //                 if (msg instanceof API.Message || msg instanceof API.MessageService) {
    //                     if (msg.fromId) {
    //                         return msg.fromId.value;
    //                     }
    //                 }
    //                 return 0;
    //             });
    //             return Observable.merge(
    //                 Observable.of(msgs),
    //                 this.storage.readUsers(...users));
    //         })
    //         .combineLatest()
    //         .reduce((list: any[], value: API.MessageType[] | API.UserType[]) => list.concat(value))
    //         .map((msgsUsers: Array<API.MessageType[] | API.UserType[]>) => {
    //             const msgs: API.MessageType[] = msgsUsers[0];
    //             const users: API.UserType[] = msgsUsers[1];
    //
    //             return msgs.map(msg => {
    //                 let user: API.UserType | undefined = undefined;
    //                 if (msg instanceof API.Message || msg instanceof API.MessageService) {
    //                     if (msg.fromId) {
    //                         const fromId = msg.fromId;
    //                         user = users.find(u => u.id.equals(fromId));
    //                     }
    //                 }
    //                 return convenienceMessageFor(msg, user);
    //             }).filter(msg => typeof msg !== "undefined") as Array<Message>
    //         })
    // }
    //
    // private peerByInputPeer(inputPeer: API.InputPeerType): API.PeerType {
    //     if (inputPeer instanceof API.InputPeerUser) {
    //         return new API.PeerUser(inputPeer.userId);
    //     } else if (inputPeer instanceof API.InputPeerChat) {
    //         return new API.PeerChat(inputPeer.chatId);
    //     } else if (inputPeer instanceof API.InputPeerChannel) {
    //         return new API.PeerChannel(inputPeer.channelId);
    //     }
    //
    //     throw new Error();
    // }

    private inputPeerByPeer(peer: API.PeerType): Observable<API.InputPeerType> {
        let observable: Observable<any>;
        if (peer instanceof API.PeerUser) {
            observable = this.storage.readUsers(peer.userId.value);
        } else if (peer instanceof API.PeerChat) {
            observable = this.storage.readChats(peer.chatId.value);
        } else if (peer instanceof API.PeerChannel) {
            observable = this.storage.readChats(peer.channelId.value);
        } else {
            throw new Error();
        }

        return observable
            .map(data => data[0])
            .map(data => {
                let inputPeer: API.InputPeerType;
                if (data instanceof API.User) {
                    inputPeer = new API.InputPeerUser(data.id, data.accessHash!);
                } else if (data instanceof API.ChatEmpty ||
                    data instanceof API.Chat ||
                    data instanceof API.ChatForbidden) {
                    inputPeer = new API.InputPeerChat(data.id);
                } else if (data instanceof API.Channel ||
                    data instanceof API.ChannelForbidden) {
                    inputPeer = new API.InputPeerChannel(data.id, data.accessHash!);
                } else {
                    throw new Error();
                }
                return inputPeer;
            });
    }

    // private getMessageHistoryByPeer(peer: API.PeerType,
    //                                 limit: number,
    //                                 offsetId?: number): Observable<Array<Message>> {
    //
    // }

    // getMessageHistory(peer: API.PeerType | API.InputPeerType,
    //                   limit: number,
    //                   offsetId?: number): Observable<Array<Message>> {
    //     // let observable: Observable<any>;
    //     // if (peer instanceof API.PeerUser) {
    //     //     observable = this.storage.readUsers(peer.userId.value);
    //     // } else if (peer instanceof API.PeerChat) {
    //     //     observable = this.storage.readChats(peer.chatId.value);
    //     // } else if (peer instanceof API.PeerChannel) {
    //     //     observable = this.storage.readChats(peer.channelId.value);
    //     // } else {
    //     //     throw new Error();
    //     // }
    //
    //     let observable: Observable<any>;
    //     if (peer instanceof API.PeerUser || peer instanceof API.PeerChat || peer instanceof API.PeerChannel) {
    //         if (peer instanceof API.PeerUser) {
    //             observable = this.storage.readUsers(peer.userId.value);
    //         } else if (peer instanceof API.PeerChat) {
    //             observable = this.storage.readChats(peer.chatId.value);
    //         } else if (peer instanceof API.PeerChannel) {
    //             observable = this.storage.readChats(peer.channelId.value);
    //         } else {
    //             throw new Error();
    //         }
    //         observable = observable
    //             .map(data => data[0])
    //             .map(data => {
    //                 let inputPeer: API.InputPeerType;
    //                 if (data instanceof API.User) {
    //                     inputPeer = new API.InputPeerUser(data.id, data.accessHash!);
    //                 } else if (data instanceof API.ChatEmpty || data instanceof API.Chat || data instanceof API.ChatForbidden) {
    //                     inputPeer = new API.InputPeerChat(data.id);
    //                 } else if (data instanceof API.Channel || data instanceof API.ChannelForbidden) {
    //                     inputPeer = new API.InputPeerChannel(data.id, data.accessHash!);
    //                 } else {
    //                     throw new Error();
    //                 }
    //                 return inputPeer;
    //             })
    //     } else {
    //         observable = Observable.of(peer);
    //     }
    //
    //     // let inputPeerObservable: Observable<any>;
    //     // if ()
    //     // let inputPeerObservable: Observable<any>;
    //
    //
    //     return observable
    //         // .map(data => data[0])
    //         // .map(data => {
    //         //     let inputPeer: API.InputPeerType;
    //         //     if (data instanceof API.User) {
    //         //         inputPeer = new API.InputPeerUser(data.id, data.accessHash!);
    //         //     } else if (data instanceof API.ChatEmpty || data instanceof API.Chat || data instanceof API.ChatForbidden) {
    //         //         inputPeer = new API.InputPeerChat(data.id);
    //         //     } else if (data instanceof API.Channel || data instanceof API.ChannelForbidden) {
    //         //         inputPeer = new API.InputPeerChannel(data.id, data.accessHash!);
    //         //     } else {
    //         //         throw new Error();
    //         //     }
    //         //     return inputPeer;
    //         // })
    //         .flatMap((inputPeer: API.InputPeerType) => {
    //
    //
    //             return this.storage.readMessageHistory(peer, limit, offsetId)
    //                 .map(msgs => [inputPeer, msgs]);
    //         })
    //         .switchMap((inputPeerMsgs: [API.InputPeerUser | API.InputPeerChat | API.InputPeerChannel, API.MessageType[]]) => {
    //             const inputPeer = inputPeerMsgs[0];
    //             const msgs = inputPeerMsgs[1];
    //             if (msgs.length > 0) {
    //                 return Observable.of(msgs);
    //             } else {
    //                 return this.mainDataCenter.call(
    //                     new API.messages.GetHistory(
    //                         inputPeer,
    //                         new TLInt(offsetId || 0),
    //                         new TLInt(0),
    //                         new TLInt(0),
    //                         new TLInt(limit),
    //                         new TLInt(0),
    //                         new TLInt(0)))
    //                     .do((messages: API.messages.MessagesType) => {
    //                         Observable.merge(
    //                             this.storage.writeMessages(...messages.messages.items),
    //                             this.storage.writeUsers(...messages.users.items),
    //                             this.storage.writeChats(...messages.chats.items),
    //                         ).subscribe();
    //                     })
    //                     .map((messages: API.messages.MessagesType) => {
    //                         return messages.messages.items;
    //                     });
    //             }
    //         })
    //         .switchMap(msgs => {
    //             const users = msgs.map(msg => {
    //                 if (msg instanceof API.Message || msg instanceof API.MessageService) {
    //                     if (msg.fromId) {
    //                         return msg.fromId.value;
    //                     }
    //                 }
    //                 return 0;
    //             });
    //             return Observable.merge(
    //                 Observable.of(msgs),
    //                 this.storage.readUsers(...users));
    //         })
    //         .combineLatest()
    //         .reduce((list: any[], value: API.MessageType[] | API.UserType[]) => list.concat(value))
    //         .map((msgsUsers: Array<API.MessageType[] | API.UserType[]>) => {
    //             const msgs: API.MessageType[] = msgsUsers[0];
    //             const users: API.UserType[] = msgsUsers[1];
    //
    //             return msgs.map(msg => {
    //                 let user: API.UserType | undefined = undefined;
    //                 if (msg instanceof API.Message || msg instanceof API.MessageService) {
    //                     if (msg.fromId) {
    //                         const fromId = msg.fromId;
    //                         user = users.find(u => u.id.equals(fromId));
    //                     }
    //                 }
    //                 return convenienceMessageFor(msg, user);
    //             }).filter(msg => typeof msg !== "undefined") as Array<Message>
    //         })
    // }

    getFile(location: {
        readonly dcId: TLInt,
        readonly volumeId: TLLong,
        readonly localId: TLInt,
        readonly secret: TLLong,
    } | {
        readonly dcId: TLInt,
        readonly id: TLLong,
        readonly accessHash: TLLong,
        readonly version: TLInt,
    }): Observable<Blob> {
        let fileLocation: FileLocation | DocumentLocation;
        if (location.hasOwnProperty("volumeId")) {
            const loc = location as FileLocation;
            fileLocation = new FileLocation(
                loc.dcId, loc.volumeId, loc.localId, loc.secret
            );
        } else {
            const loc = location as DocumentLocation;
            fileLocation = new DocumentLocation(
                loc.dcId, loc.id, loc.accessHash, loc.version
            );
        }

        return this.fileManager.getFile(fileLocation);
    }

    getRecentStickers(): Observable<Array<API.Document>> {
        return this.mainDataCenter.call(new API.messages.GetRecentStickers(false, new TLInt(0)))
            .map(stickers => {
                if (stickers instanceof API.messages.RecentStickers) {
                    return stickers.stickers.items
                        .filter(doc => doc instanceof API.Document) as Array<API.Document>;
                } else {
                    return [];
                }
            });
    }

    getAllStickers(): Observable<API.messages.StickerSet[]> {
        return this.mainDataCenter.call(new API.messages.GetAllStickers(new TLInt(0)))
            .map(stickers => {
                if (stickers instanceof API.messages.AllStickers) {
                    return stickers.sets.items;
                } else {
                    return [];
                }
            })
            .map(sets => {
                return sets.map(set => {
                    const inputStickerSet = new API.messages.GetStickerSet(
                        new API.InputStickerSetID(set.id, set.accessHash));
                    return this.mainDataCenter.call(inputStickerSet) as Observable<API.messages.StickerSet>;
                });
            })
            .flatMap(sets => sets)
            .mergeAll(1)
            .combineLatest()
            .reduce((list: API.messages.StickerSet[], value: API.messages.StickerSet) => list.concat(value)) as Observable<API.messages.StickerSet[]>
    }

    setStatus(online: boolean): Observable<any> {
        const offline = online ? new API.BoolFalse() : new API.BoolTrue();
        return this.mainDataCenter.call(new API.account.UpdateStatus(offline));
    }
}