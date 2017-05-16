import {BN} from "bn.js";

BN.random = (mod: BN): BN => {
    return new BN();
};