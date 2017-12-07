/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

declare module "bn.js" {
    abstract class BigNum<Self> {
        clone(): Self;
        eq(num: BigNum<any>): boolean;
        eqn(num: number): boolean;
        lt(than: BN): boolean;
        lte(to: BN): boolean;
        gte(to: BN): boolean;
        gcd(num: BN): BN;
        byteLength(): number;
        toArrayLike(arrayType: Uint8ArrayConstructor, endian?: "le" | "be", length?: number): Uint8Array;
        toNumber(): number;
    }

    export class BN extends BigNum<BN> {
        static mont(num: BN): Mont;

        constructor(num?: number | string | BN, base?: number, endian?: "le" | "be");
        constructor(bytes: Uint8Array, endian?: "le" | "be");
        toRed(ctx: Red | Mont): RedBN;
        toString(radix?: number): string;
        div(by: BN): BN;
        idivn(by: number): BN;
        imuln(multiplier: number): BN;
        sub(subtrahend: BN): BN;
        ishln(bits: number): BN;
        iushln(bits: number): BN;
        iushrn(bits: number): BN;
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