
import {TLSerializable} from "../Interfaces/TLSerializable";
import {ByteStream} from "../../DataStructures/ByteStream";

export class TLInt128 implements TLSerializable {
    readonly value: Uint8Array;

    static deserialized(data: ByteStream): TLInt128 | undefined {
        const bytes = data.read(16);
        if (!bytes) return undefined;

        return new TLInt128(bytes);
    }

    serialized(): Uint8Array {
        return this.value;
    }

    constructor(value: Uint8Array) {
        if (value.length != 16) {
            throw new TypeError();
        }
        this.value = value;
    }
}