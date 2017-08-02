
export class AtomicClock {
    private lastTimestamp = 0;

    get timestamp(): number {
        let now: number;
        do {
            now = Date.now();
        } while (now === this.lastTimestamp);
        this.lastTimestamp = now;

        return now;
    }
}