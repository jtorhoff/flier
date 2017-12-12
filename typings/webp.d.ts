/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

declare module "webp" {
    type CType = "number" | "string" | "array" | null;

    interface ModuleWebP {
        new(): this;
        cwrap: (funcName: string, returnType: CType, argTypes: Array<CType>) => Function;
        canvas: HTMLCanvasElement | null;
        doNotCaptureKeyboard: boolean;
    }

    const ModuleWebP: ModuleWebP;
    export = ModuleWebP;
}