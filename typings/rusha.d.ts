
declare module "Rusha" {
    interface Rusha {
        new(): this;
        rawDigest(buffer: Uint8Array): Uint32Array;
    }

    const Rusha: Rusha;
    export = Rusha;
}