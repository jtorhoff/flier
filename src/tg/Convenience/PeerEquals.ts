/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { API } from "../Codegen/API/APISchema";

export const peerEquals = (lhs?: API.PeerType, rhs?: API.PeerType) => {
    if (lhs instanceof API.PeerUser &&
        rhs instanceof API.PeerUser &&
        lhs.userId.equals(rhs.userId)) {
        return true;
    } else if (lhs instanceof API.PeerChat &&
        rhs instanceof API.PeerChat &&
        lhs.chatId.equals(rhs.chatId)) {
        return true;
    } else if (lhs instanceof API.PeerChannel &&
        rhs instanceof API.PeerChannel &&
        lhs.channelId.equals(rhs.channelId)) {
        return true;
    }

    return false;
};