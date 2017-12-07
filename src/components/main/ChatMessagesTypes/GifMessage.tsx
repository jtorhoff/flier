/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from "react";
import { measureMedia } from "../../../misc/MediaMeasurer";
import { API } from "../../../tg/Codegen/API/APISchema";
import { GIF } from "../../misc/GIF";

export const gifMessage = (document: API.Document) => {
    const size = measureMedia(gifMessageMaxSize, gifMessageMaxSize, document.thumb);

    return (
        <GIF width={size.width}
             height={size.height}
             document={document}/>
    );
};

export const gifMessageMaxSize = 250;