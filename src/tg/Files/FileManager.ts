import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { API } from "../Codegen/API/APISchema";
import { Hashable } from "../DataStructures/HashMap/Hashable";
import { HashMap } from "../DataStructures/HashMap/HashMap";
import { DataCenter } from "../Session/DataCenter";
import { PersistentStorage } from "../Storage/PersistentStorage";
import { FileDownloader } from "./FileDownloader";

export class FileManager {
    private downloaders = new HashMap<HashableFileLocation, FileDownloader>();

    constructor(private storage: PersistentStorage.Storage,
                private requestDc: (dcId: number) => Observable<DataCenter | undefined>) {

    }

    getFile(location: API.FileLocation): Observable<Blob> {
        const file = new HashableFileLocation(location);

        return this.storage.readFile(location).flatMap(blob => {
            if (blob) {
                return Observable.of(blob);
            } else {
                let downloader = this.downloaders.get(file);
                if (!downloader) {
                    downloader = new FileDownloader(
                        location,
                        this.storage,
                        this.requestDc(file.dcId.value)!);
                    this.downloaders.put(file, downloader);
                }
                downloader.observable.subscribe({
                    complete: () => {
                        this.downloaders.remove(file);
                        this.dispatchDownload();
                    }
                });
                this.dispatchDownload();

                return downloader.observable;
            }
        });
    }

    private dispatchDownload() {
        const maxConcurrentDownloadsPerDC = 2;

        this.downloaders.forEach((file, downloader) => {
            if (downloader.downloading) {
                return;
            }

            const busyDownloaders = this.downloaders.entries
                .filter(entry => entry.key.dcId.equals(file.dcId) && entry.value.downloading);

            if (busyDownloaders.length < maxConcurrentDownloadsPerDC) {
                downloader.dispatchDownload();
            }
        });
    }
}

class HashableFileLocation extends API.FileLocation implements Hashable {
    constructor(file: API.FileLocation) {
        super(file.dcId, file.volumeId, file.localId, file.secret);
    }

    get hashValue(): number {
        return this.volumeId.hashValue ^ this.localId.hashValue ^ this.secret.hashValue;
    }

    equals(to: HashableFileLocation): boolean {
        return this.dcId.equals(to.dcId)
            && this.volumeId.equals(to.volumeId)
            && this.localId.equals(to.localId)
            && this.secret.equals(to.secret);
    }
}