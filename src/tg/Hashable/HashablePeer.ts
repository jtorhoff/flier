import { API } from "../Codegen/API/APISchema";
import { Hashable } from "../DataStructures/HashMap/Hashable";

export class HashablePeer implements Hashable {
    readonly hashValue: number;

    constructor(readonly peer: API.PeerType) {
        if (peer instanceof API.PeerUser) {
            this.hashValue = "u".charCodeAt(0) ^ peer.userId.hashValue;
        } else if (peer instanceof API.PeerChat) {
            this.hashValue = "g".charCodeAt(0) ^ peer.chatId.hashValue;
        } else if (peer instanceof API.PeerChannel) {
            this.hashValue = "c".charCodeAt(0) ^ peer.channelId.hashValue;
        }
    }

    equals(to: HashablePeer): boolean {
        if (this.peer instanceof API.PeerUser && to.peer instanceof API.PeerUser) {
            return this.peer.userId.equals(to.peer.userId);
        } else if (this.peer instanceof API.PeerChat && to.peer instanceof API.PeerChat) {
            return this.peer.chatId.equals(to.peer.chatId);
        } else if (this.peer instanceof API.PeerChannel && to.peer instanceof API.PeerChannel) {
            return this.peer.channelId.equals(to.peer.channelId);
        }

        return false;
    }
}