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

export class DataCenter {
    private readonly worker: Worker;
    private readonly requests = new Subject<Request>();
    private readonly onResults = new HashMap<TLLong, (_: TLObject) => void>();
    private readonly sessionInitialized = new BehaviorSubject(false);

    dcId?: number;
    dcOptions: API.DcOption[] = [];

    constructor(readonly apiId: number,
                readonly rsaKeys: string[],
                readonly host: string,
                authKey?: Uint8Array) {
        this.worker = new SessionWorker();
        this.worker.postMessage({
            type: "init",
            obj: {
                host: this.host,
                keys: rsaKeys,
                authKey: authKey,
            },
        });
        this.worker.addEventListener("message", event => {
            switch (event.data.type) {
                case "keyGenCompleted": {
                    this.initConnection();
                } break;

                case "closed": {
                    this.sessionInitialized.next(false);
                } break;

                case "result": {
                    const reqId = TLLong.deserialized(
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

                    const onResult = this.onResults.get(reqId);
                    if (onResult) {
                        onResult(result);
                    }
                    this.onResults.remove(reqId);
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
                        observer.error(result);
                    } else {
                        observer.next(result as ResultType);
                    }
                    observer.complete();
                },
            });
        });
    }

    private send(content: TLObject, onResult: (result: TLObject) => void) {
        let reqId: TLLong;
        do {
            reqId = TLLong.deserialized(
                new ByteStream(SecureRandom.bytes(8)))!;
        } while (this.onResults.get(reqId) !== undefined);

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
            new TLString(platform.description || ""),
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