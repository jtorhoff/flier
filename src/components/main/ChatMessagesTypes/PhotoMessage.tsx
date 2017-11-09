import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Photo } from "../../misc/Photo";
import { measureMedia } from "../../../misc/MediaMeasurer";

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