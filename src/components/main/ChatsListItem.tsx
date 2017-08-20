import { ListItem, Badge } from "material-ui";
import { lightBlack, faintBlack } from "material-ui/styles/colors";
import * as moment from "moment";
import * as React from "react";
import { CSSProperties } from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { Chat } from "../../tg/TG";
import { Avatar } from "../misc/Avatar";

interface Props {
    onSelect: (peer: API.PeerType) => void,
    selected: boolean,
    chat: Chat,
    typing: Array<{
        readonly user: API.User,
        readonly action: API.SendMessageActionType
    }>,
}

interface State {

}

export class ChatsListItem extends React.Component<Props, State> {
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.selected !== this.props.selected
            || nextProps.chat !== this.props.chat
            || nextProps.typing !== this.props.typing;
    }

    render() {
        const title = this.props.chat.title;
        const selectablePrimaryTextTitleStyle = this.props.selected ?
            { ...primaryTextTitleStyle, color: "#fff" } : primaryTextTitleStyle;
        const selectablePrimaryTextDateStyle = this.props.selected ?
            { ...primaryTextDateStyle, color: "#fff" } : primaryTextDateStyle;
        const selectableSecondaryTextStyle = this.props.selected ?
            { ...secondaryTextStyle, color: "#fff" } : secondaryTextStyle;
        const selectableLastMessageNotReadStyle = this.props.selected ?
            { ...lastMessageNotReadStyle, background: "#fff" } : lastMessageNotReadStyle;
        return (
            <div style={{
                background: this.props.selected ? "rgba(61, 129, 161, 0.67)" : "none",
                transition: "background 300ms ease",
            }}>
                <ListItem
                    onTouchTap={() => this.props.onSelect(this.props.chat.peer)}
                    leftAvatar={
                        <div style={{
                            position: "absolute",
                            left: 16,
                            top: 16,
                        }}>
                            <Avatar id={this.props.chat.peerId}
                                    title={title}
                                    photo={this.props.chat.photoSmall}/>
                        </div>
                    }
                    primaryText={
                        <span style={primaryTextStyle}>
                            <span style={selectablePrimaryTextTitleStyle}>{title}</span>
                            <span style={selectablePrimaryTextDateStyle}>
                                {
                                    !isLastMessageRead(this.props.chat) &&
                                    <span style={selectableLastMessageNotReadStyle}/>
                                }
                                {
                                    readableDate(this.props.chat.topMessage.date)
                                }
                            </span>
                        </span>
                    }
                    secondaryText={
                        <span style={selectableSecondaryTextStyle}>
                            {
                                this.props.typing && this.props.typing.length > 0 ?
                                    typingElement(
                                        this.props.chat,
                                        this.props.typing
                                            .map(typing => typing.user)) :
                                    this.props.chat.topMessage.toString()
                            }
                            {
                                this.props.chat.unreadCount > 0 &&
                                <Badge style={secondaryTextBadgeStyle}
                                       badgeContent={this.props.chat.unreadCount}
                                       primary={true}/>
                            }
                        </span>
                    }
                    secondaryTextLines={2}>
                </ListItem>
            </div>
        );
    }
}

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
    display: "inline-flex",
    width: "100%",
    alignItems: "baseline",
    height: 18,
    lineHeight: "17px",
    overflow: "hidden",
};

const primaryTextTitleStyle: CSSProperties = {
    marginRight: 12,
    fontWeight: 500,
    wordBreak: "break-all",
};

const primaryTextDateStyle: CSSProperties = {
    marginLeft: "auto",
    fontSize: 12,
    color: lightBlack,
    flexShrink: 0,
};

const secondaryTextStyle: CSSProperties = {
    display: "inline-flex",
    width: "100%",
    wordBreak: "break-word",
    hyphens: "auto",
    color: "rgb(117,117,117)"
};

const secondaryTextBadgeStyle: CSSProperties = {
    width: 24,
    height: 24,
    padding: "0 0 0 32px",
    margin: "auto 0 auto auto",
};

const lastMessageNotReadStyle: CSSProperties = {
    width: 8,
    height: 8,
    background: "rgba(42,174,245,1)",
    display: "inline-flex",
    marginRight: 8,
    borderRadius: "50%",
};

const typingElement = (chat: Chat, users: Array<API.User>) => {
    return (
        <span
            className="typing"
            style={{ fontStyle: "italic" }}>
            {
                chat.peer instanceof API.PeerUser ?
                    "typing" :
                    `${users.map(user => user.firstName!.string)
                        .join(", ")} typing`
            }
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </span>
    );
};