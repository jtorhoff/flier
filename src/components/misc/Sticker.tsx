import * as React from "react";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { blobToArrayBuffer } from "../../misc/BlobToArrayBuffer";
import { nativeWebPSupport } from "../../misc/NativeWebPSupport";
import { renderWebpToCanvas } from "../../misc/RenderWebpToCanvas";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import "rxjs/add/operator/switchMap";

interface Props {
    width: number,
    height: number,
    sticker: API.Document,
    thumb: boolean,
}

interface State {
    stickerLoaded: boolean,
    stickerDataURL?: string,
}

export class Sticker extends React.Component<Props, State> {
    stickerSubscription?: Subscription;
    canvasRef: HTMLCanvasElement | null;

    state: State = {
        stickerLoaded: false,
    };

    componentDidMount() {
        let file: API.Document | API.FileLocation | undefined;
        let stickerWidth = 0;
        let stickerHeight = 0;
        if (this.props.thumb) {
            if (this.props.sticker.thumb instanceof API.PhotoSize ||
                this.props.sticker.thumb instanceof API.PhotoCachedSize) {
                const thumb = this.props.sticker.thumb;
                if (thumb.location instanceof API.FileLocation) {
                    file = thumb.location;
                }
                stickerWidth = thumb.w.value;
                stickerHeight = thumb.h.value;
            }
        } else {
            file = this.props.sticker;
            const size = this.props.sticker.attributes.items
                .find(attr => attr instanceof API.DocumentAttributeImageSize) as
                API.DocumentAttributeImageSize;
            stickerWidth = size.w.value;
            stickerHeight = size.h.value;
        }
        if (!file) return;

        this.stickerSubscription = tg.getFile(file)
            .flatMap(blob =>
                nativeWebPSupport.switchMap(nativeWebP => {
                    if (nativeWebP) {
                        return Observable.of(URL.createObjectURL(blob));
                    } else {
                        return blobToArrayBuffer(blob) as any;
                    }
                }))
            .subscribe(data => {
                if (typeof data === "string") {
                    this.setState({
                        stickerLoaded: true,
                        stickerDataURL: data,
                    });
                } else {
                    this.setState({
                        stickerLoaded: true,
                    }, () => {
                        renderWebpToCanvas(
                            new Uint8Array(data as ArrayBuffer),
                            stickerWidth,
                            stickerHeight,
                            this.canvasRef!)
                    });
                }
            });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.width !== this.props.width
            || nextProps.height !== this.props.height
            || nextProps.sticker !== this.props.sticker
            || nextProps.thumb !== this.props.thumb
            || nextState.stickerLoaded !== this.state.stickerLoaded
            || nextState.stickerDataURL !== this.state.stickerDataURL;
    }

    componentWillUnmount() {
        if (this.stickerSubscription) {
            this.stickerSubscription.unsubscribe();
        }
        if (this.state.stickerDataURL) {
            URL.revokeObjectURL(this.state.stickerDataURL);
        }
        this.canvasRef = null;
    }

    render() {
        if (!this.state.stickerLoaded) {
            return (
                <div style={{
                    width: this.props.width,
                    height: this.props.height,
                }}/>
            );
        }

        let element: JSX.Element;
        if (this.state.stickerDataURL) {
            element = <img src={this.state.stickerDataURL}
                           style={{
                               width: this.props.width,
                               maxHeight: this.props.height,
                           }}/>;
        } else {
            element = <canvas ref={ref => this.canvasRef = ref}
                              width={this.props.width}
                              height={this.props.height}
                              style={{
                                  width: this.props.width,
                                  maxHeight: this.props.height,
                              }}/>
        }

        return element;
    }
}