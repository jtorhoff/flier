import { darkWhite, lightBlack } from "material-ui/styles/colors";
import * as moment from "moment";
import * as React from "react";
import { CSSProperties } from "react";
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
                         width: this.props.width,
                         height: this.props.height,
                         filter: "blur(3px)",
                     }}/>
                <div style={{
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
                }}>
                    {
                        `${duration}, ${readableFileSize(this.props.document.size.value)}`
                    }
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