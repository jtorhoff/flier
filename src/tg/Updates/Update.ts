import { API } from "../Codegen/API/APISchema";
import { Message } from "../TG";
import { Hashable } from "../DataStructures/HashMap/Hashable";
import { HashMap } from "../DataStructures/HashMap/HashMap";
import { HashablePeer } from "../Hashable/HashablePeer";

export abstract class Update {
    //noinspection JSMethodCanBeStatic
    /**
     * Crutches to force nominal type.
     */
    private get __nominalUpdateType(): never {
        throw new Error();
    }
}

export namespace Update {
    export class NewMessage extends Update {
        constructor(readonly message: Message) {
            super();
        }
    }

    export class TopMessage extends Update {
        constructor(readonly message: Message) {
            super();
        }
    }

    export class Chat extends Update {
        constructor(readonly chat: API.Chat | API.ChatForbidden) {
            super();
        }
    }

    export class Channel extends Update {
        constructor(readonly channel: API.Channel | API.ChannelForbidden) {
            super();
        }
    }

    export class User extends Update {
        constructor(readonly user: API.User) {
            super();
        }
    }

// export class SentMessage extends Update {
//     constructor(readonly randomId: Long, readonly message: API.MessageType) {
//         super();
//     }
// }

    export class DeleteMessages extends Update {
        constructor(readonly messages: HashMap<HashablePeer, Array<number>>) {
            super();
        }
    }

    export class UserTyping extends Update {
        constructor(readonly peer: API.PeerUser | API.PeerChat,
                    readonly user: API.User,
                    readonly action: API.SendMessageActionType,
                    readonly expires: number) {
            super();
        }
    }
//
// export class UserTypingInGroup extends Update {
//     constructor(readonly chatId: number, readonly user: API.UserType, readonly action: API.SendMessageActionType) {
//         super();
//     }
// }

// export class ChatParticipants extends Update {
//     constructor(readonly participants: API.ChatParticipants) {
//         super();
//     }
// }
//
// export class ContactRegistered extends Update {
//     constructor(readonly user: API.UserType, readonly date: number) {
//         super();
//     }
// }
//
// export class ContactLink extends Update {
//     constructor(readonly userId: number, readonly myLink: API.ContactLinkType, readonly foreignLink: API.ContactLinkType) {
//         super();
//     }
// }
//
// export class NewAuthorization extends Update {
//     constructor(readonly authKeyId: Long, readonly date: number, readonly device: string, readonly location: string) {
//         super();
//     }
// }
//
// export class ChatParticipantAdd extends Update {
//     constructor(readonly chatId: number, readonly userId: number, readonly inviterId: number, readonly date: number, readonly version: number) {
//         super();
//     }
// }
//
// export class ChatParticipantDelete extends Update {
//     constructor(readonly chatId: number, readonly userId: number, readonly version: number) {
//         super();
//     }
// }
//
// export class UserBlocked extends Update {
//     constructor(readonly user: API.UserType, readonly blocked: boolean) {
//         super();
//     }
// }
//
// export class NotifySettings extends Update {
//     constructor(readonly peer: API.NotifyPeerType, readonly settings: API.PeerNotifyEventsType) {
//         super();
//     }
// }
//
// export class ServiceNotification extends Update {
//     constructor(readonly type: string, readonly message: string, readonly media: API.MessageMediaType, readonly popup: boolean) {
//         super();
//     }
// }
//
// export class Privacy extends Update {
//     constructor(readonly key: API.PrivacyKeyType, readonly rules: API.PrivacyRuleType[]) {
//         super();
//     }
// }

    export class ReadHistoryInbox extends Update {
        constructor(readonly peer: API.PeerType, readonly maxId: number) {
            super();
        }
    }

    export class ReadHistoryOutbox extends Update {
        constructor(readonly peer: API.PeerType, readonly maxId: number) {
            super();
        }
    }

// export class WebPage extends Update {
//     constructor(readonly webPage: API.WebPageType) {
//         super();
//     }
// }

// export class ReadMessagesContents extends Update {
//     constructor(readonly messageIds: number[]) {
//         super();
//     }
// }

// export class ChatAdmins extends Update {
//     constructor(readonly chatId: number, readonly enabled: boolean, readonly version: number) {
//         super();
//     }
// }
//
// export class ChatParticipantAdmin extends Update {
//     constructor(readonly chatId: number, readonly userId: number, readonly isAdmin: boolean, readonly version: number) {
//         super();
//     }
// }
//
// export class NewStickerSet extends Update {
//     constructor(readonly set: API.messages.StickerSet) {
//         super();
//     }
// }
//
// export class StickerSetsOrder extends Update {
//     constructor(readonly masks: boolean, readonly order: Long[]) {
//         super();
//     }
// }
//
// export class StickerSets extends Update {
//
// }
//
// export class SavedGifs extends Update {
//
// }

    export class EditMessage extends Update {
        constructor(readonly message: Message) {
            super();
        }
    }

    export class DraftMessage extends Update {
        constructor(readonly peer: API.PeerType, readonly draft: API.DraftMessageType) {
            super();
        }
    }

// export class ReadFeaturedStickers extends Update {
//
// }
//
// export class UpdateRecentStickers extends Update {
//
// }
}

