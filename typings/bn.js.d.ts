declare module "bn.js" {
    abstract class BigNum<Self> {
        clone(): Self;
        eq(num: Self): boolean;
        eqn(num: number): boolean;
        gcd(num: BN): BN;
        bitLength(): number;
    }

    export class BN extends BigNum<BN> {
        static mont(num: BN): Mont;

        constructor(num?: number | string | BN, base?: number, endian?: "le" | "be");
        toRed(ctx: Red | Mont): RedBN;
        toString(radix?: number): string;
    }

    class RedBN extends BigNum<RedBN> {
        redISqr(): RedBN;
        redIAdd(num: RedBN): RedBN;
        redIMul(num: RedBN): RedBN;
        redSub(num: RedBN): RedBN;
    }

    interface Red {}
    interface Mont {}
}