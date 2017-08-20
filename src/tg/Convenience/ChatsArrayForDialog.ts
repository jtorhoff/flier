import { API } from "../Codegen/API/APISchema";
import { ConvenienceChat, ConvenienceChatKind } from "./Chat";
import { ConvenienceMessage } from "./Message";
import { convenienceMessageFor } from "./MessageFor";

export const convenienceChatsArrayForDialogs = (dialogs: {
    readonly dialogs: API.Dialog[],
    readonly messages: API.MessageType[],
    readonly chats: API.ChatType[],
    readonly users: API.UserType[]
}): Array<ConvenienceChat> => {
    const result: ConvenienceChat[] = [];

    for (let dialog of dialogs.dialogs) {
        const message = dialogs.messages
            .find(item => item.id.equals(dialog.topMessage));
        if (!message) continue;

        let kind: ConvenienceChatKind;
        switch (dialog.peer.constructor) {
            case API.PeerUser: {
                const peer = dialog.peer as API.PeerUser;
                const user = dialogs.users
                    .find(item => item.id.equals(peer.userId))!;
                if (!(user instanceof API.User)) continue;
                kind = {
                    kind: "dialog",
                    user: user,
                };
            } break;

            case API.PeerChat: {
                const peer = dialog.peer as API.PeerChat;
                const chat = dialogs.chats
                    .find(item => item.id.equals(peer.chatId))!;
                if (!(chat instanceof API.Chat) && !(chat instanceof API.ChatForbidden))
                    continue;
                kind = {
                    kind: "chat",
                    chat: chat,
                };
            } break;

            case API.PeerChannel: {
                const peer = dialog.peer as API.PeerChannel;
                const channel = dialogs.chats
                    .find(item => item.id.equals(peer.channelId))!;
                if (!(channel instanceof API.Channel) && !(channel instanceof API.ChannelForbidden))
                    continue;
                kind = {
                    kind: "channel",
                    channel: channel,
                };
            } break;

            default:
                continue;
        }

        let msg: ConvenienceMessage | undefined;
        let fromId = (message as API.Message & API.MessageService).fromId;
        if (fromId) {
            const from = dialogs.users
                .find(item => item.id.equals(fromId!));
            msg = convenienceMessageFor(message, from);
        } else {
            msg = convenienceMessageFor(message);
        }
        if (!msg) continue;

        const chat = new ConvenienceChat(
            dialog.peer,
            dialog.readInboxMaxId.value,
            dialog.readOutboxMaxId.value,
            dialog.unreadCount.value,
            msg,
            kind);

        result.push(chat);
    }

    return result;
};