import { API } from "../Codegen/API/APISchema";
import { ByteStream } from "../DataStructures/ByteStream";
import { RSAPublicKey } from "../RSA/RSAPublicKey";
import { RSAPublicKeyStore } from "../RSA/RSAPublicKeyStore";
import { deserializedObject } from "../TL/TLObjectDeserializer";
import { AuthKeyGenerator } from "./AuthKeyGenerator";
import { Session, SessionDelegate, SessionLegacy } from "./Session";

const rsaKeyStore = new RSAPublicKeyStore();
let host: string | undefined;
let session: Session | undefined;
let sessionLegacy: SessionLegacy | undefined;
let sessionInitialized = false;
let authKey: Uint8Array | undefined;

const openSession = () => {
    session = new Session(host!);
    session.delegate = delegate;
    generateKey(!!authKey);

    sendMessage({
        type: "connecting",
    });
};

const sessionClosed = (legacy: SessionLegacy) => {
    if (sessionInitialized) {
        sessionLegacy = legacy;
    }
    sessionInitialized = false;
    sendMessage({
        type: "closed",
    });

    setTimeout(() => {
        if (navigator.onLine) {
            openSession();
        } else {
            sendMessage({
                type: "waitingForNetwork",
            });
        }
    }, 300);
};

const newServerSessionCreated = () => {
    if (authKey) {
        sendMessage({
            type: "newServerSessionCreated",
        });
    }
};

const receivedUpdates = (updates: API.UpdatesType) => {
    sendMessage({
        type: "updates",
        obj: updates.serialized(),
    });
};

const generateKey = (temporary: boolean) => {
    const keyGenerator = new AuthKeyGenerator(
        session!, rsaKeyStore, temporary);
    keyGenerator.generate().subscribe(
        ({ key, salt, timeDiff }) => {
            if (temporary) {
                session!.authKey = key;
                session!.serverSalt = salt;
                session!.timeDifference = timeDiff;

                bindTempKey();
            } else {
                authKey = key;
                generateKey(true);
                sendMessage({
                    type: "authKey",
                    obj: authKey,
                });
            }
        }, () => {
            session!.close();
        })
};

const bindTempKey = () => {
    session!.bindTo(authKey!).subscribe(
        _ => {
            sendMessage({
                type: "keyGenCompleted",
            });
        },
        () => {
            session!.close();
        });
};

onmessage = (event: MessageEvent) => {
    switch (event.data.type) {
        case "init": {
            host = event.data.obj.host;
            authKey = event.data.obj.authKey;

            const keys = event.data.obj.keys;
            for (let key of keys) {
                rsaKeyStore.addKey(RSAPublicKey.fromString(key));
            }

            openSession();
        } break;

        case "open": {
            openSession();
        } break;

        case "close": {
            session!.close();
        } break;

        case "send": {
            const content = deserializedObject(
                new ByteStream(event.data.obj.content))!;

            session!.send(content, result => {
                let res: Uint8Array;
                if (result instanceof Uint8Array) {
                    res = result;
                } else {
                    res = result.serialized();
                }

                sendMessage({
                    type: "result",
                    obj: {
                        result: res,
                        reqId: event.data.obj.reqId,
                    }
                });
            });
        } break;

        case "acceptLegacy": {
            if (sessionLegacy) {
                session!.acceptLegacy(sessionLegacy);
            }
        } break;
    }
};

const delegate: SessionDelegate = {
    sessionClosed: sessionClosed,
    newServerSessionCreated: newServerSessionCreated,
    receivedUpdates: receivedUpdates,
};

// Using postMessage directly results in an error,
// likely a TypeScript or webpack bug.
const sendMessage: any = postMessage;