import { Observable } from "rxjs/Observable";

export const blobToArrayBuffer = (blob: Blob): Observable<ArrayBuffer> => {
    return new Observable<ArrayBuffer>(observer => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            observer.next(this.result);
        };
        fileReader.readAsArrayBuffer(blob);
    });
};