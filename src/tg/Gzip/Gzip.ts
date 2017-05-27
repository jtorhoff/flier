
import * as pako from "pako";

export namespace Gzip {
    export const compress = (data: Uint8Array): Uint8Array | undefined => {
        const deflate = new pako.Deflate({
            level: 9,
            windowBits: 15 + 16,
            memLevel: 9,
        });
        deflate.push(data, true);
        if (deflate.err) {
            return undefined;
        }

        return deflate.result as Uint8Array;
    };

    export const decompress = (data: Uint8Array): Uint8Array | undefined => {
        const inflate = new pako.Inflate({
            windowBits: 15 + 16,
        });
        inflate.push(data, true);
        if (inflate.err) {
            return undefined;
        }

        return inflate.result as Uint8Array;
    };
}