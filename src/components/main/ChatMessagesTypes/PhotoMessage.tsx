/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from "react";
import { measureMedia } from "../../../misc/MediaMeasurer";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Photo } from "../../misc/Photo";

export const photoMessage = (message: API.MessageMediaPhoto) => {
    if (!(message.photo instanceof API.Photo)) {
        return <div/>;
    }

    const size = measureMedia(photoMessageMaxSize, photoMessageMaxSize, ...message.photo.sizes.items);
    return (
        <Photo width={size.width}
               height={size.height}
               photo={message.photo}/>
    );
};

export const photoMessageMaxSize = 250;