import {TLObject} from "./Interfaces/TLObject";
import {ByteStream} from "../DataStructures/ByteStream";
import {TLInt} from "./Types/TLInt";
import {MTProto} from "../Codegen/MTProto/MTProtoSchema";
import {API} from "../Codegen/API/APISchema";

export const deserializedObject = (data: ByteStream): TLObject | undefined => {
    const constructor = TLInt.deserialized(data);
    if (!constructor) return undefined;

    // Rewind 4 bytes because the deserialized method will
    // deserialize the constructor also and compare it.
    data.moveCursorBy(-4);

    // console.log(data);
    // console.log((constructor.value >>> 0).toString(16));


    // console.log(data.cursor);
    // console.log(Array.from(data.bytes).map(byte => {
    //     return byte.toString(16);
    // }).join(" "));

    const prototype = MTProto.constructables.get(constructor) ||
        API.constructables.get(constructor);
    if (!prototype) return undefined;

    return prototype.deserialized(data);
};