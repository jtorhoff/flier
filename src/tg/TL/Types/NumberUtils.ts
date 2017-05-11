
export const deserialized32bit = (bytes: Uint8Array): number => {
    return (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
};

export const serialized32bit = (num: number): Uint8Array => {
    const bytes = new Uint8Array(4);

    bytes[3] = (num >> 24)  & 0xff;
    bytes[2] = (num >> 16)  & 0xff;
    bytes[1] = (num >> 8)   & 0xff;
    bytes[0] =  num         & 0xff;

    return bytes;
};