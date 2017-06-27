import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { API } from "../Codegen/API/APISchema";
import { DataCenter } from "../Session/DataCenter";
import { PersistentStorage } from "../Storage/PersistentStorage";
import { TLInt } from "../TL/Types/TLInt";

export class FileDownloader {
    private readonly inputLocation: API.InputFileLocation;

    private offset: number = 0;
    /**
     * File part size limit, 32 KB.
     * @type {number}
     */
    private limit: number = 1 << 15;
    private lastRequestSentAt: number = 0;
    private subject = new Subject<Blob>();

    constructor(readonly location: API.FileLocation,
                private readonly storage: PersistentStorage.Storage,
                private readonly dc: Observable<DataCenter>) {
        this.inputLocation = new API.InputFileLocation(
            location.volumeId,
            location.localId,
            location.secret);
    }

    get downloading(): boolean {
        return this.lastRequestSentAt > 0;
    }

    get observable(): Observable<Blob> {
        return this.subject.asObservable();
    }

    dispatchDownload() {
        if (!this.downloading) {
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

        this.dc.subscribe(dc => {
            this.downloadPartWithDc(dc);
        },
        error => {
            this.subject.error(error);
        });
    }

    private downloadPartWithDc(dc: DataCenter) {
        const fun = new API.upload.GetFile(
            this.inputLocation,
            new TLInt(this.offset),
            new TLInt(this.limit));
        this.offset += this.limit;

        const curLimit = this.limit;

        dc.call(fun).subscribe(
            (file: API.upload.File) => {
                const appendFile = this.storage.appendFile(
                    this.location,
                    new Blob([file.bytes.bytes], {
                        type: mimeTypeForFileType(file.type)
                    }),
                    file.bytes.bytes.length < curLimit);

                appendFile.subscribe({
                    complete: () => {
                        if (file.bytes.bytes.length < curLimit) {
                            this.storage.readFile(this.location).subscribe(
                                blob => {
                                    if (blob) {
                                        this.subject.next(blob);
                                    } else {
                                        this.subject.error(new Error());
                                    }
                                },
                                error => {
                                    this.subject.error(error);
                                },
                                () => {
                                    this.subject.complete();
                                });
                        } else {
                            this.downloadPart();
                        }
                    }
                });
            },
            error => {
                this.subject.error(error);
            });
    }
}

/**
 * Minimum file part size, 4 KB.
 * @type {number}
 */
const minLimit = 1 << 12;

/**
 * Maximum file part size, 512 KB.
 * @type {number}
 */
const maxLimit = 1 << 19;

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