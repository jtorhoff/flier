/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { expect } from "chai";
import { AES } from "../../src/tg/AES/AES";
import { aesVectors } from "./aesVectors";

describe("AES official known-answer tests", () => {
    it("should pass", () => {
        for (let i = 0; i < aesVectors.length; i++) {
            const tv = aesVectors[i];
            const key = new Uint32Array(tv.key);
            const plainExpect = new Uint32Array(tv.pt);
            const cipherExpect = new Uint32Array(tv.ct);

            const aes = new AES(key);
            const plain = plainExpect.slice();
            const cipher = cipherExpect.slice();

            aes.crypt(plain, 0);
            expect(plain).to.eql(cipherExpect);

            aes.crypt(cipher, 1);
            expect(cipher).to.eql(plainExpect);
        }
    });
});