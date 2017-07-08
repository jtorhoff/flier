import { ByteStream } from "../../DataStructures/ByteStream";
import { TLSerializable } from "../Interfaces/TLSerializable";

export class TLDouble implements TLSerializable {
    static deserialized(data: ByteStream): TLDouble | undefined {
        const bytes = data.read(8);
        if (!bytes) return undefined;

        return new TLDouble(new Float64Array(bytes.buffer)[0]);
    }

    serialized(): Uint8Array {
        const buffer = new ArrayBuffer(8);
        const doubleView = new Float64Array(buffer);
        doubleView[0] = this.value;

        return new Uint8Array(buffer);
    }

    get hashValue(): number {
        return this.value;
    }

    constructor(readonly value: number) {}
}