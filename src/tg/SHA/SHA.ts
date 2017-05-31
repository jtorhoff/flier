import * as fastSHA256 from "fast-sha256";
import * as Rusha from "Rusha";

/**
 * Hash digest size in bytes.
 * @type {number}
 */
export const sha1Size = 20;

export const sha1 = (bytes: Uint8Array): Uint8Array => {
    const rusha = new Rusha();
    const buffer = rusha.rawDigest(bytes).buffer;
    return new Uint8Array(buffer);
};

export const sha256 = (bytes: Uint8Array): Uint8Array => {
    return fastSHA256.hash(bytes);
};