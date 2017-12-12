/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as ModuleWebP from "webp";

let webp: ModuleWebP;
let webpToCanvas: Function;

export const renderWebpToCanvas = (data: Uint8Array,
                                   stickerWidth: number,
                                   stickerHeight: number,
                                   canvas: HTMLCanvasElement) => {
    if (!webp && !webpToCanvas) {
        webp = new ModuleWebP();
        webp.doNotCaptureKeyboard = true;
        webpToCanvas = webp.cwrap("WebpToSDL", "number", ["array", "number", "number", "number"]);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    webp.canvas = canvas;
    webpToCanvas(
        data,
        data.byteLength,
        Math.min(stickerWidth, canvas.width * devicePixelRatio),
        Math.min(stickerHeight, canvas.height * devicePixelRatio));
    webp.canvas = null;
};