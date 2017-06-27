import { Observable } from "rxjs/Observable";

export const blobToDataURL = (blob: Blob): Observable<string> => {
    return new Observable<string>(observer => {
        const reader = new FileReader();
        reader.onload = () => {
            observer.next(reader.result);
        };
        reader.onerror = (ev) => {
            observer.error(ev);
        };
        reader.onloadend = () => {
            observer.complete();
        };
        reader.readAsDataURL(blob);
    });
};