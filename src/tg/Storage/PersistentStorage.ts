import { Observable } from "rxjs/Observable";
import { DexieStorage } from "./DexieStorage";

export namespace PersistentStorage {
    export interface Storage {
        readAuthorization(): Observable<Authorization | undefined>;
        readAuthorization(dcId: number): Observable<Authorization | undefined>;
        writeAuthorization(auth: Authorization): Observable<any>;

        readMyUserId(): Observable<number | undefined>;
        writeMyUserId(userId: number): Observable<any>;

        readUpdatesState(): Observable<UpdatesState | undefined>;
        writeUpdatesState(state: UpdatesState): Observable<any>;
    }

    export interface Authorization {
        dcId: number,
        host: string,
        authKey: ArrayBuffer,
    }

    export interface UserId {
        userId: number,
    }

    export interface UpdatesState {
        date: number;
        pts: number;
        qts: number;
        seq: number;
    }

    export const defaultStorage: Storage = new DexieStorage();
}