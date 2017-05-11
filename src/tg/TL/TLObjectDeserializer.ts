
import {TLObject} from "./Interfaces/TLObject";
import {ByteStream} from "../DataStructures/ByteStream";
import {TLInt} from "./Types/TLInt";
import {TLInt128} from "./Types/TLInt128";
import {concat} from "./BytesConcat";
import {HashMap} from "../DataStructures/HashMap/HashMap";


export class ReqPq implements TLObject {
    static readonly cons = new TLInt(0x60469778);

    static deserialized(data: ByteStream): ReqPq | undefined {
        throw new Error();
    }

    serialized(): Uint8Array {
        const constructor = ReqPq.cons.serialized();
        const nonce = this.nonce.serialized();

        return concat(constructor, nonce);
    }

    constructor(public readonly nonce: TLInt128) {}
}

const constructables = ((): HashMap<TLInt, Function>  => {
    const map = new HashMap<TLInt, Function>();
    map.put(ReqPq.cons, ReqPq.deserialized);

    return map;
})();


export const deserializedObject = (data: ByteStream): TLObject | undefined => {
    const constructor = TLInt.deserialized(data);
    if (!constructor) return undefined;

    // Rewind 4 bytes because the deserialized method will
    // deserialize the constructor also and compare it.
    data.moveCursorBy(-4);

    const deserialized = constructables.get(constructor);
    if (!deserialized) return undefined;

    return deserialized(data);
};