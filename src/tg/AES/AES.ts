
const UI32A256 = () => new Uint32Array(256);

/**
 * Low-level implementation of AES, optimized for size.
 * Based on BSD-licensed code from Stanford Javascript Crypto Library, by
 * Emily Stark, Mike Hamburg, Dan Boneh, Stanford University 2008-2010.
 *
 * Which in turn is based on OpenSSL's aes_core.c, a public-domain
 * implementation by Vincent Rijmen, Antoon Bosselaers and Paulo Barreto.
 */
export class AES {
    /**
     * The expanded S-box and inverse S-box tables.
     * tables[0] is for encryption and
     * tables[1] is for decryption.
     *
     * The first 4 sub-tables are the expanded S-box with MixColumns.
     * The last (tables[][4]) is the S-box itself.
     */
    private static tables: Array<Array<Uint32Array>> = [
        [UI32A256(), UI32A256(), UI32A256(), UI32A256(), UI32A256()],
        [UI32A256(), UI32A256(), UI32A256(), UI32A256(), UI32A256()],
    ];

    /**
     * Expand the S-box tables.
     */
    static preCompute() {
        const encTable = this.tables[0];
        const decTable = this.tables[1];
        const sBox = encTable[4];
        const sBoxInv = decTable[4];
        const d = new Uint32Array(256);
        const th = new Uint32Array(256);

        // Compute double and third tables.
        for (let i = 0; i < 256; i++) {
            th[( d[i] = (i << 1) ^ (i >>> 7) * 283 ) ^ i] = i;
        }

        let x2 = 0;
        let x4 = 0;
        for (let x = 0, xInv = 0; !sBox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
            // Compute S-box
            let s = xInv ^ (xInv << 1) ^ (xInv << 2) ^ (xInv << 3) ^ (xInv << 4);
            s = (s >>> 8) ^ (s & 255) ^ 99;
            sBox[x] = s;
            sBoxInv[s] = x;

            // Compute MixColumns
            let x8 = d[x4 = d[x2 = d[x]]];
            let tDec = (x8 * 0x1010101) ^
                       (x4 * 0x10001) ^
                       (x2 * 0x101) ^
                       (x * 0x1010100);
            let tEnc = (d[s] * 0x101) ^ (s * 0x1010100);

            for (let i = 0; i < 4; i++) {
                encTable[i][x] = tEnc = ((tEnc << 24) ^ (tEnc >>> 8));
                decTable[i][s] = tDec = ((tDec << 24) ^ (tDec >>> 8));
            }
        }
    }

    private readonly key: Array<Uint32Array>;

    /**
     * Schedule an AES key for encryption and decryption.
     * @param inKey The key as an array of big-endian words.
     */
    constructor(inKey: Uint32Array) {
        if (!AES.tables[0][0][0]) {
            AES.preCompute();
        }
        const keyLen = inKey.length;
        if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
            throw new RangeError("Invalid key length");
        }

        const encKey = new Uint32Array(4 * keyLen + 28);
        const decKey = new Uint32Array(4 * keyLen + 28);
        const sBox = AES.tables[0][4];
        const decTable = AES.tables[1];

        this.key = [encKey, decKey];
        encKey.set(inKey);

        // Schedule encryption keys
        for (let i = keyLen, rcon = 1; i < 4 * keyLen + 28; i++) {
            let tmp = encKey[i - 1];

            // Apply S-box
            if (i % keyLen === 0 || (keyLen === 8 && i % keyLen === 4)) {
                tmp = (sBox[tmp >>> 24      ] << 24)
                    ^ (sBox[tmp >>> 16 & 255] << 16)
                    ^ (sBox[tmp >>>  8 & 255] <<  8)
                    ^ (sBox[tmp & 255]);
                // Shift rows and add rcon
                if (i % keyLen === 0) {
                    tmp = (tmp << 8) ^ (tmp >>> 24) ^ (rcon << 24);
                    rcon = (rcon << 1) ^ (rcon >>> 7) * 283;
                }
            }
            encKey[i] = encKey[i - keyLen] ^ tmp;
        }
        // Schedule decryption keys
        for (let j = 0, i = 4 * keyLen + 28; i > 0; j++, i--) {
            //noinspection JSBitwiseOperatorUsage
            const tmp = encKey[j & 3 ? i : i - 4];
            if (i <= 4 || j < 4) {
                decKey[j] = tmp;
            } else {
                decKey[j] = decTable[0][sBox[tmp >>> 24      ]]
                          ^ decTable[1][sBox[tmp >>> 16 & 255]]
                          ^ decTable[2][sBox[tmp >>>  8 & 255]]
                          ^ decTable[3][sBox[tmp        & 255]];
            }
        }
    }

    /**
     * Encryption and decryption core function.
     * @param inout Four words in big-endian order to encrypt or decrypt.
     * @param direction 0 for encryption, 1 for decryption.
     */
    crypt(inout: Uint32Array, direction: 0 | 1) {
        if (inout.length !== 4) {
            throw new RangeError("Invalid AES block size");
        }

        const key = this.key[direction];
        let a = key[0] ^ inout[0];
        let b = key[1] ^ inout[direction ? 3 : 1];
        let c = key[2] ^ inout[2];
        let d = key[3] ^ inout[direction ? 1 : 3];
        let a2 = 0, b2 = 0, c2 = 0;

        const table = AES.tables[direction];
        const t0 = table[0];
        const t1 = table[1];
        const t2 = table[2];
        const t3 = table[3];
        const sBox = table[4];

        let kIndex = 4;
        const nInnerRounds = key.length / 4 - 2;
        for (let i = 0; i < nInnerRounds; i++, kIndex += 4) {
            a2 = t0[a >>> 24] ^ t1[b >>> 16 & 255] ^ t2[c >>> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
            b2 = t0[b >>> 24] ^ t1[c >>> 16 & 255] ^ t2[d >>> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
            c2 = t0[c >>> 24] ^ t1[d >>> 16 & 255] ^ t2[a >>> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
            d  = t0[d >>> 24] ^ t1[a >>> 16 & 255] ^ t2[b >>> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];

            a = a2;
            b = b2;
            c = c2;
        }

        // Last round.
        for (let i = 0; i < 4; i++) {
            inout[direction ? (3 & -i) : i] = sBox[a >>> 24      ] << 24
                                            ^ sBox[b >>> 16 & 255] << 16
                                            ^ sBox[c >>> 8  & 255] <<  8
                                            ^ sBox[d        & 255]
                                            ^ key[kIndex++];
            a2 = a;
            a = b;
            b = c;
            c = d;
            d = a2;
        }
    }
}