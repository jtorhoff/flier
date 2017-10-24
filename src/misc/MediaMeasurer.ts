import { API } from "../tg/Codegen/API/APISchema";

export const measureMedia = (maxWidth: number,
                             maxHeight: number,
                             ...sizes: API.PhotoSizeType[]): Size => {
    const thumb = sizes.find(size => !(size instanceof API.PhotoSizeEmpty)) as
        API.PhotoSize | API.PhotoCachedSize;
    if (typeof thumb === "undefined") {
        return {
            width: maxWidth,
            height: maxHeight,
        };
    }

    const scale = Math.min(maxWidth / thumb.w.value, maxHeight / thumb.h.value);
    return {
        width: Math.floor(thumb.w.value * scale),
        height: Math.floor(thumb.h.value * scale),
    };
};

interface Size {
    width: number,
    height: number,
}