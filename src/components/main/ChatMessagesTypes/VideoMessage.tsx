/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from "react";
import { measureMedia } from "../../../misc/MediaMeasurer";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Video } from "../../misc/Video";

export const videoMessage = (document: API.Document) => {
    const size = measureMedia(videoMessageMaxSize, videoMessageMaxSize, document.thumb);

    return (
        <Video width={size.width}
               height={size.height}
               document={document}/>
    );
};

export const videoMessageMaxSize = 250;