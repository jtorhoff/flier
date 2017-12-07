/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { CSSProperties } from "react";

export const measureText = (text: string, style: CSSProperties): Size => {
    const element = createDummyElement(text, style);
    const size = {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
    element.parentNode!.removeChild(element);

    return size;
};

interface Size {
    width: number,
    height: number,
}

const createDummyElement = (text: string, style: CSSProperties): HTMLElement => {
    const element = document.createElement("div");
    const textNode = document.createTextNode(text);

    element.appendChild(textNode);

    for (let attr in style) {
        if (style.hasOwnProperty(attr)) {
            element.style[attr as any] = style[attr];
        }
    }

    element.style.position = "absolute";
    element.style.visibility = "hidden";
    element.style.left = "-999px";
    element.style.top = "-999px";
    element.style.width = style.width || "auto";
    element.style.height = style.height || "auto";

    document.body.appendChild(element);

    return element;
};