import Dexie from "dexie";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { API } from "../Codegen/API/APISchema";
import { ByteStream } from "../DataStructures/ByteStream";
import { deserializedObject } from "../TL/TLObjectDeserializer";
import { concat } from "../Utils/BytesConcat";
import { PersistentStorage } from "./PersistentStorage";

export class DexieStorage implements PersistentStorage.Storage {
    private readonly db: Database;

    constructor() {
        this.db = new Database();
    }

    clear(): Observable<any> {
        const observables: Observable<any>[] = [];

        this.db.tables.forEach(table => {
            observables.push(Observable.fromPromise(table.clear()));
        });

        return Observable.merge(observables);
    }

    readAuthorization(dcId?: number): Observable<PersistentStorage.Authorization | undefined> {
        if (dcId) {
            return Observable.fromPromise(
                this.db.authorizations.where({ dcId: dcId }).first()
            );
        } else {
            return Observable.fromPromise(
                this.db.authorizations.where({ main: 1 }).first()
            );
        }
    }

    writeAuthorization(auth: PersistentStorage.Authorization): Observable<any> {
        return Observable.fromPromise(
            this.db.authorizations.add(auth)
        );
    }

    removeAuthorization(dcId: number): Observable<any> {
        return Observable.fromPromise(
            this.db.authorizations.delete(dcId)
        );
    }

    readMyUserId(): Observable<number | undefined> {
        return Observable.fromPromise(
            this.db.authorizedUser.get(0)
        ).map(userId => userId ? userId.userId : undefined);
    }

    writeMyUserId(userId: number): Observable<any> {
        return Observable.fromPromise(
            this.db.authorizedUser.put({
                _: 0,
                userId: userId,
            })
        );
    }

    readUpdatesState(): Observable<PersistentStorage.UpdatesState | undefined> {
        return Observable.fromPromise(
            this.db.updatesState.get(0)
        );
    }

    writeUpdatesState(state: PersistentStorage.UpdatesState): Observable<any> {
        return Observable.fromPromise(
            this.db.updatesState.put({
                _: 0,
                ...state,
            })
        );
    }

    readChats(...ids: number[]): Observable<Array<API.ChatType>> {
        return Observable.fromPromise(this.db.chats.where({ id: ids }).toArray())
            .map(chats => {
                return chats.map(chat => {
                    return deserializedObject(new ByteStream(new Uint8Array(chat.chat)))
                })
            });
    }

    writeChats(chats: API.ChatType[]): Observable<any> {
        return Observable.fromPromise(
            this.db.chats.bulkAdd(chats.map(chat => {
                return {
                    id: chat.id.value,
                    chat: chat.serialized().buffer,
                }
            }))
        );
    }

    readUsers(...ids: number[]): Observable<Array<API.UserType>> {
        return Observable.fromPromise(this.db.users.where({ id: ids }).toArray())
            .map(users => {
                return users.map(user => {
                    return deserializedObject(new ByteStream(new Uint8Array(user.user)))
                })
            });
    }

    writeUsers(users: API.UserType[]): Observable<any> {
        return Observable.fromPromise(
            this.db.chats.bulkAdd(users.map(user => {
                return {
                    id: user.id.value,
                    chat: user.serialized().buffer,
                }
            }))
        );
    }

    readMessages(...ids: number[]): Observable<Array<API.MessageType>> {
        return Observable.fromPromise(this.db.messages.where({ id: ids }).toArray())
            .map(messages => {
                return messages.map(msg => {
                    return deserializedObject(new ByteStream(new Uint8Array(msg.message)))
                })
            });
    }

    writeMessages(messages: API.MessageType[]): Observable<any> {
        return Observable.fromPromise(
            this.db.chats.bulkAdd(messages.map(msg => {
                return {
                    id: msg.id.value,
                    chat: msg.serialized().buffer,
                }
            }))
        );
    }

    readFile(location: API.FileLocation): Observable<Blob | undefined> {
        const key = concat(
            location.dcId.serialized(),
            location.volumeId.serialized(),
            location.localId.serialized(),
            location.secret.serialized()).buffer;

        return Observable.fromPromise(this.db.files.where({ key: key }).first())
            .map(file => file && file.complete ? file.data : undefined);
    }

    appendFile(location: API.FileLocation, data: Blob, complete: boolean): Observable<any> {
        const key = concat(
            location.dcId.serialized(),
            location.volumeId.serialized(),
            location.localId.serialized(),
            location.secret.serialized()).buffer;

        return Observable.fromPromise(
            this.db.transaction("rw!", this.db.files, async () => {
                const file = await this.db.files.where({ key: key }).first();
                if (file) {
                    await this.db.files.put({
                        key: key,
                        data: new Blob([file.data, data]),
                        complete: complete,
                    });
                } else {
                    await this.db.files.put({
                        key: key,
                        data: data,
                        complete: complete,
                    });
                }
            }));
    }
}

class Database extends Dexie {
    authorizations: Dexie.Table<PersistentStorage.Authorization, number>;
    authorizedUser: Dexie.Table<PersistentStorage.UserId & constKey, number>;
    updatesState: Dexie.Table<PersistentStorage.UpdatesState & constKey, number>;
    chats: Dexie.Table<PersistentStorage.Chat, number>;
    users: Dexie.Table<PersistentStorage.User, number>;
    messages: Dexie.Table<PersistentStorage.Message, number>;
    files: Dexie.Table<PersistentStorage.File, number>;

    constructor() {
        super("db");
        this.version(1).stores({
            authorizations: "dcId,host,authKey,main",
            authorizedUser: "_,userId",
            updatesState: "_,date,pts,qts,seq",
            chats: "id,chat",
            users: "id,user",
            messages: "id,message",
            files: "key,data,complete",
        });
    }
}

/**
 * Used for when we want to store one object only (primary key = 0 for all entries).
 */
interface constKey {
    _: 0,
}
