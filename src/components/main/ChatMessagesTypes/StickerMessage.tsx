import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Sticker } from "../../misc/Sticker";
import { measureMedia } from "../../../misc/MediaMeasurer";

export const stickerMessage = (sticker: API.Document) => {
    const size = measureMedia(170, 170, sticker.thumb);

    return (
        <Sticker width={size.width} height={size.height} sticker={sticker} thumb={false}/>
    );
};