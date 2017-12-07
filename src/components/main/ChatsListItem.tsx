/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { StyleSheet, css } from "aphrodite/no-important";
import { ListItem, Badge } from "material-ui";
import { lightBlack, darkBlack, red500 } from "material-ui/styles/colors";
import { DeviceAccessTime, AlertErrorOutline } from "material-ui/svg-icons";
import * as moment from "moment";
import * as React from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { Chat } from "../../tg/TG";
import { Avatar } from "../misc/Avatar";

interface Props {
    onClick: () => void,
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
    private date: string;

    componentWillMount() {
        this.date = readableDate(this.props.chat.topMessage.date);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.onClick !== this.props.onClick
            || nextProps.selected !== this.props.selected
            || nextProps.chat !== this.props.chat
            || nextProps.typing !== this.props.typing;
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.chat.topMessage.date !== prevProps.chat.topMessage.date) {
            this.date = readableDate(this.props.chat.topMessage.date)
        }
    }

    render() {
        const title = this.props.chat.title;
        let user = undefined;
        if (this.props.chat.kind.kind === "chat" &&
            !this.props.chat.topMessage.action &&
            this.props.chat.topMessage.from instanceof API.User &&
            this.props.chat.topMessage.from.firstName) {
            user = this.props.chat.topMessage.from.firstName.string;
        }
        return (
            <ListItem
                className={css(styles.root, this.props.selected && styles.selected)}
                onClick={this.props.onClick}
                leftAvatar={
                    <div className={css(styles.avatar)}>
                        <Avatar id={this.props.chat.peerId}
                                title={title}
                                photo={this.props.chat.photoSmall}/>
                    </div>
                }
                primaryText={
                    <span className={css(styles.primaryText)}>
                        <span className={css(styles.primaryTextTitle)}
                              style={{
                                  color: this.props.selected && "white",
                              }}>
                        {
                            title
                        }
                        </span>
                        <span className={css(styles.primaryTextDate)}
                              style={{
                                  color: this.props.selected && "white",
                              }}>
                            {
                                this.props.chat.topMessage.id < 0 && !this.props.chat.topMessage.randomId &&
                                <span
                                    className={css(styles.lastMessageFailed)}>
                                    <span className={css(styles.lastMessageFailedIcon)}>
                                        <AlertErrorOutline
                                            style={{
                                                width: 16,
                                                height: 16,
                                                color: red500,
                                            }}/>
                                    </span>
                                </span>
                            }
                            {
                                this.props.chat.topMessage.id < 0 && this.props.chat.topMessage.randomId &&
                                <span className={css(styles.lastMessagePending)}>
                                    <span
                                        className={css(styles.lastMessagePendingIcon)}>
                                        <DeviceAccessTime
                                            style={{
                                                width: 14,
                                                height: 14,
                                                color: this.props.selected ? "white" : lightBlack,
                                            }}/>
                                    </span>
                                </span>
                            }
                            {
                                !isLastMessageRead(this.props.chat) &&
                                <span
                                    className={css(styles.lastMessageNotRead)}
                                    style={{
                                        background: this.props.selected && "white",
                                    }}/>
                            }
                            {
                                this.date
                            }
                        </span>
                    </span>
                }
                secondaryText={
                    <span className={css(styles.secondaryText, this.props.chat.unreadCount > 0 && styles.secondaryTextWithBadge)}
                          style={{
                              color: this.props.selected && "white",
                          }}>
                        {
                            this.props.typing.length > 0 &&
                            typingElement(
                                this.props.chat,
                                this.props.typing
                                    .map(typing => typing.user))
                        }
                        {
                            this.props.typing.length === 0 && user &&
                            <span>
                                <span style={{ color: this.props.selected ? "white" : darkBlack }}>
                                    {
                                        user + ": "
                                    }
                                </span>
                                <span>
                                    {
                                        this.props.chat.topMessage.toString()
                                    }
                                </span>
                            </span>
                        }
                        {
                            this.props.typing.length === 0 && !user &&
                            this.props.chat.topMessage.toString()
                        }
                        {
                            this.props.chat.unreadCount > 0 &&
                            <Badge
                                className={css(styles.secondaryTextBadge)}
                                badgeContent={this.props.chat.unreadCount}
                                style={{
                                    display: undefined,
                                    padding: undefined,
                                }}
                                primary={true}/>
                        }
                    </span>
                }
                secondaryTextLines={2}>
            </ListItem>
        );
    }
}

const isLastMessageRead = (chat: Chat): boolean => {
    return chat.readOutboxMaxId === chat.topMessage.id || !chat.topMessage.out || chat.topMessage.id < 0;
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

const typingAnimation = {
    "0%": {
        opacity: .1,
    },
    "20%": {
        opacity: 1,
    },
    "100%": {
        opacity: .1,
    }
};

const styles = StyleSheet.create({
    root: {
        height: 91,
        overflow: "hidden",
        transition: "background 200ms ease !important",
    },
    selected: {
        background: "rgba(61, 129, 161, 0.67) !important",
    },
    avatar: {
        position: "absolute",
        left: 16,
        top: 16,
    },
    primaryText: {
        display: "inline-flex",
        width: "100%",
        alignItems: "center",
        height: 18,
        lineHeight: "17px",
        overflow: "hidden",
    },
    primaryTextTitle: {
        marginRight: 12,
        fontWeight: 500,
        wordBreak: "break-all",
        alignSelf: "baseline",
    },
    primaryTextDate: {
        marginLeft: "auto",
        fontSize: 12,
        color: lightBlack,
        flexShrink: 0,
    },
    secondaryText: {
        width: "100%",
        wordBreak: "break-word",
        hyphens: "auto",
        color: "rgb(117,117,117)",
    },
    secondaryTextWithBadge: {
        display: "inline-flex !important",
    },
    secondaryTextBadge: {
        width: 24,
        height: 24,
        padding: "0 0 0 32px",
        margin: "auto 0 auto auto",
    },
    lastMessageNotRead: {
        width: 8,
        height: 8,
        background: "rgba(42,174,245,1)",
        display: "inline-flex",
        marginRight: 8,
        borderRadius: "50%",
    },
    lastMessagePending: {
        display: "inline-flex",
        marginRight: 5,
        position: "relative",
        width: 14,
        height: 14,
    },
    lastMessagePendingIcon: {
        position: "absolute",
        paddingTop: 2,
    },
    lastMessageFailed: {
        display: "inline-flex",
        marginRight: 4,
        position: "relative",
        width: 16,
        height: 16,
    },
    lastMessageFailedIcon: {
        position: "absolute",
        paddingTop: 3,
    },
    typing: {
        animationName: typingAnimation,
        animationDuration: "1200ms",
        animationIterationCount: "infinite",
        animationFillMode: "both",
        animationTimingFunction: "steps(16, end)",
    }
});

const typingElement = (chat: Chat, users: Array<API.User>) => {
    return (
        <span style={{ fontStyle: "italic" }}>
            {
                chat.peer instanceof API.PeerUser ?
                    "typing" :
                    `${users.map(user => user.firstName!.string)
                        .join(", ")} typing`
            }
            <span className={css(styles.typing)}>.</span>
            <span className={css(styles.typing)} style={{ animationDelay: "200ms" }}>.</span>
            <span className={css(styles.typing)} style={{ animationDelay: "400ms" }}>.</span>
        </span>
    );
};