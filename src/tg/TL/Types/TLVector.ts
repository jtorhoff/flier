import {TLSerializable} from "../Interfaces/TLSerializable";
import {TLObject} from "../Interfaces/TLObject";
import {TLInt} from "./TLInt";
import {ByteStream} from "../../DataStructures/ByteStream";
import {concat} from "../../Utils/BytesConcat";

export class TLVector<T extends TLSerializable> implements TLObject {
    static readonly cons = new TLInt(0x1cb5c415);

    static deserialized<U extends TLSerializable>(
        data: ByteStream, prototype: any): TLVector<U> | undefined {
        if (typeof prototype === "undefined") {
            throw new TypeError(
                "TLVector expects an explicit " +
                "prototype of the generic element type.");
        }

        const constructor = TLInt.deserialized(data);
        if (!constructor || !constructor.equals(TLVector.cons))
            return undefined;

        const count = TLInt.deserialized(data);
        if (!count) return undefined;

        let array: U[] = new Array(count.value);
        for (let i = 0; i < count.value; i++) {
            const item = prototype.deserialized(data);
            if (!item) return undefined;

            array[i] = item;
        }

        return new TLVector<U>(array);
    }

    serialized(): Uint8Array {
        const constructor = TLVector.cons.serialized();
        const count = new TLInt(this.array.length).serialized();
        const items: Uint8Array[] = [];

        this.array.forEach(item => {
            items.push(item.serialized());
        });

        return concat(constructor, count, ...items);
    }

    constructor(readonly array: T[]) {}
}