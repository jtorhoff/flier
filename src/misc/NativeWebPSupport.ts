/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { BehaviorSubject } from "rxjs/BehaviorSubject";

const nativeSupport = new BehaviorSubject(false);
const testImage = new Image();
testImage.onload = () => {
    nativeSupport.next(testImage.width === 2 && testImage.height === 1);
};
testImage.onerror = () => {
    nativeSupport.next(false);
};
testImage.src = "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==";


export const nativeWebPSupport = nativeSupport.asObservable();