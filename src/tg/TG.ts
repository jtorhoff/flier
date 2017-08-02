import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/skip";
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
import { DataCenter, ErrorType } from "./Session/DataCenter";
import { sha256 } from "./SHA/SHA";
import { PersistentStorage } from "./Storage/PersistentStorage";
import { TLBytes } from "./TL/Types/TLBytes";
import { TLInt } from "./TL/Types/TLInt";
import { TLLong } from "./TL/Types/TLLong";
import { TLString } from "./TL/Types/TLString";
import { Update } from "./Updates/Update";
import { UpdatesHandler } from "./Updates/UpdatesHandler";
import { concat } from "./Utils/BytesConcat";
import "rxjs/add/operator/concatAll";
import "rxjs/add/operator/mergeAll";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/single";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/reduce";
import { observable } from "rxjs/symbol/observable";
import "rxjs/add/operator/take";
import "rxjs/add/operator/scan";

export type Chat = ConvenienceChat;
export type Message = ConvenienceMessage;

export class TG {
    private readonly storage = PersistentStorage.defaultStorage;
    private readonly authorizedSubject = new BehaviorSubject(false);
    private readonly fileDataCenters: { [index: number]: DataCenter } = {};
    private readonly updatesSubject = new Subject<Update>();

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

        return 0;
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
                return convenienceChatsArrayForDialogs(dialogs);
            });
    }

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

    getTopMessageForPeer(peer: API.PeerType): Observable<ConvenienceMessage | undefined> {
        return this.storage.readTopMessage(peer)
            .switchMap(msg => {
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
            });
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
}