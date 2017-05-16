
export class MonotonicClock {
    // private timeDifference: number = 0;
    private lastTimestamp: number = 0;

    /**
     * @returns {number} Current unix timestamp in milliseconds.
     */
    get timestamp(): number {
        let now: number;
        do {
            now = (performance.timing.navigationStart + performance.now()) * 1000;
                // - this.timeDifference;
        } while (now <= this.lastTimestamp);
        this.lastTimestamp = now;

        return now;
    }

    // applyDifference(diff: number) {
    //     this.timeDifference = diff;
    //     this.lastTimestamp = 0;
    // }
}