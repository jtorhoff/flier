/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { API } from "../Codegen/API/APISchema";
import { DataCenter } from "./DataCenter";

export interface DataCenterDelegate {
    authorized(userId: number,
               dcId: number,
               host: string,
               authKey: Uint8Array): void;
    migrated?(from: DataCenter, to: DataCenter): void;

    shouldSyncUpdatesState?(): void;
    receivedUpdates?(updates: API.UpdatesType): void;
}