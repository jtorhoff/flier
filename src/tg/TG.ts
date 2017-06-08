import "rxjs/add/operator/mergeMap";
import { Observable } from "rxjs/Observable";
import { AppConfig } from "./AppConfig";
import { API } from "./Codegen/API/APISchema";
import { DataCenter, ErrorType } from "./Session/DataCenter";
import { sha256 } from "./SHA/SHA";
import { PersistentStorage } from "./Storage/PersistentStorage";
import { TLBytes } from "./TL/Types/TLBytes";
import { TLInt } from "./TL/Types/TLInt";
import { TLString } from "./TL/Types/TLString";
import { concat } from "./Utils/BytesConcat";


export class TG {
    private storage = PersistentStorage.defaultStorage;
    private mainDataCenter: DataCenter;

    constructor(readonly appConfig: AppConfig) {
        this.mainDataCenter = new DataCenter(
            appConfig.apiId,
            appConfig.rsaKeys,
            appConfig.entryDC,
            this.storage.readAuthorization()
                .map(auth => auth ? new Uint8Array(auth.authKey) : undefined));

        this.mainDataCenter.delegate = {
            authorized: this.authorized.bind(this),
            migrated: this.migrated.bind(this),
            shouldSyncUpdatesState: this.shouldSyncUpdatesState.bind(this),
            receivedUpdates: this.receivedUpdates.bind(this),
        };
    }

    private authorized(userId: number,
                       dcId: number,
                       host: string,
                       authKey: Uint8Array) {
        this.storage.writeAuthorization({
            dcId: dcId,
            host: host,
            authKey: authKey.buffer,
        });
    }

    private migrated(from: DataCenter, to: DataCenter) {

    }

    private shouldSyncUpdatesState() {

    }

    private receivedUpdates(updates: API.UpdatesType) {

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
}