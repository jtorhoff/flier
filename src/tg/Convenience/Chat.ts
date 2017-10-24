import { API } from "../Codegen/API/APISchema";
import { TLString } from "../TL/Types/TLString";
import { ConvenienceMessage } from "./Message";

export type ConvenienceChatKind =
    { kind: "dialog", user: API.User } |
    { kind: "chat", chat: API.Chat | API.ChatForbidden } |
    { kind: "channel", channel: API.Channel | API.ChannelForbidden };

export class ConvenienceChat {
    constructor(readonly peer: API.PeerType,
                readonly readInboxMaxId: number,
                readonly readOutboxMaxId: number,
                readonly unreadCount: number,
                readonly topMessage: ConvenienceMessage,
                readonly kind: ConvenienceChatKind) {
    }

    peerEquals(peer: API.PeerType): boolean {
        if (this.peer instanceof API.PeerUser &&
            peer instanceof API.PeerUser &&
            this.peer.userId.equals(peer.userId)) {
            return true;
        } else if (this.peer instanceof API.PeerChat &&
            peer instanceof API.PeerChat &&
            this.peer.chatId.equals(peer.chatId)) {
            return true;
        } else if (this.peer instanceof API.PeerChannel &&
            peer instanceof API.PeerChannel &&
            this.peer.channelId.equals(peer.channelId)) {
            return true;
        }

        return false;
    }

    setReadInboxMaxId(id: number): ConvenienceChat {
        let unreadCount = this.unreadCount;
        if (id >= this.topMessage.id) {
            unreadCount = 0;
        }

        return new ConvenienceChat(
            this.peer,
            id,
            this.readOutboxMaxId,
            unreadCount,
            this.topMessage,
            this.kind,
        );
    }

    setReadOutboxMaxId(id: number): ConvenienceChat {
        return new ConvenienceChat(
            this.peer,
            this.readInboxMaxId,
            id,
            this.unreadCount,
            this.topMessage,
            this.kind,
        );
    }

    setTopMessage(message: ConvenienceMessage): ConvenienceChat {
        let unreadCount = this.unreadCount;
        if (!message.out && this.readInboxMaxId < message.id) {
            unreadCount += 1;
        } else if (this.readInboxMaxId >= message.id) {
            unreadCount = 0;
        } else if (this.readOutboxMaxId >= message.id) {
            unreadCount = 0;
        }

        return new ConvenienceChat(
            this.peer,
            this.readInboxMaxId,
            this.readOutboxMaxId,
            unreadCount,
            message,
            this.kind,
        );
    }

    setKind(kind: ConvenienceChatKind): ConvenienceChat {
        return new ConvenienceChat(
            this.peer,
            this.readInboxMaxId,
            this.readOutboxMaxId,
            this.unreadCount,
            this.topMessage,
            kind,
        );
    }

    get inputPeer(): API.InputPeerType {
        switch (this.kind.kind) {
            case "dialog": {
                if (this.kind.user instanceof API.User &&
                    this.kind.user.accessHash) {
                    return new API.InputPeerUser(
                        this.kind.user.id, this.kind.user.accessHash);
                }
            } break;

            case "chat":
                return new API.InputPeerChat(this.kind.chat.id);

            case "channel": {
                if (this.kind.channel instanceof API.Channel &&
                    this.kind.channel.accessHash) {
                    return new API.InputPeerChannel(
                        this.kind.channel.id, this.kind.channel.accessHash);
                }
            } break;
        }

        return new API.InputPeerEmpty();
    }

    get peerId(): number {
        if (this.peer instanceof API.PeerUser) {
            return this.peer.userId.value;
        } else if (this.peer instanceof API.PeerChat) {
            return this.peer.chatId.value;
        } else if (this.peer instanceof API.PeerChannel) {
            return this.peer.channelId.value;
        }

        return 0;
    }

    get photoSmall(): API.FileLocation | undefined {
        switch (this.kind.kind) {
            case "dialog": {
                const user = this.kind.user;
                if (user instanceof API.User) {
                    if (user.photo instanceof API.UserProfilePhoto) {
                        if (user.photo.photoSmall instanceof API.FileLocation) {
                            return user.photo.photoSmall;
                        }
                    }
                }
            } break;

            case "chat": {
                const chat = this.kind.chat;
                if (chat instanceof API.Chat) {
                    if (chat.photo instanceof API.ChatPhoto) {
                        if (chat.photo.photoSmall instanceof API.FileLocation) {
                            return chat.photo.photoSmall;
                        }
                    }
                }
            } break;

            case "channel": {
                const channel = this.kind.channel;
                if (channel instanceof API.Channel) {
                    if (channel.photo instanceof API.ChatPhoto) {
                        if (channel.photo.photoSmall instanceof API.FileLocation) {
                            return channel.photo.photoSmall;
                        }
                    }
                }
            } break;
        }

        return undefined;
    }

    get title(): string {
        let title: string | undefined;

        switch (this.kind.kind) {
            case "dialog": {
                const user = this.kind.user;
                if (user instanceof API.User) {
                    const firstName = user.firstName || TLString.empty;
                    const lastName = user.lastName || TLString.empty;
                    title = [firstName.string, lastName.string]
                        .join(" ")
                        .trim();
                }
            } break;

            case "chat": {
                const group = this.kind.chat;
                if (group instanceof API.Chat) {
                    title = group.title.string;
                } else if (group instanceof API.ChatForbidden) {
                    title = group.title.string;
                }
            } break;

            case "channel": {
                const channel = this.kind.channel;
                if (channel instanceof API.Channel) {
                    title = channel.title.string;
                } else if (channel instanceof API.ChannelForbidden) {
                    title = channel.title.string;
                }
            } break;
        }

        if (title && title !== "") {
            return title;
        }

        return "Not Available";
    }
}