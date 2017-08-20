import Dexie from "dexie";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { API } from "../Codegen/API/APISchema";
import { ByteStream } from "../DataStructures/ByteStream";
import { FileLocation, DocumentLocation } from "../Files/FileManager";
import { deserializedObject } from "../TL/TLObjectDeserializer";
import { TLInt } from "../TL/Types/TLInt";
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
            this.db.authorizations.put(auth)
        );
    }

    deleteAuthorization(dcId: number): Observable<any> {
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
        return Observable.fromPromise(this.db.chats.where("id").anyOf(ids).toArray())
            .map(chats => {
                return chats.map(chat => {
                    return deserializedObject(new ByteStream(new Uint8Array(chat.chat))) as API.ChatType
                })
            });
    }

    writeChats(...chats: API.ChatType[]): Observable<any> {
        return Observable.fromPromise(
            this.db.chats.bulkPut(chats.map(chat => {
                return {
                    id: chat.id.value,
                    chat: chat.serialized().buffer,
                }
            }))
        );
    }

    deleteChats(...ids: number[]): Observable<any> {
        return Observable.fromPromise(
            this.db.chats.bulkDelete(ids)
        );
    }

    readUsers(...ids: number[]): Observable<Array<API.UserType>> {
        return Observable.fromPromise(this.db.users.where("id").anyOf(ids).toArray())
            .map(users => {
                return users.map(user => {
                    return deserializedObject(new ByteStream(new Uint8Array(user.user))) as API.UserType
                })
            });
    }

    writeUsers(...users: API.UserType[]): Observable<any> {
        return Observable.fromPromise(
            this.db.users.bulkPut(users.map(user => {
                return {
                    id: user.id.value,
                    user: user.serialized().buffer,
                }
            }))
        );
    }

    deleteUsers(...ids: number[]): Observable<any> {
        return Observable.fromPromise(
            this.db.users.bulkDelete(ids)
        );
    }

    updateUser(id: number, update: Partial<API.User>): Observable<API.User | undefined> {
        return Observable.fromPromise(
            this.db.transaction("rw!", this.db.users, async () => {
                const user = await this.db.users.where("id").equals(id).first();
                if (!user) return;

                const apiUser = deserializedObject(
                    new ByteStream(new Uint8Array(user.user)));
                if (apiUser instanceof API.User) {
                    partialAssign(apiUser, update);
                    await this.db.users.put({
                        id: id,
                        user: apiUser.serialized().buffer,
                    });

                    return apiUser;
                }

                return undefined;
            })
        );
    }

    readMessages(...ids: number[]): Observable<Array<API.MessageType>> {
        return Observable.fromPromise(this.db.messages.where("id").anyOf(ids).toArray())
            .map(messages => {
                return messages.map(msg => {
                    return deserializedObject(new ByteStream(new Uint8Array(msg.message))) as API.MessageType
                })
            });
    }

    writeMessages(...messages: API.MessageType[]): Observable<any> {
        return Observable.fromPromise(
            this.db.messages.bulkPut(messages.map(msg => {
                let peer: ["u" | "g" | "c", number] | undefined = undefined;
                if (msg instanceof API.Message || msg instanceof API.MessageService) {
                    if (msg.toId instanceof API.PeerChat ||
                        msg.toId instanceof API.PeerChannel ||
                        (msg.toId && msg.out)) {
                        if (msg.toId instanceof API.PeerChat) {
                            peer = ["g", msg.toId.chatId.value];
                        } else if (msg.toId instanceof API.PeerChannel) {
                            peer = ["c", msg.toId.channelId.value];
                        } else if (msg.toId instanceof API.PeerUser) {
                            peer = ["u", msg.toId.userId.value];
                        }
                    } else if (msg.fromId) {
                        peer = ["u", msg.fromId.value];
                    }
                }

                return {
                    id: msg.id.value,
                    // randomId: 0,
                    message: msg.serialized().buffer,
                    peer: peer,
                }
            }))
        );
    }

    deleteMessages(...ids: number[]): Observable<any> {
        return Observable.fromPromise(
            this.db.transaction("rw!", this.db.messages, async () => {
                const msgs = await this.db.messages.where("id").anyOf(ids).toArray();

                const result: Array<{ peer: API.PeerType, msgId: number }> = [];
                for (let msg of msgs) {
                    if (!msg.peer) continue;
                    let peer: API.PeerType;
                    switch (msg.peer[0]) {
                        case "u":
                            peer = new API.PeerUser(new TLInt(msg.peer[1]));
                            break;

                        case "g":
                            peer = new API.PeerChat(new TLInt(msg.peer[1]));
                            break;

                        case "c":
                            peer = new API.PeerChannel(new TLInt(msg.peer[1]));
                            break;
                    }

                    result.push({
                        peer: peer!,
                        msgId: msg.id,
                    })
                }

                await this.db.messages.bulkDelete(ids);
                return result;
            })
        );
    }

    updateMessage(id: number, update: Partial<API.Message & API.MessageService>): Observable<API.Message | API.MessageService | undefined> {
        return Observable.fromPromise(
            this.db.transaction("rw!", this.db.messages, async () => {
                const message = await this.db.messages.where("id").equals(id).first();
                if (!message) return;

                const apiMessage = deserializedObject(
                    new ByteStream(new Uint8Array(message.message)));
                if (apiMessage instanceof API.Message) {
                    partialAssign(apiMessage, update);
                } else if (apiMessage instanceof API.MessageService) {
                    partialAssign(apiMessage, update);
                } else {
                    return undefined;
                }

                await this.db.messages.put({
                    id: id,
                    message: apiMessage.serialized().buffer,
                });

                return apiMessage;
            })
        );
    }

    readTopMessage(peer: API.PeerType): Observable<API.MessageType | undefined> {
        let dbPeer: ["u" | "g" | "c", number];
        if (peer instanceof API.PeerUser) {
            dbPeer = ["u", peer.userId.value];
        } else if (peer instanceof API.PeerChat) {
            dbPeer = ["g", peer.chatId.value];
        } else if (peer instanceof API.PeerChannel) {
            dbPeer = ["c", peer.channelId.value];
        } else {
            throw new Error();
        }

        return Observable.fromPromise(
            this.db.messages.where("peer").equals(dbPeer).reverse().limit(1).sortBy("id")
        ).map(messages => {
            return messages.map(msg => {
                return deserializedObject(new ByteStream(new Uint8Array(msg.message))) as API.MessageType
            })
        }).flatMap(messages => messages);
    }

    readFile(location: FileLocation | DocumentLocation): Observable<Blob | undefined> {
        const key = location.serialized().buffer;

        return Observable
            .fromPromise(this.db.files.where("key").equals(key).and(file => file.complete).first())
            .map(file => file ? file.data : undefined);
    }

    appendFile(location: FileLocation | DocumentLocation, data: Blob, complete: boolean): Observable<boolean> {
        const key = location.serialized().buffer;

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

                return complete;
            }));
    }

    readRecentStickers(): Observable<PersistentStorage.RecentStickers | undefined> {
        return Observable.fromPromise(this.db.recentStickers.get(0));
    }

    writeRecentStickers(stickers: PersistentStorage.RecentStickers): Observable<any> {
        return Observable.fromPromise(
            this.db.recentStickers.put({
                _: 0,
                ...stickers,
            })
        );
    }

    writeDialogs(...dialogs: API.Dialog[]): Observable<any> {
        return Observable.fromPromise(
            this.db.dialogs.bulkPut(dialogs.map(dialog => {
                let peer: ["u" | "g" | "c", number];
                if (dialog.peer instanceof API.PeerUser) {
                    peer = ["u", dialog.peer.userId.value];
                } else if (dialog.peer instanceof API.PeerChat) {
                    peer = ["g", dialog.peer.chatId.value];
                } else if (dialog.peer instanceof API.PeerChannel) {
                    peer = ["c", dialog.peer.channelId.value];
                } else {
                    throw new Error();
                }

                return {
                    peer: peer,
                    topMessageId: dialog.topMessage.value,
                    dialog: dialog.serialized().buffer,
                }
            }))
        )
    }

    readDialogs(...peers: API.PeerType[]): Observable<Array<API.Dialog>> {
        const dbPeers = peers.map(peer => {
            if (peer instanceof API.PeerUser) {
                return ["u", peer.userId.value];
            } else if (peer instanceof API.PeerChat) {
                return ["g", peer.chatId.value];
            } else if (peer instanceof API.PeerChannel) {
                return ["c", peer.channelId.value];
            } else {
                throw new Error();
            }
        });

        return Observable.fromPromise(
            this.db.dialogs.where("peer").anyOf(dbPeers as Array<Array<any>>).toArray())
            .map(dialogs => {
                return dialogs.map(dialog => {
                    return deserializedObject(new ByteStream(new Uint8Array(dialog.dialog))) as API.Dialog
                })
            });
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
    recentStickers: Dexie.Table<PersistentStorage.RecentStickers & constKey, number>;
    dialogs: Dexie.Table<PersistentStorage.Dialogs, number>;

    constructor() {
        super("db");
        this.version(1).stores({
            authorizations: "dcId,main",
            authorizedUser: "_",
            updatesState: "_",
            chats: "id",
            users: "id",
            messages: "id,randomId,peer",
            files: "key",
            recentStickers: "_",
            dialogs: "peer,topMessageId",
        });
    }
}

/**
 * Used for when we want to store one object only (primary key = 0 for all entries).
 */
interface constKey {
    _: 0,
}

const partialAssign = <T>(target: T, source: Partial<T>) => {
    Object.assign(target, source);
};