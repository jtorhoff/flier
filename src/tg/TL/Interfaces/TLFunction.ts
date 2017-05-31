import { TLObject } from "./TLObject";

export abstract class TLFunction<ResultType extends TLObject> extends TLObject {
    static readonly resultTypeDeserialize?: Function;
}