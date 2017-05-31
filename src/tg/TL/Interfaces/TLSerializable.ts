import { ByteStream } from "../../DataStructures/ByteStream";

export abstract class TLSerializable {
    static deserialized<T>(
        this: { new(): T }, data: ByteStream): T | undefined {
        throw new TypeError();
    }

    abstract serialized(): Uint8Array;
}