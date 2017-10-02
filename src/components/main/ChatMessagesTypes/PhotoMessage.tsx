import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Photo } from "../../misc/Photo";

export const photoMessage = (message: API.MessageMediaPhoto) => {
    if (!(message.photo instanceof API.Photo)) {
        throw new Error();
    }

    const size = Photo.measure(message.photo, photoMessageMaxSize, photoMessageMaxSize);
    return (
        <Photo width={size.width}
               height={size.height}
               photo={message.photo}/>
    );
};

export const photoMessageMaxSize = 250;