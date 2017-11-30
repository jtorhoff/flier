
export const buffersEqual = (lhs?: ArrayBuffer, rhs?: ArrayBuffer) => {
    if (typeof lhs === "undefined" || typeof rhs === "undefined") {
        return false;
    }
    if (lhs.byteLength !== rhs.byteLength) {
        return false;
    }

    const a = new Uint32Array(lhs);
    const b = new Uint32Array(rhs);

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
};