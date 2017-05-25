import {BN} from "bn.js";
import * as Long from "long";
import {sha1} from "../SHA/SHA";
import {concat} from "../Utils/BytesConcat";
import {TLBytes} from "../TL/Types/TLBytes";
import {SecureRandom} from "../SecureRandom/SecureRandom";

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
        const exponent = bytes.slice(-3,);

        const modulusBytes = new TLBytes(modulus).serialized();
        const exponentBytes = new TLBytes(exponent).serialized();

        const fingerprintBytes = sha1(concat(modulusBytes, exponentBytes))
            .slice(12,);

        const fingerprintTwos = new Uint32Array(fingerprintBytes.buffer);
        const fingerprint = Long.fromBits(
            fingerprintTwos[0], fingerprintTwos[1]);

        const modulusBN = new BN(modulus);
        const exponentBN = new BN(exponent);

        return new RSAPublicKey(modulusBN, exponentBN, fingerprint);
    }

    encrypt(message: Uint8Array): Uint8Array {
        const paddingLength = this.modulus.byteLength() - message.length - 1;
        if (paddingLength < 0) throw new RangeError(
            "Message too long to encrypt with the given key");

        const padding = SecureRandom.bytes(paddingLength);

        const redCtx = BN.mont(this.modulus);
        const m = new BN(concat(message, padding)).toRed(redCtx);
        const c = m.redPow(this.exponent).fromRed();

        return c.toArrayLike(Uint8Array);
    }

    private constructor(
        readonly modulus: BN,
        readonly exponent: BN,
        readonly fingerprint: Long) {
    }
}