import { StyleSheet, css } from "aphrodite/no-important";
import { darkWhite, lightBlack, darkBlack } from "material-ui/styles/colors";
import * as moment from "moment";
import * as React from "react";
import { Subscription } from "rxjs/Subscription";
import { readableFileSize } from "../../misc/ReadableFileSize";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";

interface Props {
    width: number,
    height: number,
    document: API.Document,
}

interface State {
    thumbDataURL?: string,
}

export class Video extends React.Component<Props, State> {
    private thumbSubscription?: Subscription;
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
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.width !== this.props.width
            || nextProps.height !== this.props.height
            || nextProps.document !== this.props.document
            || nextState.thumbDataURL !== this.state.thumbDataURL;
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
        const videoAttr = this.props.document.attributes.items
            .find(attr => attr instanceof API.DocumentAttributeVideo) as
            API.DocumentAttributeVideo;
        const duration = moment.utc(videoAttr.duration.value * 1000)
            .format("m:ss");
        const round = videoAttr.roundMessage;

        return (
            <div className={css(round ? styles.rootRound : styles.root)}
                 style={{
                     width: this.props.width,
                     height: this.props.height,
                 }}>
                <img className={css(this.state.thumbDataURL && styles.thumb)}
                     width={this.props.width}
                     height={this.props.height}
                     src={this.state.thumbDataURL}/>
                {
                    !round &&
                    <div className={css(styles.meta)}>
                        {
                            `${duration}, ${readableFileSize(this.props.document.size.value)}`
                        }
                    </div>
                }
                {
                    round &&
                    <div className={css(styles.metaRound)}>
                        {
                            duration
                        }
                    </div>
                }
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
    rootRound: {
        overflow: "hidden",
        position: "static",
        borderRadius: "50%",
    },
    thumb: {
        filter: "blur(3px)",
    },
    meta: {
        position: "absolute",
        top: 0,
        left: 0,
        background: lightBlack,
        color: darkWhite,
        fontSize: 12,
        padding: "2px 5px",
        margin: "5px 7px",
        borderRadius: 12,
        fontWeight: "lighter",
    },
    metaRound: {
        position: "absolute",
        bottom: 0,
        margin: 10,
        color: lightBlack,
        fontSize: 14,
    }
});