import { ByteStream } from "../../DataStructures/ByteStream";
import { concat } from "../../Utils/BytesConcat";
import { TLObject } from "../Interfaces/TLObject";
import { TLSerializable } from "../Interfaces/TLSerializable";
import { deserializedObject } from "../TLObjectDeserializer";
import { TLInt } from "./TLInt";

export class TLVector<T extends TLSerializable> implements TLObject {
    static readonly cons = new TLInt(0x1cb5c415);

    static deserialized<U extends TLSerializable>(
        data: ByteStream, prototype?: any): TLVector<U> | undefined {
        const constructor = TLInt.deserialized(data);
        if (!constructor || !constructor.equals(this.cons))
            return undefined;

        const count = TLInt.deserialized(data);
        if (!count) return undefined;

        let array: U[] = new Array(count.value);
        for (let i = 0; i < count.value; i++) {
            let item: U;
            if (prototype) {
                item = prototype.deserialized(data);
            } else {
                item = deserializedObject(data) as U;
            }
            if (!item) return undefined;

            array[i] = item;
        }

        return new TLVector<U>(...array);
    }

    readonly items: T[];

    serialized(): Uint8Array {
        const constructor = TLVector.cons.serialized();
        const count = new TLInt(this.items.length).serialized();
        const items: Uint8Array[] = [];

        this.items.forEach(item => {
            items.push(item.serialized());
        });

        return concat(constructor, count, ...items);
    }

    constructor(...items: T[]) {
        this.items = items;
    }
}