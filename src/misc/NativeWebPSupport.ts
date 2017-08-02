import { BehaviorSubject } from "rxjs/BehaviorSubject";

const nativeSupport = new BehaviorSubject(false);
const testImage = new Image();
testImage.onload = () => {
    nativeSupport.next(testImage.width === 2 && testImage.height === 1);
};
testImage.onerror = () => {
    nativeSupport.next(false);
};
testImage.src = "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==";


export const nativeWebPSupport = nativeSupport.asObservable();