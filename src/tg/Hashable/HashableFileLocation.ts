import { API } from "../Codegen/API/APISchema";
import { Hashable } from "../DataStructures/HashMap/Hashable";

export class HashableFileLocation extends API.FileLocation implements Hashable {
    constructor(file: API.FileLocation) {
        super(file.dcId, file.volumeId, file.localId, file.secret);
    }

    get hashValue(): number {
        return this.dcId.hashValue ^ this.volumeId.hashValue ^ this.localId.hashValue ^ this.secret.hashValue;
    }

    equals(to: HashableFileLocation): boolean {
        return this.dcId.equals(to.dcId)
            && this.volumeId.equals(to.volumeId)
            && this.localId.equals(to.localId)
            && this.secret.equals(to.secret);
    }
}