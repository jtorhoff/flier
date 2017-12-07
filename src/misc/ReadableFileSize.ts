/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export const readableFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return bytes + " B";
    }

    const postfixes = ["KB", "MB", "GB", "TB", "PB"];
    const exp = (Math.log(bytes) / Math.log(1024)) | 0;
    const size = (bytes / (1024 ** exp)).toFixed(exp - 1);

    return `${size} ${postfixes[exp - 1]}`;
};