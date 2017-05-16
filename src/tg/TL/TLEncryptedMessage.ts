import {TLSerializable} from "./Interfaces/TLSerializable";
import {ByteStream} from "../DataStructures/ByteStream";

export class TLEncryptedMessage implements TLSerializable {
    static deserialized(data: ByteStream,
                        authKey: Uint8Array,
                        serverSalt: Uint8Array,
                        sessionId: Uint8Array): TLEncryptedMessage | undefined {
        return undefined;
    }

    serialized(): Uint8Array {
        return new Uint8Array([]);
    }
}