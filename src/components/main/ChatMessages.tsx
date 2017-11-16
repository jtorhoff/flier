import { StyleSheet, css } from "aphrodite/no-important";
import { List } from "immutable";
import { spacing } from "material-ui/styles";
import { fullBlack } from "material-ui/styles/colors";
import * as moment from "moment";
import * as React from "react";
import { AutoSizer } from "react-virtualized";
import { Subscription } from "rxjs/Subscription";
import { measureMedia } from "../../misc/MediaMeasurer";
import { measureText } from "../../misc/TextMeasurer";
import { API } from "../../tg/Codegen/API/APISchema";
import { MessageType } from "../../tg/Convenience/Message";
import { Message, Chat } from "../../tg/TG";
import { tg, muiTheme } from "../App";
import { ReverseList, ListRowProps } from "../misc/ReverseList";
import { ChatMessagesItem } from "./ChatMessagesItem";
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

    state: State = {
        messages: List(),
        scrollToBottom: true,
    };

    loadMessages(clearList: boolean, recomputeHeights?: boolean) {
        if (this.loadingMessages || this.allMessagesLoaded) {
            return;
        }

        let offsetId = undefined;
        if (!clearList) {
            const offsetMsg = this.state.messages
                .filter(msg => !!msg && msg.type !== "pseudo")
                .last();
            offsetId = offsetMsg && offsetMsg.type !== "pseudo" ? offsetMsg.id : undefined;
        }

        this.loadingMessages = true;
        this.messagesSubscription = tg.getMessageHistory(this.props.chat, 20, offsetId)
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

    componentDidMount() {
        this.loadMessages(true);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.chat !== this.props.chat
            || !nextState.messages.equals(this.state.messages)
            || nextState.scrollToBottom !== this.state.scrollToBottom;
    }

    componentDidUpdate(prevProps: Props) {
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
                <div style={{
                         lineHeight: "48px",
                         fontSize: 14,
                         fontWeight: 500,
                         color: fullBlack,
                         textAlign: "center",
                     }}>
                    {
                        readable
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

        const key = ((msg as Message).id || -msg.date) + "-" + this.props.chat.peerId;
        return (
            <div key={key} style={params.style}>
                {
                    element
                }
            </div>
        );
    }

    isCompactMessage(msg: Message | PseudoMessage, index: number): boolean {
        if (msg.type === "pseudo") {
            return false;
        }
        // Show message as compact, i.e. without the avatar and user name,
        // if the previous message is from the same user and no more than
        // 10 minutes have passed.
        const compactThreshold = 60 * 10;
        let compact = false;
        if (index < this.state.messages.size - 1) {
            const prevMsg = this.state.messages.get(index + 1);
            if (prevMsg.type === "pseudo") {
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
});