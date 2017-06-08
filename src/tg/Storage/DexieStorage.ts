import Dexie from "dexie";
import * as Rx from "rxjs";
import { Observable } from "rxjs/Observable";
import { PersistentStorage } from "./PersistentStorage";
import UpdatesState = PersistentStorage.UpdatesState;
import UserId = PersistentStorage.UserId;

export class DexieStorage implements PersistentStorage.Storage {
    private readonly db: Database;

    constructor() {
        this.db = new Database();
    }

    readAuthorization(dcId?: number): Observable<PersistentStorage.Authorization | undefined> {
        return Rx.Observable.fromPromise(
            this.db.authorizations.toCollection().first()
        );
    }

    writeAuthorization(auth: PersistentStorage.Authorization): Observable<any> {
        return Rx.Observable.fromPromise(
            this.db.authorizations.add(auth)
        );
    }

    readMyUserId(): Observable<number | undefined> {
        return Rx.Observable.fromPromise(
            this.db.authorizedUser.get(0)
        ).map(userId => userId ? userId.userId : undefined);
    }

    writeMyUserId(userId: number): Observable<any> {
        return Rx.Observable.fromPromise(
            this.db.authorizedUser.put({
                _: 0,
                userId: userId,
            })
        );
    }

    readUpdatesState(): Observable<UpdatesState | undefined> {
        return Rx.Observable.fromPromise(
            this.db.updatesState.get(0)
        );
    }

    writeUpdatesState(state: PersistentStorage.UpdatesState): Observable<any> {
        return Rx.Observable.fromPromise(
            this.db.updatesState.put({
                _: 0,
                ...state,
            })
        );
    }
}

class Database extends Dexie {
    authorizations: Dexie.Table<PersistentStorage.Authorization, number>;
    authorizedUser: Dexie.Table<UserId & constKey, number>;
    updatesState: Dexie.Table<PersistentStorage.UpdatesState & constKey, number>;

    constructor() {
        super("db");
        this.version(1).stores({
            authorizations: "dcId,host,authKey",
            authorizedUser: "_,userId",
            updatesState: "_,date,pts,qts,seq",
        });
    }
}

/**
 * Used for when we want to store one object only (primary key = 0).
 */
interface constKey {
    _: 0,
}
