/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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