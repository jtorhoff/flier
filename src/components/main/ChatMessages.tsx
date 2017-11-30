import { StyleSheet, css } from "aphrodite/no-important";
import { List } from "immutable";
import { spacing } from "material-ui/styles";
import { fullBlack, lightBlack } from "material-ui/styles/colors";
import * as moment from "moment";
import * as React from "react";
import { AutoSizer } from "react-virtualized";
import { Subscription } from "rxjs/Subscription";
import { buffersEqual } from "../../misc/CompareArrayBuffer";
import { measureMedia } from "../../misc/MediaMeasurer";
import { measureText } from "../../misc/TextMeasurer";
import { API } from "../../tg/Codegen/API/APISchema";
import { MessageType, MessageActionTypes } from "../../tg/Convenience/Message";
import { Message, Chat } from "../../tg/TG";
import { Update } from "../../tg/Updates/Update";
import { tg, muiTheme } from "../App";
import { Photo } from "../misc/Photo";
import { ReverseList, ListRowProps } from "../misc/ReverseList";
import { ChatMessagesItem } from "./ChatMessagesItem";
import { ChatAddedUsersMessage } from "./ChatMessagesTypes/actions/ChatAddedUsersMessage";
import { ChatDeleteUserMessage } from "./ChatMessagesTypes/Actions/ChatDeleteUserMessage";
import { gameMessagePreviewMaxSize } from "./ChatMessagesTypes/GameMessage";
import { gifMessageMaxSize } from "./ChatMessagesTypes/GifMessage";
import { photoMessageMaxSize } from "./ChatMessagesTypes/PhotoMessage";

interface Props {
    chat: Chat,
}

interface State {
    messages: List<Message | PseudoMessage>,
    scrollToBottom: boolean,
}

export class ChatMessages extends React.Component<Props, State> {
    private loadingMessages = false;
    private allMessagesLoaded = false;
    private messagesSubscription: Subscription;
    private listRef?: ReverseList;
    private updatesSubscription: Subscription;

    state: State = {
        messages: List(),
        scrollToBottom: true,
    };

    loadMessages(clearList: boolean, recomputeHeights?: boolean) {
        if (this.loadingMessages || this.allMessagesLoaded) {
            return;
        }

        let offsetId = undefined;
        let offsetDate = undefined;
        if (!clearList) {
            const offsetMsg = this.state.messages
                .filter(msg => !!msg && msg.type !== "pseudo")
                .last() as Message | undefined;
            offsetId = offsetMsg && offsetMsg.id;
            offsetDate = offsetMsg && offsetMsg.date;
        }

        this.loadingMessages = true;
        this.messagesSubscription = tg.getMessageHistory(this.props.chat, 20, offsetId, offsetDate)
            .subscribe({
                next: messages => {
                    if (messages.length === 0) {
                        this.allMessagesLoaded = true;
                    } else {
                        let msgs: List<Message | PseudoMessage>;
                        if (clearList) {
                            msgs = populatePseudoMessages(messages);
                        } else {
                            msgs = populatePseudoMessages(
                                (this.state.messages
                                        .filter(msg =>
                                            !!msg && msg.type !== "pseudo")
                                        .toArray() as Array<Message>
                                ).concat(messages)
                            );
                        }

                        this.setState({
                            scrollToBottom: clearList,
                            messages: msgs,
                        }, () => {
                            this.setState({
                                scrollToBottom: false,
                            });

                            if (recomputeHeights) {
                                this.listRef!.recomputeRowHeights();
                            }
                        });
                    }
                },
                complete: () => {
                    this.loadingMessages = false;
                }
            });
    }

