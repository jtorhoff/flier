import { CircularProgress } from "material-ui";
import { lightBlack } from "material-ui/styles/colors";
import * as React from "react";
import { CSSProperties } from "react";
import "rxjs/add/operator/timeout";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";

interface Props {
    width: number,
    height: number,
    photo: API.Photo,
}

interface State {
    thumbDataURL?: string,
    photoTotalSize: number,
    photoProgress: number,
    photoDataURL?: string,
}

export class Photo extends React.Component<Props, State> {
    private thumbSubscription?: Subscription;
    private photoSubscription?: Subscription;
    private progressSubscription?: Subscription;

    state: State = {
        photoTotalSize: 100,
        photoProgress: 5,
    };

    static measure(photo: API.Photo, maxWidth: number, maxHeight: number): { width: number, height: number } {
        const thumb = photo.sizes.items
            .find(size => !(size instanceof API.PhotoSizeEmpty)) as
            API.PhotoSize | API.PhotoCachedSize;
        const scale = Math.min(
            maxWidth / thumb.w.value,
            maxHeight / thumb.h.value);

        return {
            width: Math.floor(thumb.w.value * scale),
            height: Math.floor(thumb.h.value * scale),
        };
    }

    componentDidMount() {
        const thumb = this.props.photo.sizes.items
            .find(size => size instanceof API.PhotoCachedSize) as API.PhotoCachedSize | undefined;
        if (thumb) {
            const url = URL.createObjectURL(new Blob([thumb.bytes.bytes]));
            this.setState({
                thumbDataURL: url,
            });
        }

        const size = this.props.photo.sizes.items
            .find((size, index) => {
                if (size instanceof API.PhotoSize) {
                    return (size.w.value >= this.props.width * devicePixelRatio
                        && size.h.value >= this.props.height * devicePixelRatio)
                        || index - 1 === this.props.photo.sizes.items.length;
                }

                return false;
            }) as API.PhotoSize | undefined;

        if (size && size.location instanceof API.FileLocation) {
            this.setState({
                photoTotalSize: size.size.value,
            });

            this.photoSubscription = tg.getFile(size.location)
                .subscribe(blob => {
                    const url = URL.createObjectURL(blob);
                    this.setState({
                        photoDataURL: url,
                    });
                });

            this.progressSubscription = tg.getDownloadProgress(size.location)
                .subscribe(progress => {
                    this.setState({
                        photoProgress: progress,
                    });
                });
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.photo !== this.props.photo
            || nextState.thumbDataURL !== this.state.thumbDataURL
            || nextState.photoDataURL !== this.state.photoDataURL
            || nextState.photoTotalSize !== this.state.photoTotalSize
            || nextState.photoProgress !== this.state.photoProgress;
    }

    componentWillUnmount() {
        if (this.thumbSubscription) {
            this.thumbSubscription.unsubscribe();
        }
        if (this.photoSubscription) {
            this.photoSubscription.unsubscribe();
        }
        if (this.progressSubscription) {
            this.progressSubscription.unsubscribe();
        }
        if (this.state.thumbDataURL) {
            URL.revokeObjectURL(this.state.thumbDataURL);
        }
        if (this.state.photoDataURL) {
            URL.revokeObjectURL(this.state.photoDataURL);
        }
    }

    render() {
        return (
            <div style={{
                ...style,
                width: this.props.width,
                height: this.props.height,
            }}>
                <img width={this.props.width}
                     height={this.props.height}
                     src={this.state.photoDataURL ? this.state.photoDataURL : this.state.thumbDataURL}
                     style={{
                         width: this.props.width,
                         height: this.props.height,
                         filter: this.state.photoDataURL ? "none" : "blur(3px)",
                     }}/>
                <div style={{
                    ...progressStyle,
                    opacity: this.state.photoProgress === this.state.photoTotalSize ? 0 : 1,
                    left: Math.floor((this.props.width || 0) / 2),
                    top: Math.floor((this.props.height || 0) / 2),
                    animationName: this.state.photoDataURL ? "none" : "rotate",
                }}>
                    <CircularProgress
                        mode="determinate"
                        size={40}
                        thickness={3}
                        min={this.state.photoTotalSize / 100 * 5}
                        max={this.state.photoTotalSize}
                        value={this.state.photoProgress}
                        color="white"/>
                </div>
            </div>
        );
    }
}

const style: CSSProperties = {
    overflow: "hidden",
    position: "relative",
    borderRadius: 4,
};

const progressStyle: CSSProperties = {
    width: 44,
    height: 44,
    marginTop: -22,
    marginLeft: -22,
    position: "absolute",
    backgroundColor: lightBlack,
    borderRadius: "50%",
    boxSizing: "border-box",
    padding: 2,

    animationDuration: "1800ms",
    animationIterationCount: "infinite",
    animationFillMode: "both",
    animationTimingFunction: "linear",

    transition: "opacity 500ms ease",
};