
export interface Hashable {
    hashValue: number;
    equals(to: this): boolean;
}