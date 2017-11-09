import { StyleSheet, css } from "aphrodite/no-important";
import * as React from "react";
import "rxjs/add/operator/timeout";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { MediaProgress } from "./MediaProgress";

interface Props {
    width: number,
    height: number,
    photo: API.Photo,
}

interface State {
    thumbDataURL?: string,
    photoTotalSize?: number,
    photoProgress?: number,
    photoDataURL?: string,
}

export class Photo extends React.Component<Props, State> {
    private thumbSubscription?: Subscription;
    private photoSubscription?: Subscription;
    private progressSubscription?: Subscription;

    state: State = {};

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
                        || index === this.props.photo.sizes.items.length - 1;
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
        return nextProps.width !== this.props.width
            || nextProps.height !== this.props.height
            || nextProps.photo !== this.props.photo
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
            <div className={css(styles.root)} style={{
                width: this.props.width,
                height: this.props.height,
            }}>
                <img className={css(!this.state.photoDataURL && this.state.thumbDataURL && styles.thumb)}
                     width={this.props.width}
                     height={this.props.height}
                     src={this.state.photoDataURL ? this.state.photoDataURL : this.state.thumbDataURL}/>
                <MediaProgress containerWidth={this.props.width}
                               containerHeight={this.props.height}
                               totalSize={this.state.photoTotalSize}
                               progress={this.state.photoProgress}
                               done={!!this.state.photoDataURL}/>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        overflow: "hidden",
        position: "relative",
        borderRadius: 4,
    },
    thumb: {
        filter: "blur(3px)",
    },
});