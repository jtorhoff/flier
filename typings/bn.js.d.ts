declare module "bn.js" {
    abstract class BigNum<Self> {
        clone(): Self;
        eq(num: Self): boolean;
        eqn(num: number): boolean;
        gcd(num: BN): BN;
        bitLength(): number;
        byteLength(): number;
        toArrayLike(arrayType: Uint8ArrayConstructor, endian?: "le" | "be", length?: number): Uint8Array;
    }

    export class BN extends BigNum<BN> {
        static mont(num: BN): Mont;
        static random(mod: BN): BN;

        constructor(num?: number | string | BN, base?: number, endian?: "le" | "be");
        constructor(bytes: Uint8Array, endian?: "le" | "be");
        toRed(ctx: Red | Mont): RedBN;
        toString(radix?: number): string;
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