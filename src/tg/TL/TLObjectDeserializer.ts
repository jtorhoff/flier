import { API } from "../Codegen/API/APISchema";
import { MTProto } from "../Codegen/MTProto/MTProtoSchema";
import { ByteStream } from "../DataStructures/ByteStream";
import { TLObject } from "./Interfaces/TLObject";
import { TLInt } from "./Types/TLInt";

export const deserializedObject = (data: ByteStream): TLObject | undefined => {
    const constructor = TLInt.deserialized(data);
    if (!constructor) return undefined;

    // Rewind 4 bytes because the deserialized method will
    // deserialize the constructor also and compare it.
    data.moveCursorBy(-4);

    const prototype = MTProto.constructables.get(constructor) ||
        API.constructables.get(constructor);
    if (!prototype) return undefined;

    return prototype.deserialized(data);
};