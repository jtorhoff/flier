
import {TLLong} from "../TL/Types/TLLong";
import * as Long from "Long";
import {MonotonicClock} from "../MonotonicClock/MonotonicClock";

export class Session {
    private readonly clock = new MonotonicClock();

    private requests: Array<Request> = [];
    private acknowledgments: Array<TLLong> = [];
    // private onResults: Map<TLLong, >

    /* private */static serverTime(): number {
        let now = (performance.timing.navigationStart + performance.now()) / 1000;
        return now;
    }

    /* private */ static messageIdForTimestamp(timestamp: number): TLLong {
        // Timestamp * 2^32 as per the MTProto spec
        let now = Long.fromNumber(timestamp, true).mul(Long.ONE.shl(32));
        return new TLLong(now);
    }
}