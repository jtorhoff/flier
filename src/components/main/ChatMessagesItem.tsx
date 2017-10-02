import * as moment from "moment";
import * as React from "react";
import { CSSProperties } from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { Message, Chat } from "../../tg/TG";
import { TLString } from "../../tg/TL/Types/TLString";
import { Avatar } from "../misc/Avatar";
import { textMessage } from "./ChatMessagesTypes/TextMessage";
import { photoMessage } from "./ChatMessagesTypes/PhotoMessage";

interface Props {
    chat: Chat,
    message: Message,
    compact: boolean,
    onLoad: () => void,
}

interface State {

}

export class ChatMessagesItem extends React.Component<Props, State> {
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.chat !== this.props.chat
            || nextProps.message !== this.props.message
            || nextProps.compact !== this.props.compact;
    }

    componentDidUpdate() {
        this.props.onLoad();
    }

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let id = 0;
        let title;
        let photo: API.FileLocation | undefined = undefined;
        if (this.props.message.from instanceof API.User) {
            const user = this.props.message.from;
            const firstName = user.firstName || TLString.empty;
            const lastName = user.lastName || TLString.empty;
            id = user.id.value;
            title = [firstName.string, lastName.string]
                .join(" ")
                .trim();

            if (user.photo instanceof API.UserProfilePhoto &&
                user.photo.photoSmall instanceof API.FileLocation) {
                photo = user.photo.photoSmall;
            }
        } else if (this.props.message.peer instanceof API.PeerChannel) {
            title = this.props.chat.title;
            photo = this.props.chat.photoSmall;
        }

        if (!title || title === "") {
            title = "Not Available";
        }

        let content: JSX.Element | string | undefined = undefined;
        if (this.props.message.message) {
            content = textMessage(this.props.message.message);
        } else if (this.props.message.media instanceof API.MessageMediaPhoto) {
            content = photoMessage(this.props.message.media);
        }

        return (
            <div style={{
                display: "flex",
                padding: this.props.compact ? "6px 20px 6px 16px" : "4px 20px 4px 16px",
            }}>
                <div style={avatarRowStyle}>
                    {
                        !this.props.compact &&
                        <Avatar id={id}
                                title={title}
                                photo={photo}/>
                    }
                </div>
                <div style={contentRowStyle}>
                    {
                        !this.props.compact &&
                            <div style={titleStyle}>
                                {
                                 title
                                }
                            </div>
                    }
                    <div style={{
                        ...contentStyle,
                        marginTop: this.props.compact ? undefined : 4
                    }}>
                        {
                            content
                        }
                    </div>
                </div>
                <div style={{
                    ...metaRowStyle,
                    alignSelf: this.props.compact ? "center" : "baseline",
                }}>
                    <span
                        title={moment.unix(this.props.message.date).format("L, LTS")}>
                        {
                            moment.unix(this.props.message.date).format("LT")
                        }
                    </span>
                </div>
            </div>
        );
    }
}

const avatarRowStyle: CSSProperties = {
    width: 40,
    flexGrow: 0,
    flexShrink: 0,
};

const contentRowStyle: CSSProperties = {
    marginLeft: 12,
    marginRight: 32,
    flexGrow: 1,
    alignSelf: "baseline",
};

const metaRowStyle: CSSProperties = {
    fontSize: 12,
    color: "rgba(0,0,0,0.44)",
    flexGrow: 0,
    flexShrink: 0,
};

const titleStyle: CSSProperties = {
    width: "100%",
    height: 16,
    fontSize: 14,
    lineHeight: "16px",
    fontWeight: 500,
    alignSelf: "baseline",
    wordBreak: "break-all",
    overflow: "hidden",
    color: "rgba(61, 129, 161, 1)",
};

const contentStyle: CSSProperties = {
    width: "100%",
    fontSize: 14,
};