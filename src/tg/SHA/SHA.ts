import * as fastSHA256 from "fast-sha256";
import * as Rusha from "Rusha";

const rusha = new Rusha();

export const sha1 = (bytes: Uint8Array): Uint8Array => {
    const buffer = rusha.rawDigest(bytes).buffer;
    return new Uint8Array(buffer);
};

export const sha256 = (bytes: Uint8Array): Uint8Array => {
    return fastSHA256.hash(bytes);
};