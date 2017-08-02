import * as React from "react";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { blobToArrayBuffer } from "../../misc/BlobToArrayBuffer";
import { nativeWebPSupport } from "../../misc/NativeWebPSupport";
import { renderWebpToCanvas } from "../../misc/RenderWebpToCanvas";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";

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
        stickerDataURL: undefined,
    };

    componentDidMount() {
        let file: API.Document | API.FileLocation | undefined;
        if (this.props.thumb) {
            if (this.props.sticker.thumb instanceof API.PhotoSize ||
                this.props.sticker.thumb instanceof API.PhotoCachedSize) {
                const thumb = this.props.sticker.thumb;
                if (thumb.location instanceof API.FileLocation) {
                    file = thumb.location;
                }
            }
        } else {
            file = this.props.sticker;
        }
        if (!file) return;

        this.stickerSubscription = tg.getFile(file)
            .flatMap(blob =>
                nativeWebPSupport.switchMap(nativeWebP => {
                    if (nativeWebP) {
                        return Observable.of(URL.createObjectURL(
                            blob, { oneTimeOnly: true }));
                    } else {
                        return blobToArrayBuffer(blob);
                    }
                }))
            .subscribe(data => {
                if (typeof data === "string") {
                    this.setState({
                        stickerLoaded: true,
                        stickerDataURL: data,
                    });
                } else if (data instanceof ArrayBuffer) {
                    this.setState({
                        stickerLoaded: true,
                    }, () => {
                        renderWebpToCanvas(new Uint8Array(data), this.canvasRef!)
                    });
                }
            });
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
            return (<span/>);
        }

        let element: JSX.Element;
        if (this.state.stickerDataURL) {
            element = <img src={this.state.stickerDataURL}
                           style={{
                               maxWidth: this.props.width,
                               maxHeight: this.props.height,
                           }}/>;
        } else {
            element = <canvas ref={ref => this.canvasRef = ref}
                              width={this.props.width}
                              height={this.props.height}
                              style={{
                                  maxWidth: this.props.width,
                                  maxHeight: this.props.height,
                              }}/>
        }

        return element;
    }
}