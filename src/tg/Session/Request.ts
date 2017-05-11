
import {TLLong} from "../TL/Types/TLLong";
import {TLObject} from "../TL/Interfaces/TLObject";

export interface Request {
    reqMsgId: TLLong,
    content: TLObject,
    onResult: (_: TLObject) => void,
}