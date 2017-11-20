import { StyleSheet, css } from "aphrodite/no-important";
import * as React from "react";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { MediaProgress } from "./MediaProgress";

interface Props {
    width: number,
    height: number,
    document: API.Document,
}

interface State {
    thumbDataURL?: string,
    gifProgress?: number,
    gifDataURL?: string,
}

export class GIF extends React.Component<Props, State> {
    private thumbSubscription?: Subscription;
    private gifSubscription?: Subscription;
    private progressSubscription?: Subscription;

    state: State = {};

    componentDidMount() {
        const thumb = this.props.document.thumb;
        if (thumb instanceof API.PhotoCachedSize) {
            const url = URL.createObjectURL(new Blob([thumb.bytes.bytes]));
            this.setState({
                thumbDataURL: url,
            });
        } else if (thumb instanceof API.PhotoSize && thumb.location instanceof API.FileLocation) {
            this.thumbSubscription = tg.getFile(thumb.location)
                .subscribe(blob => {
                    const url = URL.createObjectURL(blob);
                    this.setState({
                        thumbDataURL: url,
                    });
                })
        }

        this.gifSubscription = tg.getFile(this.props.document)
            .subscribe(blob => {
                const url = URL.createObjectURL(new Blob([blob], { type: this.props.document.mimeType.string }));
                this.setState({
                    gifDataURL: url,
                });
            });

        this.progressSubscription = tg.getDownloadProgress(this.props.document)
            .subscribe(progress => {
                this.setState({
                    gifProgress: progress,
                });
            });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.width !== this.props.width
            || nextProps.height !== this.props.height
            || nextProps.document !== this.props.document
            || nextState.thumbDataURL !== this.state.thumbDataURL
            || nextState.gifProgress !== this.state.gifProgress
            || nextState.gifDataURL !== this.state.gifDataURL;
    }

    componentWillUnmount() {
        if (this.thumbSubscription) {
            this.thumbSubscription.unsubscribe();
        }
        if (this.gifSubscription) {
            this.gifSubscription.unsubscribe();
        }
        if (this.progressSubscription) {
            this.progressSubscription.unsubscribe();
        }
        if (this.state.thumbDataURL) {
            URL.revokeObjectURL(this.state.thumbDataURL);
        }
        if (this.state.gifDataURL) {
            URL.revokeObjectURL(this.state.gifDataURL);
        }
    }

    render() {
        return (
            <div className={css(styles.root)} style={{
                width: this.props.width,
                height: this.props.height,
            }}>
                {
                    <img className={css(this.state.thumbDataURL && !this.state.gifDataURL && styles.thumb)}
                         width={this.props.width}
                         height={this.props.height}
                         src={this.state.thumbDataURL}/>
                }
                {
                    this.state.gifDataURL &&
                    <video className={css(styles.video)}
                           src={this.state.gifDataURL}
                           width={this.props.width}
                           height={this.props.height}
                           style={{
                               width: this.props.width,
                               height: this.props.height,
                           }}
                           loop={true}
                           autoPlay={true}
                           playsInline={true}
                           controls={false}
                           poster={this.state.thumbDataURL}/>
                }
                <MediaProgress containerWidth={this.props.width}
                               containerHeight={this.props.height}
                               totalSize={this.props.document.size.value}
                               progress={this.state.gifProgress}
                               done={!!this.state.gifDataURL}/>
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
    video: {
        position: "absolute",
        left: 0,
        top: 0,
        borderRadius: 4,
    }
});