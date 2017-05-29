import {TLInt} from "../TL/Types/TLInt";
import {RSAPublicKeyStore} from "../RSA/RSAPublicKeyStore";
import {Session, SessionDelegate, SessionLegacy} from "./Session";
import {Observable} from "rxjs/Observable";
import {defer} from "../Utils/DeferOperator";
import {Subject} from "rxjs/Subject";
import {TLObject} from "../TL/Interfaces/TLObject";
import {AuthKeyGenerator} from "./AuthKeyGenerator";
import {API} from "../Codegen/API/APISchema";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class DataCenter implements SessionDelegate {
    private readonly requests = new Subject<Request>();
    private readonly sessionInitialized = new BehaviorSubject(false);

    session: Session;
    sessionLegacy?: SessionLegacy;

    dcId?: number;
    dcOptions: API.DcOption[] = [];
    /**
     * Permanent authorization key.
     */
    authKey?: Uint8Array;

    constructor(readonly host: string,
                readonly apiId: TLInt,
                readonly rsaKeyStore: RSAPublicKeyStore,
                authKey?: Uint8Array) {
        this.authKey = authKey;

        window.ononline = () => {
            this.openSession();
        };

        window.onoffline = () => {
            this.session.close();
        };

        this.openSession();
        this.requests
            .defer(this.sessionInitialized)
            .subscribe(request => {
                this.session.send(request.content, request.onResult);
            });
    }

    openSession() {
        this.session = new Session(this.host);
        this.session.delegate = this;
        this.generateKey(!!this.authKey);
    }

    sessionClosed(legacy: SessionLegacy) {
        // We only are interested in the legacy if the session has been
        // initialized.
        if (this.sessionInitialized.value) {
            this.sessionLegacy = legacy;
        }
        this.sessionInitialized.next(false);

        if (navigator.onLine) {
            this.openSession();
        }
    }

    newServerSessionCreated() {

    }

    receivedUpdates(updates: API.UpdatesType) {

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
                    console.log("binded");
                    this.initialize();
                },
                error => {
                    this.session.close();
                });
    }

    private initialize() {
        this.session.initialize(this.apiId)
            .subscribe(
                config => {
                    this.dcId = config.thisDc.value;
                    this.dcOptions = config.dcOptions.items;
                    if (this.sessionLegacy) {
                        this.session.acceptLegacy(this.sessionLegacy);
                    }
                    console.log("inited");
                    this.sessionInitialized.next(true);
                },
                error => {
                    this.session.close();
                });
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