import { API } from "../Codegen/API/APISchema";
import { ConvenienceChat, ConvenienceChatKind } from "./Chat";
import { ConvenienceMessage } from "./Message";
import { convenienceMessageFor } from "./MessageFor";

export const convenienceChatsArrayForDialogs = (dialogs: API.messages.DialogsType): Array<ConvenienceChat> => {
    const result: ConvenienceChat[] = [];

    for (let dialog of dialogs.dialogs.items) {
        const message = dialogs.messages.items
            .find(item => item.id.equals(dialog.topMessage));
        if (!message) continue;

        let kind: ConvenienceChatKind;
        switch (dialog.peer.constructor) {
            case API.PeerUser: {
                const peer = dialog.peer as API.PeerUser;
                kind = {
                    kind: "dialog",
                    user: dialogs.users.items
                        .find(item => item.id.equals(peer.userId))!
                };
            } break;

            case API.PeerChat: {
                const peer = dialog.peer as API.PeerChat;
                kind = {
                    kind: "chat",
                    chat: dialogs.chats.items
                        .find(item => item.id.equals(peer.chatId))!
                };
            } break;

            case API.PeerChannel: {
                const peer = dialog.peer as API.PeerChannel;
                kind = {
                    kind: "channel",
                    channel: dialogs.chats.items
                        .find(item => item.id.equals(peer.channelId))!
                };
            } break;

            default:
                continue;
        }

        let msg: ConvenienceMessage | undefined;
        let fromId = (message as API.Message & API.MessageService).fromId;
        if (fromId) {
            const from = dialogs.users.items
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