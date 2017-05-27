
import {TLSerializable} from "../Interfaces/TLSerializable";
import {ByteStream} from "../../DataStructures/ByteStream";

export class TLDouble implements TLSerializable {
    readonly value: number;

    static deserialized(data: ByteStream): TLDouble | undefined {
        const bytes = data.read(4);
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