import { ByteStream } from "../../DataStructures/ByteStream";
import { concat } from "../../Utils/BytesConcat";
import { TLSerializable } from "../Interfaces/TLSerializable";

export class TLBytes implements TLSerializable {
    static deserialized(data: ByteStream): TLBytes | undefined {
        const first = data.read(1);
        if (!first) return undefined;

        if (first[0] === 254) {
            const lenBytes = data.read(3);
            if (!lenBytes) return undefined;

            const len = lenBytes[0] | (lenBytes[1] << 8) | (lenBytes[2] << 16);
            const bytes = data.read(len);
            if (!bytes) return undefined;

            const read = 4 + bytes.length;
            data.moveCursorBy(padding(read));

            return new TLBytes(bytes);
        } else {
            const bytes = data.read(first[0]);
            if (!bytes) return undefined;

            const read = 1 + bytes.length;
            data.moveCursorBy(padding(read));

            return new TLBytes(bytes);
        }
    }

    serialized(): Uint8Array {
        let len: Uint8Array;
        if (this.bytes.length >= 254) {
            len = new Uint8Array([
                254,
                (this.bytes.length & 0xff),
                (this.bytes.length & 0xff00) >> 8,
                (this.bytes.length & 0xff0000) >> 16,
            ]);
        } else {
            len = new Uint8Array([
                this.bytes.length
            ]);
        }
        const paddingBytes = new Uint8Array(
            padding(len.length + this.bytes.length));

        return concat(len, this.bytes, paddingBytes);
    }

    constructor(readonly bytes: Uint8Array) {}
}

const padding = (num: number): number => {
    return ((num + 3) & ~3) - num;
};