import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { API } from "../Codegen/API/APISchema";
import { DataCenter } from "../Session/DataCenter";
import { PersistentStorage } from "../Storage/PersistentStorage";
import { TLInt } from "../TL/Types/TLInt";
import { FileLocation, DocumentLocation } from "./FileManager";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class FileDownloader {
    private readonly inputLocation: API.InputFileLocationType;

    private offset: number = 0;
    /**
     * File part size limit, 32 KB.
     * @type {number}
     */
    private limit: number = 1 << 15;
    private lastRequestSentAt: number = 0;
    private subject = new Subject<Blob>();
    private _downloading = false;

    readonly progress = new BehaviorSubject(0);

    constructor(readonly location: FileLocation | DocumentLocation,
                private readonly storage: PersistentStorage.Storage,
                private readonly dc: Observable<DataCenter>) {
        if (location instanceof FileLocation) {
            this.inputLocation = new API.InputFileLocation(
                location.volumeId,
                location.localId,
                location.secret,
            );
        } else if (location instanceof DocumentLocation) {
            this.inputLocation = new API.InputDocumentFileLocation(
                location.id,
                location.accessHash,
                location.version,
            );
        } else {
            throw new Error();
        }
    }

    get downloading(): boolean {
        return this._downloading;
    }

    get observable(): Observable<Blob> {
        return this.subject.asObservable();
    }

    dispatchDownload() {
        if (!this._downloading) {
            this._downloading = true;
            this.downloadPart();
        }
    }

    private downloadPart() {
        const now = uptime();
        if (this.lastRequestSentAt > 0) {
            // Decrease the limit if more than one second has passed
            // since the last download request, otherwise increase
            if (now - this.lastRequestSentAt > 1) {
                if (this.limit > minLimit) {
                    this.limit >>= 1;
                }
            } else {
                if (this.limit < maxLimit) {
                    this.limit <<= 1;
                }
            }
        }
        this.lastRequestSentAt = now;

        this.dc.map(dc => this.downloadPartWithDc(dc)).subscribe();
    }

    private downloadPartWithDc(dc: DataCenter) {
        const fun = new API.upload.GetFile(
            this.inputLocation,
            new TLInt(this.offset),
            new TLInt(this.limit));
        this.offset += this.limit;

        const curLimit = this.limit;

        dc.call(fun)
            .flatMap((file: API.upload.File) =>
                this.storage.appendFile(
                    this.location,
                    new Blob([file.bytes.bytes], {
                        type: mimeTypeForFileType(file.type)
                    }),
                    file.bytes.bytes.length < curLimit))
            .flatMap(progress => {
                this.progress.next(progress.savedSize);
                if (progress.complete) {
                    return this.storage.readFile(this.location);
                } else {
                    return Observable.of(undefined);
                }
            })
            .subscribe(
                blob => {
                    if (blob) {
                        this.subject.next(blob);
                        this.subject.complete();
                        this._downloading = false;
                    } else {
                        this.downloadPart();
                    }
                },
                error => {
                    this.subject.error(error);
                    this.subject.complete();
                    this._downloading = false;
                });
    }
}

/**
 * Minimum file part size, 4 KB.
 * @type {number}
 */
const minLimit = 1 << 12;

/**
 * Maximum file part size, 256 KB.
 * @type {number}
 */
const maxLimit = 1 << 18;

const uptime = (): number => {
    return performance.now() / 1000;
};

const mimeTypeForFileType = (fileType: API.storage.FileTypeType): string => {
    switch (fileType.constructor) {
        case API.storage.FileJpeg:
            return "image/jpeg";
        case API.storage.FileGif:
            return "image/gif";
        case API.storage.FilePng:
            return "image/png";
        case API.storage.FilePdf:
            return "application/pdf";
        case API.storage.FileMp3:
            return "audio/mpeg";
        case API.storage.FileMov:
            return "video/quicktime";
        case API.storage.FilePartial:
            return "multipart/byteranges";
        case API.storage.FileMp4:
            return "video/mp4";
        case API.storage.FileWebp:
            return "image/webp";
        default:
            return "application/octet-stream";
    }
};