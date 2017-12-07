import { Observable } from "rxjs/Observable";
import { API } from "../Codegen/API/APISchema";
import { FileLocation, DocumentLocation } from "../Files/FileManager";
import { TLInt } from "../TL/Types/TLInt";
import { DexieStorage } from "./DexieStorage";

export namespace PersistentStorage {
    export interface Storage {
        clear(): Observable<any>;

        readAuthorization(): Observable<Authorization | undefined>;
        readAuthorization(dcId: number): Observable<Authorization | undefined>;
        writeAuthorization(auth: Authorization): Observable<any>;
        deleteAuthorization(dcId: number): Observable<any>;

        readMyUserId(): Observable<number | undefined>;
        writeMyUserId(userId: number): Observable<any>;

        readUpdatesState(): Observable<UpdatesState | undefined>;
        writeUpdatesState(state: UpdatesState): Observable<any>;

        readChats(...ids: number[]): Observable<Array<API.ChatType>>;
        writeChats(...chats: API.ChatType[]): Observable<any>;
        deleteChats(...ids: number[]): Observable<any>;

        readUsers(...ids: number[]): Observable<Array<API.UserType>>;
        writeUsers(...users: API.UserType[]): Observable<any>;
        deleteUsers(...ids: number[]): Observable<any>;
        updateUser(id: number, update: Partial<API.User>): Observable<API.User | undefined>;

        readMessages(...ids: Array<number | ArrayBuffer>): Observable<Array<API.MessageType & { randomId?: ArrayBuffer }>>;
        writeMessages(...messages: Array<API.MessageType & { randomId?: ArrayBuffer }>): Observable<any>;
        deleteMessages(...ids: number[]): Observable<Array<{ peer: API.PeerType, msgId: number}>>;

        /**
         * @param {number | ArrayBuffer} id Message's integer identifier of randomId.
         * @param {Partial<API.Message & API.MessageService & {randomId?: ArrayBuffer}>} update
         * @returns {Observable<(API.Message & {randomId?: ArrayBuffer}) | (API.MessageService & {randomId?: ArrayBuffer})>}
         */
        updateMessage(id: number | ArrayBuffer, update: Partial<API.Message & API.MessageService & { randomId?: ArrayBuffer }>): Observable<API.Message & { randomId?: ArrayBuffer } | API.MessageService & { randomId?: ArrayBuffer } | undefined>;
        clearMessageRandomIds(except: Array<ArrayBuffer>): Observable<any>;
        readMessageHistory(peer: API.PeerType, limit: number, offsetId?: number, offsetDate?: number): Observable<Array<API.MessageType & { randomId?: ArrayBuffer }>>;

        readFile(location: FileLocation | DocumentLocation): Observable<Blob | undefined>;
        appendFile(location: FileLocation | DocumentLocation, data: Blob, complete: boolean): Observable<{ complete: boolean, savedSize: number }>;

        readRecentStickers(): Observable<RecentStickers | undefined>;
        writeRecentStickers(stickers: RecentStickers): Observable<any>;

        readDialogs(...peers: API.PeerType[]): Observable<Array<API.Dialog & { topMessage: TLInt | ArrayBuffer }>>;
        writeDialogs(...dialogs: Array<API.Dialog & { topMessage: TLInt | ArrayBuffer }>): Observable<any>;
        updateDialog(peer: API.PeerType, update: Partial<API.Dialog & { topMessage: TLInt | ArrayBuffer }>): Observable<API.Dialog & { topMessage: TLInt | ArrayBuffer } | undefined>;
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
        readonly randomId?: ArrayBuffer;
        readonly peer: ["u" | "g" | "c", number];
        readonly date: number,
    }

    export interface File {
        readonly key: ArrayBuffer;
        readonly data: Blob;
        readonly complete: boolean;
    }

    export interface RecentStickers {
        readonly hash: number;
        readonly documentIds: Array<number>;
    }

    export interface Dialogs {
        readonly peer: ["u" | "g" | "c", number],
        readonly dialog: ArrayBuffer,
    }

    export const defaultStorage: Storage = new DexieStorage();
}