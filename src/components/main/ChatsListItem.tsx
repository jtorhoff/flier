import { ListItem, Badge } from "material-ui";
import { lightBlack } from "material-ui/styles/colors";
import * as moment from "moment";
import * as React from "react";
import { CSSProperties } from "react";
import { Chat } from "../../tg/TG";
import { Avatar } from "../misc/Avatar";

interface Props {
    chat: Chat,
}

interface State {

}

export class ChatsListItem extends React.Component<Props, State> {
    render() {
        return (
            <ListItem
                leftAvatar={
                    <Avatar id={this.props.chat.peerId}
                            title={this.props.chat.title}
                            photo={this.props.chat.photoSmall}/>
                }
                primaryText={
                    <span style={primaryTextStyle}>
                        <span style={{ marginRight: 12, fontWeight: 500 }}>
                            {
                                this.props.chat.title
                            }
                        </span>
                        <span style={primaryTextDateStyle}>
                            {
                                readableDate(this.props.chat.topMessage.date)
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
                                this.props.chat.topMessage.toString()
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