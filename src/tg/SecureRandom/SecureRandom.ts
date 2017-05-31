
export namespace SecureRandom {
    export const bytes = (count: number): Uint8Array => {
        const bytes = new Uint8Array(count);

        if (!crypto || !crypto.getRandomValues) {
            throw new Error("Your browser doesn't support Web Crypto API");
        }
        crypto.getRandomValues(bytes);

        return bytes;
    };
}