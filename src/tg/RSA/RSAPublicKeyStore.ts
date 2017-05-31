import { HashMap } from "../DataStructures/HashMap/HashMap";
import { TLLong } from "../TL/Types/TLLong";
import { RSAPublicKey } from "./RSAPublicKey";

export class RSAPublicKeyStore {
    private readonly keys = new HashMap<TLLong, RSAPublicKey>();

    addKey(key: RSAPublicKey) {
        this.keys.put(new TLLong(key.fingerprint), key);
    }

    key(fingerprint: TLLong) {
        return this.keys.get(fingerprint);
    }
}