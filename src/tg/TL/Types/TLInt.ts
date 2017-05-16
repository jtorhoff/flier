import {TLSerializable} from "../Interfaces/TLSerializable";
import {ByteStream} from "../../DataStructures/ByteStream";
import {Hashable} from "../../DataStructures/HashMap/Hashable";

export class TLInt implements TLSerializable, Hashable {
    static deserialized(data: ByteStream): TLInt | undefined {
        const bytes = data.read(4);
        if (!bytes) return undefined;

        const value =
            (bytes[3] << 24) |
            (bytes[2] << 16) |
            (bytes[1] << 8)  |
            (bytes[0]);

        return new TLInt(value);
    }

    serialized(): Uint8Array {
        const bytes = new Uint8Array(4);

        bytes[3] = (this.value >> 24)  & 0xff;
        bytes[2] = (this.value >> 16)  & 0xff;
        bytes[1] = (this.value >> 8)   & 0xff;
        bytes[0] =  this.value         & 0xff;

        return bytes;
    }

    get hashValue(): number {
        return this.value;
    }

    equals(to: TLInt): boolean {
        return this.value === to.value;
    }

    constructor(readonly value: number) {}
}