import * as platform from "platform";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import * as SessionWorker from "worker-loader!./SessionWorker";
import { API } from "../Codegen/API/APISchema";
import { MTProto } from "../Codegen/MTProto/MTProtoSchema";
import { ByteStream } from "../DataStructures/ByteStream";
import { HashMap } from "../DataStructures/HashMap/HashMap";
import { TLFunction } from "../TL/Interfaces/TLFunction";
import { TLObject } from "../TL/Interfaces/TLObject";
import { deserializedObject } from "../TL/TLObjectDeserializer";
import { TLInt } from "../TL/Types/TLInt";
import { TLString } from "../TL/Types/TLString";
import "../Utils/DeferOperator";
import { DataCenterDelegate } from "./DataCenterDelegate";

export class DataCenter {
    private readonly worker: Worker;
    private readonly requests = new Subject<Request>();
    private readonly onResults = new HashMap<TLInt, (_: TLObject) => void>();
    private readonly sessionInitialized = new BehaviorSubject(false);
    private readonly configSubject = new BehaviorSubject<API.Config | undefined>(undefined);
    private readonly dcOptionsSubject = new BehaviorSubject<API.DcOption[]>([]);
    private readonly authorizedSubject = new BehaviorSubject(false);
    private readonly stateSubject = new BehaviorSubject(NetworkState.waitingForNetwork);

    private readonly messageEventListener = (event: MessageEvent) => {
        switch (event.data.type) {
            case "keyGenCompleted": {
                this.initConnection();
            } break;

            case "closed": {
                this.sessionInitialized.next(false);
            } break;

            case "result": {
                const reqId = TLInt.deserialized(
                    new ByteStream(event.data.obj.reqId));
                const result = deserializedObject(
                    new ByteStream(event.data.obj.result));

                if (!reqId) {
                    console.error("Couldn't deserialize reqId");
                    return;
                }
                if (!result) {
                    console.error("Couldn't deserialize result");
                    return;
                }
                if (DEBUG) {
                    console.debug(`[${this.host}]`, "deserialized", result);
                }

                const onResult = this.onResults.get(reqId);
                if (onResult) {
                    onResult(result);
                }
                this.onResults.remove(reqId);
            } break;

            case "authKey": {
                this.authKey = event.data.obj;
            } break;

            case "newServerSessionCreated": {
                if (this.delegate &&
                    this.authorizedSubject.value &&
                    this.delegate.shouldSyncUpdatesState) {
                    this.delegate.shouldSyncUpdatesState();
                }
            } break;

            case "updates": {
                if (this.delegate && this.delegate.receivedUpdates) {
                    this.delegate.receivedUpdates(
                        deserializedObject(new ByteStream(event.data.obj))!)
                }
            } break;

            case "waitingForNetwork": {
                this.stateSubject.next(NetworkState.waitingForNetwork);
            } break;

            case "connecting": {
                this.stateSubject.next(NetworkState.connecting);
            } break;
        }
    };

    private readonly onlineEventListener = () => {
        this.worker.postMessage({
            type: "open",
        });
    };

    private readonly offlineEventListener = () => {
        this.worker.postMessage({
            type: "close",
        });
    };

    private reqId = 0;
    private host?: string;
    private authKey?: Uint8Array;
    private dcId?: number;

    delegate?: DataCenterDelegate;

    get dcOptions(): Observable<API.DcOption[]> {
        return this.dcOptionsSubject.asObservable();
    }

    get authorized(): Observable<boolean> {
        return this.authorizedSubject.skip(1);
    }

    get config(): API.Config | undefined {
        return this.configSubject.getValue();
    }

    get state(): Observable<NetworkState> {
        return this.stateSubject.asObservable();
    }

    constructor(readonly apiId: number) {
        this.worker = new SessionWorker();
        this.worker.addEventListener("message", this.messageEventListener);

        window.addEventListener("online", this.onlineEventListener);
        window.addEventListener("offline", this.offlineEventListener);

        this.requests
            .defer(this.sessionInitialized)
            .defer(this.authorizedSubject, request => {
                return methodsNotRequiringAuthorization
                    .find(c => c === request.content.constructor)
            })
            .subscribe(request => {
                this.send(request.content, request.onResult);
            });
    }

    init(rsaKeys: string[],
         host: string,
         authKey?: ArrayBuffer) {
        this.host = host;
        this.authKey = authKey ? new Uint8Array(authKey) : undefined;
        this.worker.postMessage({
            type: "init",
            obj: {
                host: host,
                keys: rsaKeys,
                authKey: this.authKey,
            },
        });
        this.authorizedSubject.next(!!this.authKey);
    }

    close() {
        window.removeEventListener("online", this.onlineEventListener);
        window.removeEventListener("offline", this.offlineEventListener);

        this.worker.postMessage({
            type: "close",
        });
        this.worker.removeEventListener("message", this.messageEventListener);
        this.worker.terminate();
        this.requests.unsubscribe();
        this.sessionInitialized.unsubscribe();
        this.configSubject.unsubscribe();
        this.dcOptionsSubject.unsubscribe();
        this.authorizedSubject.unsubscribe();
        this.stateSubject.unsubscribe();
    }

