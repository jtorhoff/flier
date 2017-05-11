
export class SecureRandom {
    static bytes(count: number): Uint8Array {
        const bytes = new Uint8Array(count);
        crypto.getRandomValues(bytes);

        return bytes;
    }
}