    handleUpdate(update: Update) {
        switch (update.constructor) {
            case Update.NewMessage: {
                const message = (update as Update.NewMessage).message;
                if (this.props.chat.peerEquals(message.peer)) {
                    this.setState(state => {
                        return {
                            messages: state.messages.insert(0, message),
                        }
                    });
                }
            } break;

            case Update.DeleteMessages: {
                // noinspection UnnecessaryLocalVariableJS
                const deletedMessages = (update as Update.DeleteMessages).messages;
                deletedMessages.forEach((peer, msgIds) => {
                    if (this.props.chat.peerEquals(peer.peer)) {
                        this.setState(state => {
                            return {
                                messages: state.messages.filter(msg => {
                                    return (!!msg && msg.type === "pseudo")
                                        || (!!msg && msgIds.indexOf(msg.id) === -1)
                                })
                            }
                        })
                    }
                });
            } break;

            case Update.EditMessage: {
                const message = (update as Update.EditMessage).message;
                if (this.props.chat.peerEquals(message.peer)) {
                    this.setState(state => {
                        const index = state.messages.findIndex(msg =>
                            !!msg && msg.type !== "pseudo" &&
                            (msg.id === message.id || buffersEqual(msg.randomId, message.randomId)));
                        return {
                            messages: state.messages.set(index, message),
                        }
                    })
                }
            } break;
        }
    }

