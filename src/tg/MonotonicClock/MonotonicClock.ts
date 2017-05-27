
import {BN} from "bn.js";

export class MonotonicClock {
    // private timeDifference: number = 0;
    private lastTimestamp = new BN(0);

    /**
     * @returns {number} Current unix timestamp in milliseconds.
     */
    get timestamp(): BN {
        let now: BN;
        do {
            now = new BN(performance.timing.navigationStart + performance.now());
        } while (now.lte(this.lastTimestamp));
        this.lastTimestamp = now;

        return now.clone();
    }

    // applyDifference(diff: number) {
    //     this.timeDifference = diff;
    //     this.lastTimestamp = 0;
    // }
}