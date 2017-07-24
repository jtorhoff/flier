import { ListItem, Badge } from "material-ui";
import { lightBlack } from "material-ui/styles/colors";
import * as moment from "moment";
import * as React from "react";
import { CSSProperties } from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { Chat } from "../../tg/TG";
import { Avatar } from "../misc/Avatar";

interface Props {
    chat: Chat,
    typing: Array<{ readonly user: API.User, readonly action: API.SendMessageActionType }>,
}

interface State {

}

export class ChatsListItem extends React.Component<Props, State> {
    title: string;
    readableDate: string;
    message: string;

    constructor(props: Props) {
        super(props);

        this.title = this.props.chat.title;
        this.readableDate = readableDate(this.props.chat.topMessage.date);
        this.message = this.props.chat.topMessage.toString();
    }

    componentWillReceiveProps(props: Props) {
        this.title = props.chat.title;
        this.readableDate = readableDate(props.chat.topMessage.date);
        this.message = props.chat.topMessage.toString();
    }

    render() {
        return (
            <ListItem
                leftAvatar={
                    <Avatar id={this.props.chat.peerId}
                            title={this.title}
                            photo={this.props.chat.photoSmall}/>
                }
                primaryText={
                    <span style={primaryTextStyle}>
                        <span style={{
                            marginRight: 12,
                            fontWeight: 500,
                            wordBreak: "break-all"
                        }}>
                            {
                                this.title
                            }
                        </span>
                        <span style={primaryTextDateStyle}>
                            { !isLastMessageRead(this.props.chat) &&
                                <span style={{
                                    width: 8,
                                    height: 8,
                                    background: "rgba(42,174,245,1)",
                                    display: "inline-flex",
                                    marginRight: 8,
                                    borderRadius: "50%",
                                }}/>
                            }
                            {
                                this.readableDate
                            }
                        </span>
                    </span>
                }
                secondaryText={
                    <div style={secondaryTextStyle}>
                        <span style={{
                            wordBreak: "break-word",
                            hyphens: "auto",
                            color: "rgb(117,117,117)"
                        }}>
                            {
                                this.props.typing && this.props.typing.length > 0 ? typingElement : this.message
                            }
                        </span>
                        {
                            this.props.chat.unreadCount > 0 &&
                            <Badge style={secondaryTextBadgeStyle}
                                   badgeContent={this.props.chat.unreadCount}
                                   primary={true}/>
                        }
                    </div>
                }
                secondaryTextLines={2}>
            </ListItem>
        );
    }
}

const typingElement = <span
    className="typing"
    style={{ fontStyle: "italic" }}>typing<span>.</span><span>.</span><span>.</span></span>;

const isLastMessageRead = (chat: Chat): boolean => {
    return chat.readOutboxMaxId === chat.topMessage.id || !chat.topMessage.out;
};

const readableDate = (timestamp: number): string => {
    const now = moment();
    const date = moment.unix(timestamp);
    const duration = moment.duration(now.diff(date));

    if (duration.asHours() <= 6 || now.isSame(date, "day")) {
        return date.format("LT");
    } else if (duration.asDays() <= 7) {
        return date.format("ddd");
    } else if (duration.asMonths() <= 3 || now.isSame(date, "year")) {
        return date.format("D MMM");
    } else {
        return date.format("L");
    }
};

const primaryTextStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    alignItems: "baseline",
    height: 18,
    overflow: "hidden",
};

const primaryTextDateStyle: CSSProperties = {
    marginLeft: "auto",
    fontSize: 12,
    color: lightBlack,
    flexShrink: 0,
};

const secondaryTextStyle: CSSProperties = {
    display: "flex",
    width: "100%",
};

const secondaryTextBadgeStyle: CSSProperties = {
    width: 24,
    height: 24,
    padding: "0 0 0 32px",
    margin: "auto 0 auto auto",
};