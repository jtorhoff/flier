import { DataCenter } from "./DataCenter";
import { API } from "../Codegen/API/APISchema";

export interface DataCenterDelegate {
    authorized(userId: number,
               dcId: number,
               host: string,
               authKey: Uint8Array): void;
    migrated(from: DataCenter, to: DataCenter): void;

    shouldSyncUpdatesState(): void;
    receivedUpdates(updates: API.UpdatesType): void;
}