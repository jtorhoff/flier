import { API } from "../Codegen/API/APISchema";

export class ConvenienceMessage {
    readonly id: number;
    readonly date: number;
    readonly out: boolean;
    readonly mentioned: boolean;
    readonly silent: boolean;
    readonly post: boolean;
    readonly type: MessageType;
    readonly from?: API.UserType;
    readonly to?: API.PeerType;
    readonly fwdFrom?:
        { readonly userId: number, readonly date: number } |
        { readonly channelId: number, readonly postId: number, readonly date: number };
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

        if (this.to instanceof API.PeerChat ||
            this.to instanceof API.PeerChannel ||
            (this.to && this.out)) {
            this.peer = this.to;
        } else if (this.from) {
            this.peer = new API.PeerUser(this.from.id);
        }

        this.type = extractType(this);
    }

    toString(): string {
        if (this.message) {
            return this.message;
        } else if (this.media instanceof API.MessageMediaPhoto) {
            if (this.media.caption.string !== "") {
                return `🖼\u2002${this.media.caption.string}`;
            }
            return "Picture";
        } else if (this.media instanceof API.MessageMediaGeo) {
            if (this.media.geo instanceof API.GeoPoint) {
                const lat = this.media.geo.lat.value;
                const long = this.media.geo.long.value;

                return `📍\u2002${lat.toFixed(4)}°${getLat(lat)} ${long.toFixed(4)}°${getLong(long)}`;
            }
            return "Location";
        } else if (this.media instanceof API.MessageMediaContact) {
            return "Contact";
        } else if (this.media instanceof API.MessageMediaDocument) {
            const document = this.media.document;
            if (document instanceof API.Document) {
                const attrs = document.attributes.items;
                let attr: API.DocumentAttributeType | undefined;
                if (attrs.find(a =>
                        a instanceof API.DocumentAttributeAnimated)) {
                    return "GIF";
                } else if (attr = attrs.find(a =>
                        a instanceof API.DocumentAttributeSticker)) {
                    return `${
                        (attr as API.DocumentAttributeSticker).alt.string
                    }\u2002Sticker`;
                } else if (attrs.find(a =>
                        a instanceof API.DocumentAttributeVideo)) {
                    return "Video";
                } else if (attr = attrs.find(a =>
                        a instanceof API.DocumentAttributeAudio)) {
                    if ((attr as API.DocumentAttributeAudio).voice) {
                        return "Voice message";
                    }
                } else if (attr = attrs.find(a =>
                        a instanceof API.DocumentAttributeFilename)) {
                    return `📎\u2002${
                        (attr as API.DocumentAttributeFilename).fileName.string
                    }`;
                }
            }
            return "Document";
        } else if (this.media instanceof API.MessageMediaVenue) {
            return `📍\u2002${this.media.title.string}`;
        } else if (this.media instanceof API.MessageMediaGame) {
            return `🎲\u2002${this.media.game.title.string}`;
        }

        if (this.action instanceof API.MessageActionChatCreate) {
            if (this.from instanceof API.User && this.from.firstName) {
                return `${this.from.firstName.string} created the group`;
            }
        } else if (this.action instanceof API.MessageActionChatEditTitle) {
            if (this.from instanceof API.User && this.from.firstName) {
                if (this.peer instanceof API.PeerChat) {
                    return `${this.from.firstName.string} changed the group name`;
                } else if (this.peer instanceof API.PeerChannel) {
                    return "Channel name changed";
                }
            }
        } else if (this.action instanceof API.MessageActionChatEditPhoto) {
            if (this.from instanceof API.User && this.from.firstName) {
                if (this.peer instanceof API.PeerChat) {
                    return `${this.from.firstName.string} changed the group picture`;
                } else if (this.peer instanceof API.PeerChannel) {
                    return "Channel picture changed";
                }
            }
        } else if (this.action instanceof API.MessageActionChatDeletePhoto) {
            if (this.from instanceof API.User && this.from.firstName) {
                if (this.peer instanceof API.PeerChat) {
                    return `${this.from.firstName.string} removed the group picture`;
                } else if (this.peer instanceof API.PeerChannel) {
                    return "Channel picture removed";
                }
            }
        } else if (this.action instanceof API.MessageActionChatAddUser) {
            if (this.from instanceof API.User && this.from.firstName) {
                return `${this.from.firstName.string} added user(s) to the group`;
            }
        } else if (this.action instanceof API.MessageActionChatDeleteUser) {
            if (this.from instanceof API.User && this.from.firstName) {
                if (this.action.userId.equals(this.from.id)) {
                    return `${this.from.firstName.string} left the group`;
                }
                return `${this.from.firstName.string} removed user from the group`;
            }
        } else if (this.action instanceof API.MessageActionChatJoinedByLink) {
            if (this.from instanceof API.User && this.from.firstName) {
                return `${this.from.firstName.string} joined via invitation link`;
            }
        } else if (this.action instanceof API.MessageActionChannelCreate) {
            return "Channel created";
        } else if (this.action instanceof API.MessageActionChatMigrateTo) {
            // TODO
        } else if (this.action instanceof API.MessageActionChannelMigrateFrom) {
            // TODO
        } else if (this.action instanceof API.MessageActionPinMessage) {
            // TODO
        } else if (this.action instanceof API.MessageActionHistoryClear) {
            return "No messages yet";
        } else if (this.action instanceof API.MessageActionGameScore) {
            // TODO
        }

        return "Not supported yet";
    }
}

const getLat = (lat: number): string => {
    if (lat > 0) {
        return "N";
    }
    return "S";
};

const getLong = (long: number): string => {
    if (long > 0) {
        return "E";
    }
    return "W";
};


const extractType = (message: ConvenienceMessage): MessageType => {
    if (message.message) {
        return MessageType.Text;
    } else if (message.media instanceof API.MessageMediaPhoto) {
        return MessageType.Photo;
    } else if (message.media instanceof API.MessageMediaGeo) {
        return MessageType.Location;
    } else if (message.media instanceof API.MessageMediaContact) {
        return MessageType.Contact;
    } else if (message.media instanceof API.MessageMediaDocument) {
        const document = message.media.document;
        if (document instanceof API.Document) {
            const attrs = document.attributes.items;
            let attr: API.DocumentAttributeType | undefined;
            if (attrs.find(a =>
                    a instanceof API.DocumentAttributeAnimated)) {
                return MessageType.GIF;
            } else if (attr = attrs.find(a =>
                    a instanceof API.DocumentAttributeSticker)) {
                return MessageType.Sticker;
            } else if (attrs.find(a =>
                    a instanceof API.DocumentAttributeVideo)) {
                return MessageType.Video;
            } else if (attr = attrs.find(a =>
                    a instanceof API.DocumentAttributeAudio)) {
                if ((attr as API.DocumentAttributeAudio).voice) {
                    return MessageType.Voice;
                }
            } else if (attrs.find(a =>
                    a instanceof API.DocumentAttributeFilename)) {
                return MessageType.Document;
            }
        }
        return MessageType.Document;
    } else if (message.media instanceof API.MessageMediaVenue) {
        return MessageType.Venue;
    } else if (message.media instanceof API.MessageMediaGame) {
        return MessageType.Game;
    }

    return MessageType.NotSupported;
};

export enum MessageType {
    Text,
    Photo,
    Location,
    Contact,
    GIF,
    Sticker,
    Video,
    Voice,
    Document,
    Venue,
    Game,
    ChatCreate,
    ChatEditTitle,
    ChatDeletePhoto,
    ChatAddUser,
    ChatDeleteUser,
    ChatJoinedByLink,
    NotSupported,
}