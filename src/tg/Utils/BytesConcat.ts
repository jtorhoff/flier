
export const concat = (...bytes: Uint8Array[]): Uint8Array => {
    const count = bytes
        .map(arr => arr.length)
        .reduce((acc, val) => acc + val, 0);

    const result = new Uint8Array(count);

    let offset = 0;
    bytes.forEach(arr => {
        result.set(arr, offset);
        offset += arr.length;
    });

    return result;
};