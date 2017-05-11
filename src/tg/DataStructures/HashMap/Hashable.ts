
export interface Hashable {
    hashValue: number;
    equals(to: Hashable): boolean;
}