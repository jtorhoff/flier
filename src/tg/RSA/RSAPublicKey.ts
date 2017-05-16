import {BN} from "bn.js";
import * as Long from "long";
import {sha1, sha1Size} from "../SHA/SHA";
import {concat} from "../TL/BytesConcat";
import {SecureRandom} from "../SecureRandom/SecureRandom";
import {TLBytes} from "../TL/Types/TLBytes";

export class RSAPublicKey {
    /**
     * Creates an instance from a PKCS#1 PEM-encoded public key.
     * @param key
     * @returns {RSAPublicKey}
     */
    static fromString(key: string): RSAPublicKey {
        const str = key
            .replace("-----BEGIN RSA PUBLIC KEY-----", "")
            .replace("-----END RSA PUBLIC KEY-----", "")
            .replace("\n", "");
        // Decode base 64
        const data = atob(str);
        const bytes = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
            bytes[i] = data.charCodeAt(i);
        }

        const modulus = bytes.slice(9, -5);
        const exponent = bytes.slice(-3);

        const modulusBytes = new TLBytes(modulus).serialized();
        const exponentBytes = new TLBytes(exponent).serialized();

        const fingerprintBytes = sha1(concat(modulusBytes, exponentBytes))
            .slice(12);

        const fingerprintTwos = new Uint32Array(fingerprintBytes.buffer);
        const fingerprint = Long.fromBits(
            fingerprintTwos[0], fingerprintTwos[1]);

        const modulusBN = new BN(modulus);
        const exponentBN = new BN(exponent);

        return new RSAPublicKey(modulusBN, exponentBN, fingerprint);
    }

    /**
     * Mask Generation Function.
     * @param seed Seed from which mask is generated.
     * @param length Intended mask length.
     * @returns {Uint8Array}
     */
    private static mgf(seed: Uint8Array, length: number): Uint8Array {
        const hashLength = sha1Size;
        const mask = new Uint8Array(length);
        const counter = new Uint8Array(4);
        const chunks = Math.ceil(length / hashLength);

        for (let i = 0; i < chunks; i++) {
            counter[0] = (i >>> 24);
            counter[1] = (i >>> 16) & 0xFF;
            counter[2] = (i >>> 8) & 0xFF;
            counter[3] = i & 0xFF;

            const subMask = mask.subarray(i * hashLength);
            let chunk = sha1(concat(seed, counter));

            if (chunk.length > subMask.length) {
                chunk = chunk.subarray(0, subMask.length);
            }

            subMask.set(chunk);
        }

        return mask;
    }

    encrypt(message: Uint8Array): Uint8Array {
        const redCtx = BN.mont(this.modulus);
        const m = new BN(this.pad(message)).toRed(redCtx);
        const c = m.redPow(this.exponent).fromRed();

        return c.toArrayLike(Uint8Array);
    }

    /**
     * Pad the message using the optimal asymmetric encryption padding
     * with SHA-1.
     * @param message
     * @returns {Uint8Array} Encoded message.
     */
    private pad(message: Uint8Array): Uint8Array {
        const keyLength = this.modulus.byteLength();
        const hashLength = sha1Size;
        const messageLength = message.length;
        const psLength = keyLength - messageLength - (2 * hashLength) - 2;

        if (messageLength > keyLength - (2 * hashLength) - 2) {
            throw new RangeError("Message too long");
        }

        const labelHash = sha1(new Uint8Array([]));
        const ps = new Uint8Array(psLength);
        const dataBlock = concat(
            labelHash, ps, new Uint8Array([0x01]), message);
        const seed = SecureRandom.bytes(hashLength);

        const dataBlockMask = RSAPublicKey.mgf(seed, dataBlock.length);
        for (let i = 0; i < dataBlock.length; i++) {
            dataBlock[i] ^= dataBlockMask[i];
        }

        const seedMask = RSAPublicKey.mgf(dataBlock, hashLength);
        for (let i = 0; i < seed.length; i++) {
            seed[i] ^= seedMask[i];
        }

        return concat(new Uint8Array([0x00]), seed, dataBlock);
    }

    private constructor(
        readonly modulus: BN,
        readonly exponent: BN,
        readonly fingerprint: Long) {
    }
}