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