import * as ModuleWebP from "webp";

let webp: ModuleWebP;
let webpToCanvas: Function;

export const renderWebpToCanvas = (data: Uint8Array, canvas: HTMLCanvasElement) => {
    if (!webp && !webpToCanvas) {
        webp = new ModuleWebP();
        webpToCanvas = webp.cwrap("WebpToSDL", "number", ["array", "number"]);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    webp.canvas = canvas;
    webpToCanvas(data, data.byteLength);
    webp.canvas = null;
};