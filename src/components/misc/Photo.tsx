import { CircularProgress } from "material-ui";
import { minBlack } from "material-ui/styles/colors";
import * as React from "react";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { CSSProperties } from "react";

interface Props {
    width: number,
    height: number,
    photo: API.Photo,
}

interface State {
    thumbDataURL?: string,
    photoDataURL?: string,
}

export class Photo extends React.Component<Props, State> {
    private thumbSubscription?: Subscription;
    private photoSubscription?: Subscription;

    state: State = {};

    static measure(photo: API.Photo, maxWidth: number, maxHeight: number): { width: number, height: number } {
        const thumb = photo.sizes.items
            .find(size => !(size instanceof API.PhotoSizeEmpty)) as
            API.PhotoSize | API.PhotoCachedSize;
        const scale = Math.min(
            maxWidth / thumb.w.value,
            maxHeight / thumb.h.value);

        return {
            width: thumb.w.value * scale,
            height: thumb.h.value * scale,
        };
    }

    componentDidMount() {
        const thumb = this.props.photo.sizes.items
            .find(size => !(size instanceof API.PhotoSizeEmpty)) as
            API.PhotoSize | API.PhotoCachedSize;

        let observable: Observable<Blob>;
        if (thumb instanceof API.PhotoSize) {
            observable = tg.getFile(thumb.location as API.FileLocation);
        } else if (thumb instanceof API.PhotoCachedSize) {
            observable = Observable.of(new Blob([thumb.bytes.bytes]));
        } else {
            throw new Error();
        }

        this.thumbSubscription = observable
            .map(blob => URL.createObjectURL(blob))
            .subscribe(url => {
                this.setState({
                    thumbDataURL: url,
                });
            });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.photo !== this.props.photo
            || nextState.thumbDataURL !== this.state.thumbDataURL
            || nextState.photoDataURL !== this.state.photoDataURL;
    }

    componentWillUnmount() {
        if (this.thumbSubscription) {
            this.thumbSubscription.unsubscribe();
        }

        if (this.state.thumbDataURL) {
            URL.revokeObjectURL(this.state.thumbDataURL);
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
                     src={this.state.thumbDataURL}
                     style={{
                         ...imgStyle,
                         width: this.props.width,
                         height: this.props.height,
                         filter: this.state.photoDataURL ? "none" : "blur(4px)",
                     }}/>
                <div style={{
                    ...progressStyle,
                    left: Math.floor((this.props.width || 0) / 2),
                    top: Math.floor((this.props.height || 0) / 2),
                }}>
                    <CircularProgress
                        mode="determinate"
                        size={40}
                        thickness={3}
                        value={50}
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

const imgStyle: CSSProperties = {
    display: "block",
    transform: "scale(1.05)",
    transition: "filter 200ms ease",
};

const progressStyle: CSSProperties = {
    width: 42,
    height: 42,
    marginTop: -21,
    marginLeft: -21,
    position: "absolute",
    backgroundColor: minBlack,
    borderRadius: "50%",
    boxSizing: "border-box",
    padding: 1,

    animationName: "rotate",
    animationDuration: "1800ms",
    animationIterationCount: "infinite",
    animationFillMode: "both",
    animationTimingFunction: "linear",
};