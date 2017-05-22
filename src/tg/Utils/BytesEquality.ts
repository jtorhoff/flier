
const constEql = (a: Uint8Array, b: Uint8Array): boolean => {
    if (a.length !== b.length) {
        throw new RangeError("The values to compare must have equal length");
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a[i] ^ b[i];
    }

    return result === 0;
};