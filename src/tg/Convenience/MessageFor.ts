import { API } from "../Codegen/API/APISchema";
import { ConvenienceMessage } from "./Message";

export const convenienceMessageFor = (message: API.MessageType,
                                      from?: API.UserType): ConvenienceMessage | undefined => {
    if (message instanceof API.MessageEmpty) {
        return undefined;
    }

    const msg = message as (API.Message & API.MessageService);
    let fwdFrom;
    if (msg.fwdFrom) {
        const fwd = msg.fwdFrom;
        if (fwd.fromId) {
            fwdFrom = { userId: fwd.fromId.value, date: fwd.date.value };
        } else if (fwd.channelId && fwd.channelPost) {
            fwdFrom = {
                channelId: fwd.channelId.value,
                postId: fwd.channelPost.value,
                date: fwd.date.value
            };
        } else {
            throw new Error();
        }
    }

    return new ConvenienceMessage({
        id: msg.id.value,
        date: msg.date.value,
        out: msg.out,
        mentioned: msg.mentioned,
        silent: msg.silent,
        post: msg.post,
        from: from,
        to: msg.toId,
        fwdFrom: fwdFrom,
        viaBotId: msg.viaBotId ? msg.viaBotId.value : undefined,
        replyToMsgId: msg.replyToMsgId ? msg.replyToMsgId.value : undefined,
        message: msg.message && msg.message.string !== "" ? msg.message.string : undefined,
        media: msg.media,
        entities: msg.entities ? msg.entities.items : undefined,
        views: msg.views ? msg.views.value : undefined,
        editDate: msg.editDate ? msg.editDate.value : undefined,
        action: msg.action,
    });
};