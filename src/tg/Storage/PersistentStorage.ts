import { Observable } from "rxjs/Observable";
import { DexieStorage } from "./DexieStorage";
import { API } from "../Codegen/API/APISchema";

export namespace PersistentStorage {
    export interface Storage {
        clear(): Observable<any>;

        readAuthorization(): Observable<Authorization | undefined>;
        readAuthorization(dcId: number): Observable<Authorization | undefined>;
        writeAuthorization(auth: Authorization): Observable<any>;
        removeAuthorization(dcId: number): Observable<any>;

        readMyUserId(): Observable<number | undefined>;
        writeMyUserId(userId: number): Observable<any>;

        readUpdatesState(): Observable<UpdatesState | undefined>;
        writeUpdatesState(state: UpdatesState): Observable<any>;

        readChats(...ids: number[]): Observable<Array<API.ChatType>>;
        writeChats(chats: API.ChatType[]): Observable<any>;

        readUsers(...ids: number[]): Observable<Array<API.UserType>>;
        writeUsers(users: API.UserType[]): Observable<any>;

        readMessages(...ids: number[]): Observable<Array<API.MessageType>>;
        writeMessages(messages: API.MessageType[]): Observable<any>;

        readFile(location: API.FileLocation): Observable<Blob | undefined>;
        appendFile(location: API.FileLocation, data: Blob, complete: boolean): Observable<any>;
    }

    export interface Authorization {
        readonly dcId: number,
        readonly host: string,
        readonly authKey: ArrayBuffer,
        readonly main: 0 | 1,
    }

    export interface UserId {
        readonly userId: number,
    }

    export interface UpdatesState {
        readonly date: number;
        readonly pts: number;
        readonly qts: number;
        readonly seq: number;
    }

    export interface Chat {
        readonly id: number;
        readonly chat: ArrayBuffer;
    }

    export interface User {
        readonly id: number;
        readonly user: ArrayBuffer;
    }

    export interface Message {
        readonly id: number;
        readonly message: ArrayBuffer;
    }

    export interface File {
        readonly key: ArrayBuffer;
        readonly data: Blob;
        readonly complete: boolean;
    }

    export const defaultStorage: Storage = new DexieStorage();
}