    componentDidMount() {
        this.loadMessages(true);
        this.updatesSubscription = tg.updates
            .subscribe(update => this.handleUpdate(update));
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.chat !== this.props.chat
            || !nextState.messages.equals(this.state.messages)
            || nextState.scrollToBottom !== this.state.scrollToBottom;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!this.props.chat.peerEquals(prevProps.chat.peer)) {
            if (this.messagesSubscription) {
                this.messagesSubscription.unsubscribe();
            }

            this.allMessagesLoaded = false;
            this.loadingMessages = false;

            this.loadMessages(true, true);
        }
    }

    componentWillUnmount() {
        this.messagesSubscription.unsubscribe();
        this.updatesSubscription.unsubscribe();
    }

    rowHeight(index: number, containerWidth: number): number {
        const msg = this.state.messages.get(index);
        let height = 0;
        if (msg.type === MessageType.Text) {
            const metaWidth = measureText(
                moment(msg.date).format("LT"),
                {
                    fontSize: "12px",
                    fontFamily: muiTheme.fontFamily,
                }).width;

            const size = measureText(msg.message!, {
                width: (containerWidth - 20 - 16 - 40 - 12 - 32 - metaWidth) + "px",
                maxWidth: "60ch",
                display: "inline-block",
                wordBreak: "break-word",
                hyphens: "auto",
                whiteSpace: "pre-wrap",
                fontSize: "14px",
                fontFamily: muiTheme.fontFamily,
                lineHeight: "16px",
            });

            height = size.height;
        } else if (msg.type === MessageType.Photo) {
            if ((msg.media as API.MessageMediaPhoto).photo instanceof API.Photo) {
                height = measureMedia(
                    photoMessageMaxSize,
                    photoMessageMaxSize,
                    ...((msg.media as API.MessageMediaPhoto).photo as API.Photo).sizes.items)
                    .height;
            }
        } else if (msg.type === MessageType.Sticker) {
            height = 170;
        } else if (msg.type === MessageType.Location) {
            height = 144;
        } else if (msg.type === MessageType.Venue) {
            height = 96;
        } else if (msg.type === MessageType.Contact) {
            height = 48;
        } else if (msg.type === MessageType.GIF) {
            height = measureMedia(
                gifMessageMaxSize,
                gifMessageMaxSize,
                ((msg.media as API.MessageMediaDocument).document as API.Document).thumb).height;
        } else if (msg.type === MessageType.Video) {
            height = measureMedia(
                gifMessageMaxSize,
                gifMessageMaxSize,
                ((msg.media as API.MessageMediaDocument).document as API.Document).thumb).height;
        } else if (msg.type === MessageType.Voice) {
            height = 48;
        } else if (msg.type === MessageType.Document) {
            height = 48;
        } else if (msg.type === MessageType.Game) {
            const game = (msg.media as API.MessageMediaGame).game;
            if (game.document instanceof API.Document) {
                height = measureMedia(
                    gameMessagePreviewMaxSize,
                    gameMessagePreviewMaxSize,
                    game.document.thumb).height + 18 + 4;
            } else if (game.photo instanceof API.Photo) {
                height = measureMedia(
                    gameMessagePreviewMaxSize,
                    gameMessagePreviewMaxSize,
                    ...game.photo.sizes.items).height + 18 + 4;
            }
        } else if (msg.type === MessageType.ChatEditPhoto) {
            height = 68;
        } else if (msg.type === MessageType.Call) {
            height = 48;
        }

        if (this.isCompactMessage(msg, index)) {
            height += 12;
        } else {
            height = Math.max(height + 28, 48);
        }

        // Top message's (first from the bottom in the list)
        // height is greater to mimic padding
        if (index === 0) {
            height += spacing.desktopGutterLess!;
        }

        return height;
    }

    renderRow(params: ListRowProps): React.ReactNode {
        const msg = this.state.messages.get(params.index);
        const compact = this.isCompactMessage(msg, params.index);

        let element: ChatMessagesItem | JSX.Element;
        if (msg.type === "pseudo") {
            const date = moment.unix(msg.date);
            const now = new Date();
            let readable: string;
            if (date.isSame(now, "day")) {
                readable = "Today";
            } else if (date.isSame(now, "year")) {
                readable = date.format("Do MMMM");
            } else {
                readable = date.format("L");
            }
            element = (
                <div className={css(styles.pseudoMessage)}>
                    {
                        readable
                    }
                </div>
            );
        } else if (MessageActionTypes.indexOf(msg.type) !== -1) {
            let content: JSX.Element | string | undefined = undefined;
            if (msg.type === MessageType.ChatCreate) {
                const action = msg.action as API.MessageActionChatCreate;
                const from = msg.from as API.User;
                content = `${from.firstName!.string} created the group "${action.title.string}"`;
            } else if (msg.type === MessageType.ChatEditTitle) {
                const action = msg.action as API.MessageActionChatEditTitle;
                if (msg.from instanceof API.User) {
                    content = `${msg.from.firstName!.string} changed the group name to ${action.title.string}`;
                } else {
                    content = `Channel name changed to ${action.title.string}`;
                }
            } else if (msg.type === MessageType.ChatEditPhoto) {
                const action = msg.action as API.MessageActionChatEditPhoto;
                let text: string;
                if (msg.from instanceof API.User) {
                    text = `${msg.from.firstName!.string} changed the group picture`;
                } else {
                    text = "Channel picture has been changed";
                }

                content = (
                    <div className={css(styles.actionMessageChatPictureChange)}>
                        <span className={css(styles.actionMessageChatPictureChangeText)}>
                            {
                                text
                            }
                        </span>
                        {
                            action.photo instanceof API.Photo &&
                            <Photo width={60}
                                   height={60}
                                   photo={action.photo}
                                   round={true}
                                   withProgress={false}/>
                        }
                    </div>
                );
            } else if (msg.type === MessageType.ChatDeletePhoto) {
                if (msg.from instanceof API.User) {
                    content = `${msg.from.firstName!.string} removed the group picture`;
                } else {
                    content = "Channel picture has been removed";
                }
            } else if (msg.type === MessageType.ChatAddUser) {
                const action = msg.action as API.MessageActionChatAddUser;
                const from = msg.from as API.User;
                content = <ChatAddedUsersMessage
                    from={from}
                    userIds={action.users.items.map(userId => userId.value)}/>;
            } else if (msg.type === MessageType.ChatDeleteUser) {
                const action = msg.action as API.MessageActionChatDeleteUser;
                const from = msg.from as API.User;
                content = <ChatDeleteUserMessage
                    from={from}
                    userId={action.userId.value}/>;
            } else if (msg.type === MessageType.ChatJoinedByLink) {
                if (msg.from instanceof API.User) {
                    content = `${msg.from.firstName!.string} joined the group via invitation link`;
                }
            } else if (msg.type === MessageType.ChannelCreate) {
                const action = msg.action as API.MessageActionChannelCreate;
                content = `Channel "${action.title.string}" has been created`;
            } else if (msg.type === MessageType.ChatMigrateTo) {
                // TODO link to channel
                content = "This group has been upgraded to a channel";
            } else if (msg.type === MessageType.ChannelMigrateFrom) {
                // TODO
            } else if (msg.type === MessageType.PinMessage) {
                // TODO
            } else if (msg.type === MessageType.HistoryClear) {
                content = "Chat history has been cleared";
            } else if (msg.type === MessageType.GameScore) {
                const action = msg.action as API.MessageActionGameScore;
                if (msg.from instanceof API.User) {
                    // TODO add game name
                    content = `${msg.from.firstName!.string} has achieved ${action.score.value} in a game`;
                }
            }

            element = (
                <div className={css(styles.actionMessage)}>
                    {
                        content
                    }
                </div>
            );
        } else {
            element = (
                <ChatMessagesItem
                    chat={this.props.chat}
                    message={msg}
                    compact={compact}/>
            );
        }

        const key = ((msg as Message).id || -msg.date) + "-" + this.props.chat.peerId + "-" + msg.date;
        return (
            <div key={key} style={params.style}>
                {
                    element
                }
            </div>
        );
    }

    isCompactMessage(msg: Message | PseudoMessage, index: number): boolean {
        if (msg.type === "pseudo" || MessageActionTypes.indexOf(msg.type) !== -1) {
            return false;
        }
        // Show message as compact, i.e. without the avatar and user name,
        // if the previous message is from the same user and no more than
        // 10 minutes have passed.
        const compactThreshold = 60 * 10;
        let compact = false;
        if (index < this.state.messages.size - 1) {
            const prevMsg = this.state.messages.get(index + 1);
            if (prevMsg.type === "pseudo" || MessageActionTypes.indexOf(prevMsg.type) !== -1) {
                return false;
            }
            if (prevMsg.date + compactThreshold >= msg.date) {
                if (this.props.chat.kind.kind === "channel") {
                    compact = true;
                } else if (msg.from instanceof API.User &&
                    prevMsg.from instanceof API.User) {
                    if (msg.from.id.equals(prevMsg.from.id)) {
                        compact = true;
                    }
                }
            }
        }

        return compact;
    }

    render() {
        return (
            <div className={css(styles.root)}>
                <AutoSizer>
                    {({ width, height }) => (
                        <ReverseList
                            ref={ref => this.listRef = ref!}
                            width={width}
                            height={height}
                            rowCount={this.state.messages.size}
                            rowHeight={index => this.rowHeight(index, width)}
                            rowRenderer={params => this.renderRow(params)}
                            scrollToBottom={this.state.scrollToBottom}
                            dataHash={this.state.messages.hashCode()}
                            loadMoreRows={() => this.loadMessages(false)}/>
                    )}
                </AutoSizer>
            </div>
        );
    }
}

type PseudoMessage = { date: number, type: "pseudo" };

const populatePseudoMessages = (messages: Array<Message>) => {
    const msgs: Array<Message | PseudoMessage> = [];
    let currentDay = Math.floor(
        messages[0].date / 60 / 60 / 24);
    for (let msg of messages) {
        const msgDay = Math.floor(msg.date / 60 / 60 / 24);
        if (msgDay !== currentDay) {
            msgs.push({
                date: currentDay * 60 * 60 * 24,
                type: "pseudo",
            });
        }
        msgs.push(msg);
        currentDay = msgDay;
    }
    msgs.push({
        date: currentDay * 60 * 60 * 24,
        type: "pseudo",
    });

    return List(msgs).toList();
};

const styles = StyleSheet.create({
    root: {
        flexGrow: 1
    },
    pseudoMessage: {
        lineHeight: "48px",
        fontSize: 14,
        fontWeight: 500,
        color: fullBlack,
        textAlign: "center",
    },
    actionMessage: {
        lineHeight: "48px",
        fontSize: 14,
        color: lightBlack,
        textAlign: "center",
    },
    actionMessageChatPictureChange: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 6,
    },
    actionMessageChatPictureChangeText: {
        lineHeight: "18px",
        marginBottom: 6,
    }
});