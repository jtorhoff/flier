
import {TLSerializable} from "../Interfaces/TLSerializable";
import {ByteStream} from "../../DataStructures/ByteStream";
import {deserialized32bit, serialized32bit} from "./NumberUtils";
import {Hashable} from "../../DataStructures/HashMap/Hashable";

export class TLInt implements TLSerializable, Hashable {
    static deserialized(data: ByteStream): TLInt | undefined {
        const bytes = data.read(4);
        if (!bytes) {
            return undefined;
        }

        return new TLInt(deserialized32bit(bytes));
    }

    serialized(): Uint8Array {
        return serialized32bit(this.value);
    }

    get hashValue(): number {
        return this.value;
    }

    equals(to: Hashable): boolean {
        return to instanceof TLInt && this.value === to.value;
    }

    constructor(public readonly value: number) {}
}