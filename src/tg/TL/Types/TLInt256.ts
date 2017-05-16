import {TLSerializable} from "../Interfaces/TLSerializable";
import {ByteStream} from "../../DataStructures/ByteStream";

export class TLInt256 implements TLSerializable {
    readonly value: Uint8Array;

    static deserialized(data: ByteStream): TLInt256 | undefined {
        const bytes = data.read(32);
        if (!bytes) return undefined;

        return new TLInt256(bytes);
    }

    serialized(): Uint8Array {
        return this.value;
    }

    equals(to: TLInt256): boolean {
        for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] !== to.value[i]) {
                return false;
            }
        }

        return true;
    }

    constructor(value: Uint8Array) {
        if (value.length !== 32) {
            throw new TypeError();
        }
        this.value = value;
    }
}