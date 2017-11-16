/**
 *
 * @param {number} hashes
 * @returns {number}
 */
export const combineHash = (...hashes: number[]) => {
    let seed = hashes[0] || 0;
    for (let i = 1; i < hashes.length; i++) {
        seed ^= hashes[i] + 0x9e3779b9 + (seed << 6) + (seed >> 2);
    }

    return seed;
};