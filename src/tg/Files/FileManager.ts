import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { Hashable } from "../DataStructures/HashMap/Hashable";
import { HashMap } from "../DataStructures/HashMap/HashMap";
import { DataCenter } from "../Session/DataCenter";
import { PersistentStorage } from "../Storage/PersistentStorage";
import { TLSerializable } from "../TL/Interfaces/TLSerializable";
import { TLInt } from "../TL/Types/TLInt";
import { TLLong } from "../TL/Types/TLLong";
import { concat } from "../Utils/BytesConcat";
import { FileDownloader } from "./FileDownloader";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class FileManager {
    private downloaders = new HashMap<HashableFile, FileDownloader>();
    private progress = new HashMap<HashableFile, BehaviorSubject<number>>();

    constructor(private storage: PersistentStorage.Storage,
                private requestDc: (dcId: number) => Observable<DataCenter>) {

    }

    getFile(location: FileLocation | DocumentLocation): Observable<Blob> {
        const file = new HashableFile(location);

        return this.storage.readFile(location).flatMap(blob => {
            if (blob) {
                const progress = this.progress.get(file);
                if (progress) {
                    progress.next(blob.size);
                }
                return Observable.of(blob);
            } else {
                let downloader = this.downloaders.get(file);
                if (typeof downloader === "undefined") {
                    downloader = new FileDownloader(
                        location,
                        this.storage,
                        this.requestDc(file.dcId.value));
                    this.downloaders.put(file, downloader);

                    let progress = this.progress.get(file);
                    if (progress) {
                        downloader.progress.subscribe(progress);
                    } else {
                        this.progress.put(file, new BehaviorSubject(0));
                    }
                }
                this.dispatchDownload();
                return downloader.observable;
            }
        });
    }

    getProgress(location: FileLocation | DocumentLocation): Observable<number> {
        const file = new HashableFile(location);

        let progress = this.progress.get(file);
        if (!progress) {
            progress = new BehaviorSubject(0);
            this.progress.put(file, progress);
        }

        return progress;

        // let downloader = this.downloaders.get(file);
        //
        // if (progress) {
        //
        // }
        //
        //
        // if (!this.progress.get(file)) {
        //     let progress = this.downloaders.get(file);
        //     if (progress) {
        //
        //     }
        //
        //     // const progress = new BehaviorSubject(0);
        //     // this.progress.put(file, progress);
        //
        //     return progress;
        // }
        //
        // return this.progress.get(file);
    }

    // getProgress(location: FileLocation | DocumentLocation): Observable<number> {
    //     const file = new HashableFile(location);
    //     const subject = new BehaviorSubject(this.storage.readFile(location).flatMap())
    // }

    // getProgress(location: FileLocation | DocumentLocation): Observable<number> {
    //
    // }

    private dispatchDownload() {
        const maxConcurrentDownloadsPerDC = 3;
        this.downloaders.forEach((file, downloader) => {
            const busyDownloaders = this.downloaders.entries
                .filter(entry =>
                    entry.key.dcId.equals(file.dcId) && entry.value.downloading);
            if (busyDownloaders.length < maxConcurrentDownloadsPerDC) {
                downloader.observable
                    .subscribe({
                        complete: () => {
                            this.downloaders.remove(file);
                            this.dispatchDownload();
                        }
                    });
                downloader.dispatchDownload();
            }
        });
    }
}

export class FileLocation implements TLSerializable {
    constructor(readonly dcId: TLInt,
                readonly volumeId: TLLong,
                readonly localId: TLInt,
                readonly secret: TLLong) {
    }

    serialized(): Uint8Array {
        const dcId = this.dcId.serialized();
        const volumeId = this.volumeId.serialized();
        const localId = this.localId.serialized();
        const secret = this.secret.serialized();

        return concat(dcId, volumeId, localId, secret);
    }
}

export class DocumentLocation implements TLSerializable {
    constructor(readonly dcId: TLInt,
                readonly id: TLLong,
                readonly accessHash: TLLong,
                readonly version: TLInt) {
    }

    serialized(): Uint8Array {
        const dcId = this.dcId.serialized();
        const id = this.id.serialized();
        const accessHash = this.accessHash.serialized();
        const version = this.version.serialized();

        return concat(dcId, id, accessHash, version);
    }
}

class HashableFile implements Hashable {
    constructor(readonly file: FileLocation | DocumentLocation) {
    }

    get dcId(): TLInt {
        return this.file.dcId;
    }

    get hashValue(): number {
        if (this.file instanceof FileLocation) {
            return this.file.dcId.hashValue ^
                this.file.volumeId.hashValue ^
                this.file.localId.hashValue ^
                this.file.secret.hashValue;
        } else if (this.file instanceof DocumentLocation) {
            return this.file.dcId.hashValue ^
                this.file.id.hashValue ^
                this.file.accessHash.hashValue ^
                this.file.version.hashValue;
        }

        throw new Error();
    }

    equals(to: HashableFile): boolean {
        if (this.file instanceof FileLocation && to.file instanceof FileLocation) {
            return this.file.dcId.equals(to.file.dcId)
                && this.file.volumeId.equals(to.file.volumeId)
                && this.file.localId.equals(to.file.localId)
                && this.file.secret.equals(to.file.secret);
        } else if (this.file instanceof DocumentLocation && to.file instanceof DocumentLocation) {
            return this.file.dcId.equals(to.file.dcId)
                && this.file.id.equals(to.file.id)
                && this.file.accessHash.equals(to.file.accessHash)
                && this.file.version.equals(to.file.version);
        }

        return false;
    }
}