
export const decodePCM = (pcm: Uint8Array): Array<number> => {
    const valuesCount = (pcm.length * 8 / 5) | 0;

    const result = new Array(valuesCount);
    for (let i = 0; i < valuesCount; i++) {
        const byteIndex = ((i * 5) / 8) | 0;
        const bitShift = ((i * 5) % 8) | 0;
        result[i] = (pcm[byteIndex] >> bitShift) & 0x1f;
    }

    return result;
};