
import {TLSerializable} from "./TLSerializable";
import {TLInt} from "../Types/TLInt";

export abstract class TLObject extends TLSerializable {
    static readonly cons: TLInt
}