import * as platform from "platform";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import * as SessionWorker from "worker-loader!./SessionWorker";
import { API } from "../Codegen/API/APISchema";
import { MTProto } from "../Codegen/MTProto/MTProtoSchema";
import { ByteStream } from "../DataStructures/ByteStream";
import { HashMap } from "../DataStructures/HashMap/HashMap";
import { SecureRandom } from "../SecureRandom/SecureRandom";
import { TLFunction } from "../TL/Interfaces/TLFunction";
import { TLObject } from "../TL/Interfaces/TLObject";
import { deserializedObject } from "../TL/TLObjectDeserializer";
import { TLInt } from "../TL/Types/TLInt";
import { TLLong } from "../TL/Types/TLLong";
import { TLString } from "../TL/Types/TLString";
import { defer } from "../Utils/DeferOperator";
import { DataCenterDelegate } from "./DataCenterDelegate";
import { MonotonicClock } from "../MonotonicClock/MonotonicClock";

export class DataCenter {
    private readonly worker: Worker;
    private readonly requests = new Subject<Request>();
    private readonly onResults = new HashMap<TLInt, (_: TLObject) => void>();
    private readonly sessionInitialized = new BehaviorSubject(false);

    private reqId = 0;
    private authKey?: Uint8Array;

    dcId?: number;
    dcOptions: API.DcOption[] = [];

    delegate?: DataCenterDelegate;

    constructor(readonly apiId: number,
                readonly rsaKeys: string[],
                readonly host: string,
                authKey: Observable<Uint8Array | undefined>,
                readonly withUpdates: boolean = false) {
        this.worker = new SessionWorker();
        this.worker.addEventListener("message", event => {
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
                    console.debug(`[${this.host}]`, "deserialized", result);

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
                    if (this.delegate && this.withUpdates) {
                        this.delegate.shouldSyncUpdatesState();
                    }
                } break;

                case "updates": {
                    if (this.delegate && this.withUpdates) {
                        this.delegate.receivedUpdates(
                            deserializedObject(new ByteStream(event.data.obj))!)
                    }
                } break;
            }
        });

        addEventListener("online", () => {
            this.worker.postMessage({
                type: "open",
            });
        });

        addEventListener("offline", () => {
            this.worker.postMessage({
                type: "close",
            });
        });

        this.requests
            .defer(this.sessionInitialized)
            .subscribe(request => {
                this.send(request.content, request.onResult);
            });

        authKey.subscribe(key => {
            this.authKey = key;
            this.worker.postMessage({
                type: "init",
                obj: {
                    host: this.host,
                    keys: rsaKeys,
                    authKey: this.authKey,
                },
            });
        });
    }

    close() {
        this.worker.postMessage({
            type: "close",
        });
    }

    call<ResultType extends TLObject>(fun: TLFunction<ResultType>): Observable<ResultType> {
        return new Observable<ResultType>(observer => {
            this.requests.next({
                content: fun,
                onResult: (result) => {
                    if (result instanceof MTProto.RpcError) {
                        const error = errorForRpcError(result);
                        if (typeof error === "number") {
                            // TODO migrate
                        } else {
                            observer.error(error);
                        }
                    } else {
                        if (result instanceof API.auth.Authorization) {
                            if (this.delegate) {
                                this.delegate.authorized(
                                    result.user.id.value,
                                    this.dcId!,
                                    this.host,
                                    this.authKey!);
                                this.delegate.shouldSyncUpdatesState();
                            }
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
                this.dcOptions = result.dcOptions.items;
                this.worker.postMessage({
                    type: "acceptLegacy",
                });
                this.sessionInitialized.next(true);
            } else {
                this.close();
            }
        });
    }
}

const errorForRpcError = (rpcError: MTProto.RpcError): GenericError | number => {
    let error: GenericError | number;
    const errorMessage = rpcError.errorMessage.string;
    switch (rpcError.errorCode.value) {
        case 303: {
            const dcId = parseInt(errorMessage.replace(/[^0-9]/g, ""));
            if (Number.isInteger(dcId)) {
                error = dcId;
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
}

interface Request {
    content: TLObject,
    onResult: (_: TLObject) => void,
}

// Add custom defer operator to the observable.
Observable.prototype.defer = defer;
declare module "rxjs/Observable" {
    interface Observable<T> {
        defer: typeof defer;
    }
}