import {BN} from "bn.js";

const MAX_SAFE_INTEGER = 2 ** 53 - 1;

const rand = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Factorize n using the Pollard-Rho algorithm improved by Brent [1].
 *
 * [1]  Brent, Richard P. "An improved Monte Carlo factorization algorithm."
 *      BIT Numerical Mathematics 20.2 (1980): 176-184.
 * @param n A composite to factorize.
 * @returns A prime factor of n or undefined if no factor was found.
 */
export const factorize = (n: BN): BN | undefined => {
    const redCtx = BN.mont(n);
    const c = new BN(rand(1, MAX_SAFE_INTEGER)).toRed(redCtx);
    const m = rand(2, MAX_SAFE_INTEGER);

    let y = new BN(rand(1, MAX_SAFE_INTEGER)).toRed(redCtx);
    let ys;
    let x;
    let r = 1;
    let q = new BN(1).toRed(redCtx);
    let g = new BN(1);

    do {
        x = y.clone();
        for (let i = 1; i <= r; i++) {
            y.redISqr().redIAdd(c);
        }

        let k = 0;
        do {
            ys = y.clone();
            for (let i = 1; i < Math.min(m, r - k); i++) {
                y.redISqr().redIAdd(c);
                q = x.redSub(y).redIMul(q);
            }
            g = q.gcd(n);
            k += m;
        } while (k < r && g.eqn(1));
        r <<= 1;
    } while (g.eqn(1));

    if (g.eq(n)) {
        do {
            ys.redISqr().redIAdd(c);
            g = x.redSub(ys).gcd(n);
        } while (g.eqn(1));
    }

    if (g.eq(n)) {
        return undefined;
    }

    return g;
};