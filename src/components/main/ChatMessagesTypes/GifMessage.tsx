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