import { TLInt } from "../Types/TLInt";
import { TLSerializable } from "./TLSerializable";

export abstract class TLObject extends TLSerializable {
    static readonly cons: TLInt
}