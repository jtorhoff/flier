import {TLInt} from "../TL/Types/TLInt";
import {RSAPublicKeyStore} from "../RSA/RSAPublicKeyStore";
import {Session} from "./Session";
import {Observable} from "rxjs/Observable";
import {defer} from "../Utils/DeferOperator";
import {Subject} from "rxjs/Subject";
import {TLObject} from "../TL/Interfaces/TLObject";
import {AuthKeyGenerator} from "./AuthKeyGenerator";

export class DataCenter {
    private readonly requests = new Subject<Request>();
    private readonly sessionInitialized = new Subject<boolean>();
    readonly session: Session;
    /**
     * Permanent authorization key.
     */
    authKey?: Uint8Array;

    constructor(readonly host: string,
                readonly apiId: TLInt,
                readonly rsaKeyStore: RSAPublicKeyStore) {
        this.session = new Session(this.host);
        this.generateKey(false);

        this.requests
            .defer(this.sessionInitialized)
            .subscribe(request => {
                this.session.send(request.content, request.onResult);
            });
    }

    private generateKey(temporary: boolean) {
        const keyGenerator = new AuthKeyGenerator(
            this.session, this.rsaKeyStore, temporary);
        keyGenerator.generate().subscribe(({key, salt, timeDiff}) => {
            if (temporary) {
                this.session.authKey = key;
                this.session.serverSalt = salt;
                this.session.timeDifference = timeDiff;

                this.bindTempKey();
            } else {
                this.authKey = key;
                this.generateKey(true);
            }
        }, error => {
            this.session.close();
        })
    }

    private bindTempKey() {
        this.session.bindTo(this.authKey!)
            .subscribe(
                _ => {
                    this.initialize();
                },
                error => {
                    this.session.close();
                });
    }

    private initialize() {
        console.log("init call");
    }
}

interface Request {
    content: TLObject,
    onResult: (_: TLObject) => void,
    resultTypePrototype?: any,
}

// Add custom defer operator to the observable.
Observable.prototype.defer = defer;
declare module "rxjs/Observable" {
    interface Observable<T> {
        defer: typeof defer;
    }
}