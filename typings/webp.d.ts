
declare module "webp" {
    type CType = "number" | "string" | "array" | null;

    interface ModuleWebP {
        new(): this;
        cwrap: (funcName: string, returnType: CType, argTypes: Array<CType>) => Function;
        canvas: HTMLCanvasElement | null;
    }

    const ModuleWebP: ModuleWebP;
    export = ModuleWebP;
}