    importAuthorization(dc: DataCenter) {
        dc.sessionInitialized
            .filter(inited => inited)
            .defer(this.sessionInitialized)
            .flatMap(() => {
                const exportAuth = new API.auth.ExportAuthorization(new TLInt(this.dcId!));
                return dc.call(exportAuth);
            })
            .flatMap((exportedAuth: API.auth.ExportedAuthorization) => {
                const importAuth = new API.auth.ImportAuthorization(
                    exportedAuth.id, exportedAuth.bytes);
                return this.call(importAuth);
            })
            .subscribe();
    }

    call<ResultType extends TLObject>(fun: TLFunction<ResultType>): Observable<ResultType> {
        return new Observable<ResultType>(observer => {
            this.requests.next({
                content: fun,
                onResult: (result) => {
                    if (result instanceof MTProto.RpcError) {
                        const error = errorForRpcError(result);
                        if (error.type === ErrorType.seeOther) {
                            // TODO migrate
                        } else if (error.type === ErrorType.unauthorized) {
                            this.authorizedSubject.next(false);
                        }
                        observer.error(error);
                    } else {
                        if (result instanceof API.auth.Authorization) {
                            if (this.delegate) {
                                this.delegate.authorized(
                                    result.user.id.value,
                                    this.dcId!,
                                    this.host!,
                                    this.authKey!);
                                if (this.delegate.shouldSyncUpdatesState) {
                                    this.delegate.shouldSyncUpdatesState();
                                }
                            }
                            this.authorizedSubject.next(true);
                        }
                        observer.next(result as ResultType);
                    }
                    observer.complete();
                },
            });
        });
    }

    private send(content: TLObject, onResult: (result: TLObject) => void) {
        const reqId = new TLInt(this.reqId++);
        this.onResults.put(reqId, onResult);
        this.worker.postMessage({
            type: "send",
            obj: {
                "content": content.serialized(),
                "reqId": reqId.serialized(),
            },
        });
    }

    private initConnection() {
        const getConfig = new API.help.GetConfig();
        const initConnection = new API.InitConnection(
            new TLInt(this.apiId),
            new TLString(platform.name || "Web"),
            new TLString(platform.os ?
                platform.os.family + " " + platform.os.version :
                "Unknown"),
            new TLString(VERSION),
            new TLString(navigator.language),
            getConfig,
        );
        const invokeWithLayer = new API.InvokeWithLayer(
            new TLInt(API.layer),
            initConnection);

        this.send(invokeWithLayer, result => {
            if (result instanceof API.Config) {
                this.dcId = result.thisDc.value;
                this.configSubject.next(result);
                this.dcOptionsSubject.next(result.dcOptions.items);
                this.worker.postMessage({
                    type: "acceptLegacy",
                });
                this.sessionInitialized.next(true);
                this.stateSubject.next(NetworkState.idling);
            } else {
                this.close();
            }
        });
    }
}

const errorForRpcError = (rpcError: MTProto.RpcError): GenericError => {
    let error: GenericError | number;
    const errorMessage = rpcError.errorMessage.string;
    switch (rpcError.errorCode.value) {
        case 303: {
            const dcId = parseInt(errorMessage.replace(/[^0-9]/g, ""));
            if (Number.isInteger(dcId)) {
                error = {
                    type: ErrorType.seeOther,
                    dcId: dcId,
                };
            } else {
                error = {
                    type: ErrorType.internal,
                };
            }
        } break;

        case 400: {
            error = {
                type: ErrorType.badRequest,
                details: errorMessage,
            };
        } break;

        case 401: {
            error = {
                type: ErrorType.unauthorized,
                details: errorMessage,
            };
        } break;

        case 403: {
            error = {
                type: ErrorType.forbidden,
                details: errorMessage,
            }
        } break;

        case 404: {
            error = {
                type: ErrorType.notFound,
                details: errorMessage,
            }
        } break;

        case 420: {
            const waitFor = parseInt(errorMessage.replace(/[^0-9]/g, ""));
            if (Number.isInteger(waitFor)) {
                error = {
                    type: ErrorType.flood,
                    waitFor: waitFor,
                }
            } else {
                error = {
                    type: ErrorType.internal,
                };
            }
        } break;

        default: {
            error = {
                type: ErrorType.internal,
                details: errorMessage,
            }
        } break;
    }

    return error;
};

export const enum ErrorType {
    seeOther = 303,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    flood = 420,
    internal,
}

export interface GenericError {
    type: ErrorType,
    details?: string,
    waitFor?: number,
    dcId?: number,
}

export const enum NetworkState {
    waitingForNetwork,
    connecting,
    idling,
}

interface Request {
    content: TLObject,
    onResult: (_: TLObject) => void,
}

const methodsNotRequiringAuthorization: any[] = [
    API.auth.SendCode,
    API.auth.CheckPhone,
    API.auth.SignUp,
    API.auth.SignIn,
    API.account.GetPassword,
    API.auth.CheckPassword,
    API.auth.ImportAuthorization,
];