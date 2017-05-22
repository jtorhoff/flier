declare module "bn.js" {
    abstract class BigNum<Self> {
        clone(): Self;
        isNeg(): boolean;
        eq(num: BigNum<any>): boolean;
        eqn(num: number): boolean;
        lt(than: BN): boolean;
        lte(to: BN): boolean;
        lten(to: number): boolean;
        gte(to: BN): boolean;
        gcd(num: BN): BN;
        bitLength(): number;
        byteLength(): number;
        toArrayLike(arrayType: Uint8ArrayConstructor, endian?: "le" | "be", length?: number): Uint8Array;
    }

    export class BN extends BigNum<BN> {
        static mont(num: BN): Mont;
        static red(num: BN): Red;

        constructor(num?: number | string | BN, base?: number, endian?: "le" | "be");
        constructor(bytes: Uint8Array, endian?: "le" | "be");
        toRed(ctx: Red | Mont): RedBN;
        toString(radix?: number): string;
        div(by: BN): BN;
        divn(by: number): BN;
        pow(exp: BN): BN;
        iaddn(summand: number): BN;
        sub(subtrahend: BN): BN;
        subn(subtrahend: number): BN;
        isubn(subtrahend: number): BN;
        mul(multiplier: BN): BN;
        zeroBits(): number;
        ishrn(bits: number): BN;
        shln(bits: number): BN;
        ishln(bits: number): BN;
        testn(bit: number): boolean;
        mod(mod: BN): BN;
    }

    class RedBN extends BigNum<RedBN> {
        redISqr(): RedBN;
        redIAdd(num: RedBN): RedBN;
        redIMul(num: RedBN): RedBN;
        redSub(num: RedBN): RedBN;
        redPow(num: BN): RedBN;
        fromRed(): BN;
    }

    interface Red {}
    interface Mont {}
}