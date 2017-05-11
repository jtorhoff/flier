
import * as Long from "Long";
import {TLSerializable} from "../Interfaces/TLSerializable";
import {ByteStream} from "../../DataStructures/ByteStream";
import {deserialized32bit, serialized32bit} from "./NumberUtils";
import {Hashable} from "../../DataStructures/HashMap/Hashable";

export class TLLong implements TLSerializable, Hashable {
    static deserialized(data: ByteStream): TLLong | undefined {
        const lowBits = data.read(4);
        if (!lowBits) {
            return undefined;
        }
        const highBits = data.read(4);
        if (!highBits) {
            return undefined;
        }

        const low = deserialized32bit(lowBits);
        const high = deserialized32bit(highBits);

        return new TLLong(new Long(low, high));
    }

    serialized(): Uint8Array {
        const bytes = new Uint8Array(8);

        bytes.set(serialized32bit(this.value.low), 0);
        bytes.set(serialized32bit(this.value.high), 4);

        return bytes;
    }

    get hashValue(): number {
        return this.value.low ^ this.value.high;
    }

    equals(to: Hashable): boolean {
        return to instanceof TLLong && this.value.equals(to.value);
    }

    constructor(public readonly value: Long) {}
}