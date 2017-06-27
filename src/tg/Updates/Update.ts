
import { API } from "../Codegen/API/APISchema";
import * as Long from "long";

export interface Update {

}

export class NewMessage implements Update {
    constructor(readonly message: API.MessageType) {}
}

export class Group implements Update {
    constructor(readonly group: API.ChatType) {}
}

export class Channel implements Update {
    constructor(readonly channel: API.ChatType) {}
}

export class User implements Update {
    constructor(readonly user: API.UserType) {}
}

export class SentMessage implements Update {
    constructor(readonly randomId: Long, readonly message: API.MessageType) {}
}

export class DeleteMessages implements Update {
    constructor(readonly ids: number[]) {}
}

export class UserTyping implements Update {
    constructor(readonly user: API.UserType, readonly action: API.SendMessageActionType) {}
}

export class UserTypingInGroup implements Update {
    constructor(readonly chatId: number, readonly user: API.UserType, readonly action: API.SendMessageActionType) {}
}

export class ChatParticipants implements Update {
    constructor(readonly participants: API.ChatParticipants) {}
}

export class ContactRegistered implements Update {
    constructor(readonly user: API.UserType, readonly date: number) {}
}

export class ContactLink implements Update {
    constructor(readonly userId: number, readonly myLink: API.ContactLinkType, readonly foreignLink: API.ContactLinkType) {}
}

export class NewAuthorization implements Update {
    constructor(readonly authKeyId: Long, readonly date: number, readonly device: string, readonly location: string) {}
}

export class ChatParticipantAdd implements Update {
    constructor(readonly chatId: number, readonly userId: number, readonly inviterId: number, readonly date: number, readonly version: number) {}
}

export class ChatParticipantDelete implements Update {
    constructor(readonly chatId: number, readonly userId: number, readonly version: number) {}
}

export class UserBlocked implements Update {
    constructor(readonly user: API.UserType, readonly blocked: boolean) {}
}

export class NotifySettings implements Update {
    constructor(readonly peer: API.NotifyPeerType, readonly settings: API.PeerNotifyEventsType) {}
}

export class ServiceNotification implements Update {
    constructor(readonly type: string, readonly message: string, readonly media: API.MessageMediaType, readonly popup: boolean) {}
}

export class Privacy implements Update {
    constructor(readonly key: API.PrivacyKeyType, readonly rules: API.PrivacyRuleType[]) {}
}

export class ReadHistoryInbox implements Update {
    constructor(readonly peer: API.PeerType, readonly maxId: number) {}
}

export class ReadHistoryOutbox implements Update {
    constructor(readonly peer: API.PeerType, readonly maxId: number) {}
}

export class WebPage implements Update {
    constructor(readonly webPage: API.WebPageType) {}
}

export class ReadMessagesContents implements Update {
    constructor(readonly messageIds: number[]) {}
}

export class ChatAdmins implements Update {
    constructor(readonly chatId: number, readonly enabled: boolean, readonly version: number) {}
}

export class ChatParticipantAdmin implements Update {
    constructor(readonly chatId: number, readonly userId: number, readonly isAdmin: boolean, readonly version: number) {}
}

export class NewStickerSet implements Update {
    constructor(readonly set: API.messages.StickerSet) {}
}

export class StickerSetsOrder implements Update {
    constructor(readonly masks: boolean, readonly order: Long[]) {}
}

export class StickerSets implements Update {

}

export class SavedGifs implements Update {

}

export class EditMessage implements Update {
    constructor(readonly message: API.MessageType) {}
}

export class DraftMessage implements Update {
    constructor(readonly peer: API.PeerType, readonly draft: API.DraftMessageType) {}
}

export class ReadFeaturedStickers implements Update {

}

export class UpdateRecentStickers implements Update {

}