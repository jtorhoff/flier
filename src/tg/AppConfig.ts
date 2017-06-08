
export class AppConfig {
    constructor(readonly apiId: number,
                readonly apiHash: string,
                readonly rsaKeys: string[],
                readonly entryDC: string) {}
}