import {TLSerializable} from "../Interfaces/TLSerializable";
import {ByteStream} from "../../DataStructures/ByteStream";
import {TLBytes} from "./TLBytes";

export class TLString implements TLSerializable {
    static deserialized(data: ByteStream): TLString | undefined {
        const bytes = TLBytes.deserialized(data);
        if (!bytes) return undefined;

        const string = new TextDecoder().decode(bytes.bytes);

        return new TLString(string);
    }

    serialized(): Uint8Array {
        return new TLBytes(new TextEncoder().encode(this.string)).serialized();
    }

    constructor(readonly string: string) {}
}