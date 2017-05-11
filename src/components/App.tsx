import * as React from "react";
import * as Long from "Long";
import {TLLong} from "../tg/TL/Types/TLLong";
import {HashMap} from "../tg/DataStructures/HashMap/HashMap";

export interface AppProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class App extends React.Component<AppProps, undefined> {
    render() {
        const max = 1 << 32 - 1;
        const map = new HashMap<TLLong, any>();

        console.time("fam");

        for (let i = 0; i < 1000; i++) {
            let rand = Math.floor(Math.random() * max);
            // console.log(rand);
            map.put(new TLLong(Long.fromNumber(rand)), "");
        }
        // map.entries();
        // console.log(map.entries());

        console.timeEnd("fam");

        let test: number[] = (() => {
            console.log("once?")
            return [1,2,3,4];
        })();

        console.log(test);
        console.log(test);
        console.log(test);

        // let a = new HashMap<TLLong, any>();
        // let k1 = new TLLong(Long.ONE);
        // let k2 = new TLLong(k1.value.add(1));
        // a.put(k1, "123");
        // a.put(k2, "456");
        //
        // console.log(a.entries());

        // function sleep(delay: number) {
        //     var start = new Date().getTime();
        //     while (new Date().getTime() < start + delay);
        // }
        //
        // let clock = new MonotonicClock();
        //
        // for (let i = 0; i < 100; i++) {
        //     console.log(Session.messageIdForTimestamp(clock.timestamp).value.toString());
        // }
        // let map = new HashMap<TLLong, any>();
        // let l = new TLLong(Long.ONE);
        // console.log(l.);
        // let a = Session.messageIdForTimestamp(clock.timestamp).toString();

        // let a = new TLLong(Long.fromString("316418845189560860672"));
        // let b = new TLLong(Long.fromString("316418845189560860683"));
        // let l = new TLLong(Long.fromString("2948197747976540383"));
        // let a = new TLLong(Long.fromString("3193163895032611127"));
        // let b = new TLLong(Long.fromString("2640737459416166807"));
        // console.log(l.hashValue);
        // console.log(a.hashValue);
        // console.log(b.hashValue);

        // let map = new Map<TLLong, string>();
        // map.set(new TLLong(Long.ONE), "123");
        // map.set(new TLLong(Long.ZERO), "000");
        // map.set(new TLLong(new Long(0)), "???");
        //
        // // "123"
        //
        // console.log(map);

        // let nonce = new TLInt128(SecureRandom.bytes(16));
        // let reqPq = new ReqPq(nonce);
        // let msgId = Session.messageIdForTimestamp(Session.serverTime());
        // let message = new TLMessage(msgId, reqPq);

        // console.log(msgId.value.toString());
        //
        // let myInit = {
        //     method: 'POST',
        //     body: message.serialized(),
        // };
        // fetch("http://149.154.167.51:80/apiw1/", myInit).then(response => {
        //     response.arrayBuffer().then(bytes => {
        //         let array = new Uint8Array(bytes);
        //         let str = "";
        //         array.forEach((byte) => {
        //             str += " " + ('0' + (byte & 0xFF).toString(16)).slice(-2);
        //         });
        //
        //         console.log(str);
        //         // array.map((byte) => {
        //         //     return "";
        //         // });
        //         // // Number[](bytes)
        //         // Array<number>(bytes).map((byte) => {
        //         //     return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        //         // }).join('')
        //         // console.log(new Uint8Array(bytes).map())
        //     });
        // });

        // let pqs = [
        //     "2948197747976540383",
        //     "3193163895032611127",
        //     "2842798780870444189",
        //     "2640737459416166807",
        //     "1857405729000408259",
        //     "2337166368660109997",
        //     "2160313097842018783",
        // ];
        // //
        // for (let pq of pqs) {
        //     console.time('factorize');
        //
        //     let n = new BN(pq);
        //     let p = factorize(n);
        //
        //     if (p) {
        //         console.log(p.toString());
        //     }
        //
        //     console.timeEnd('factorize');
        // }

        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}