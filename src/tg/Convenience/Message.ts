import { API } from "../Codegen/API/APISchema";

export class ConvenienceMessage {
    readonly id: number;
    readonly date: number;
    readonly out: boolean;
    readonly mentioned: boolean;
    readonly silent: boolean;
    readonly post: boolean;
    readonly from?: API.UserType;
    readonly to?: API.PeerType;
    readonly fwdFrom?:
        { userId: number, date: number } |
        { channelId: number, postId: number, date: number };
    readonly viaBotId?: number;
    readonly replyToMsgId?: number;
    readonly message?: string;
    readonly media?: API.MessageMediaType;
    readonly entities?: Array<API.MessageEntityType>;
    readonly views?: number;
    readonly editDate?: number;
    readonly action?: API.MessageActionType;
    readonly peer?: API.PeerType;

    constructor(message: {
        id: number,
        date: number,
        out: boolean,
        mentioned: boolean,
        silent: boolean,
        post: boolean,
        from?: API.UserType,
        to?: API.PeerType,
        fwdFrom?: { userId: number, date: number } |
            { channelId: number, postId: number, date: number },
        viaBotId?: number,
        replyToMsgId?: number,
        message?: string,
        media?: API.MessageMediaType,
        entities?: Array<API.MessageEntityType>,
        views?: number,
        editDate?: number,
        action?: API.MessageActionType,
    }) {
        this.id = message.id;
        this.date = message.date;
        this.out = message.out;
        this.mentioned = message.mentioned;
        this.silent = message.silent;
        this.post = message.post;
        this.from = message.from;
        this.to = message.to;
        this.fwdFrom = message.fwdFrom;
        this.viaBotId = message.viaBotId;
        this.replyToMsgId = message.replyToMsgId;
        this.message = message.message;
        this.media = message.media;
        this.entities = message.entities;
        this.views = message.views;
        this.editDate = message.editDate;
        this.action = message.action;

        if (this.to instanceof API.PeerChat || this.to instanceof API.PeerChannel || (this.to && this.out)) {
            this.peer = this.to;
        } else if (this.from) {
            this.peer = new API.PeerUser(this.from.id);
        }
    }

    toString(): string {
        if (this.message) {
            return this.message;
        }

        return "Not supported yet";
    }
}