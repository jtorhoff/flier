import { SecureRandom } from "../SecureRandom/SecureRandom";
import { AES } from "./AES";

/**
 * IGE cipher mode
 */
export class IGE extends AES {
    private static readonly blockSize = 16;

    /**
     * Schedule key for encryption/decryption, must be in little-endian order.
     * @param key
     */
    constructor(key: ArrayBuffer) {
        super(bytesToWords(key));
    }

    /**
     * @param plain Data to encrypt in little-endian order.
     * @param ivec Initialization vector in little-endian order.
     * @returns {ArrayBuffer} Encrypted data in little-endian order.
     */
    encrypt(plain: ArrayBuffer, ivec: ArrayBuffer): ArrayBuffer {
        if (ivec.byteLength !== IGE.blockSize * 2) {
            throw new RangeError("IV must be twice the block size");
        }

        const length = Math.ceil(plain.byteLength / IGE.blockSize) * IGE.blockSize;
        if (plain.byteLength !== length) {
            const padded = new Uint8Array(length);
            padded.set(new Uint8Array(plain));
            padded.set(SecureRandom.bytes(length - plain.byteLength), plain.byteLength);

            return this.process(padded.buffer, ivec, 0);
        }

        return this.process(plain, ivec, 0);
    }

    /**
     * @param cipher Data to decrypt in little-endian order.
     * @param ivec Initialization vector in little-endian order.
     * @returns {ArrayBuffer} Plain text data in little-endian order.
     */
    decrypt(cipher: ArrayBuffer, ivec: ArrayBuffer): ArrayBuffer {
        if (ivec.byteLength !== IGE.blockSize * 2) {
            throw new RangeError("IV must be twice the block size");
        }

        if (cipher.byteLength % IGE.blockSize !== 0) {
            throw new RangeError(
                "Cipher text's length must be a multiple of " + IGE.blockSize);
        }

        return this.process(cipher, ivec, 1);
    }

    private process(data: ArrayBuffer, ivec: ArrayBuffer, direction: 0 | 1): ArrayBuffer {
        const input = bytesToWords(data);
        const output = new Uint32Array(input.length);

        const ivecWords = bytesToWords(ivec);
        const iv1 = ivecWords.slice(direction ? 4 : 0, direction ? 8 : 4);
        const iv2 = ivecWords.slice(direction ? 0 : 4, direction ? 4 : 8);

        const inBlock = new Uint32Array(4);
        const outBlock = new Uint32Array(4);

        const nBlocks = data.byteLength / IGE.blockSize;
        for (let i = 0, offset = 0; i < nBlocks; i++, offset = i * 4) {
            inBlock.set(input.subarray(offset, offset + 4));
            for (let j = 0; j < 4; j++) {
                outBlock[j] = inBlock[j] ^ iv1[j];
            }
            super.crypt(outBlock, direction);
            for (let j = 0; j < 4; j++) {
                outBlock[j] ^= iv2[j];
            }
            output.set(outBlock, offset);
            iv1.set(outBlock);
            iv2.set(inBlock);
        }

        return bytesToWords(output.buffer).buffer;
    }
}

/**
 * Convert an array buffer to an array of four big-endian words.
 * @param buf
 * @returns {Uint32Array}
 */
const bytesToWords = (buf: ArrayBuffer): Uint32Array => {
    const result = new Uint32Array(buf.byteLength >>> 2);
    const bufView = new DataView(buf);
    for (let i = 0; i < result.byteLength; i += 4) {
        result[i >>> 2] = bufView.getUint32(i);
    }
    return result;
};