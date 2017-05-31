import { ByteStream } from "../../DataStructures/ByteStream";
import { TLSerializable } from "../Interfaces/TLSerializable";

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

    equals(to: TLInt128): boolean {
        for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] !== to.value[i]) {
                return false;
            }
        }

        return true;
    }

    constructor(value: Uint8Array) {
        if (value.length !== 16) {
            throw new TypeError();
        }
        this.value = value;
    }
}