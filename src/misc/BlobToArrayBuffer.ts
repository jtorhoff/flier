/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Observable } from "rxjs/Observable";

export const blobToArrayBuffer = (blob: Blob): Observable<ArrayBuffer> => {
    return new Observable<ArrayBuffer>(observer => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            observer.next(this.result);
        };
        fileReader.readAsArrayBuffer(blob);
    });
};