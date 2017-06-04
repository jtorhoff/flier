import { ByteStream } from "../../DataStructures/ByteStream";
import { TLSerializable } from "../Interfaces/TLSerializable";

export class TLDouble implements TLSerializable {
    readonly value: number;

    static deserialized(data: ByteStream): TLDouble | undefined {
        const bytes = data.read(8);
        if (!bytes) return undefined;

        const double = new Float64Array(bytes)[0];
        return new TLDouble(double);
    }

    serialized(): Uint8Array {
        const doubleArray = new Float64Array([this.value]);
        return new Uint8Array(doubleArray);
    }

    get hashValue(): number {
        return this.value;
    }

    constructor(value: number) {}
}