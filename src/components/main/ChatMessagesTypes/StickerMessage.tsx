import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Sticker } from "../../misc/Sticker";

export const stickerMessage = (sticker: API.Document) => {
    return (
        <Sticker width={170} height={170} sticker={sticker} thumb={false}/>
    );
};