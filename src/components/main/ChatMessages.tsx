import { List } from "immutable";
import * as React from "react";
import { CSSProperties } from "react";
import {
    List as VirtualizedList,
    InfiniteLoader,
    AutoSizer,
    ListRowProps,
    IndexRange,
    CellMeasurerCache,
    CellMeasurer
} from "react-virtualized";
import { Subscription } from "rxjs/Subscription";
import { Message, Chat } from "../../tg/TG";
import { tg, muiTheme } from "../App";
import { ChatMessagesItem } from "./ChatMessagesItem";
import { spacing } from "material-ui/styles";
import { API } from "../../tg/Codegen/API/APISchema";
import { photoMessageMaxSize } from "./ChatMessagesTypes/PhotoMessage";
import { measureText } from "../../misc/TextMeasurer";
import { Photo } from "../misc/Photo";

interface Props {
    chat: Chat,
}

interface State {
    messages: List<Message>,
    innerScrollContainerHeight: number,
    scrollToIndex?: number,
}

export class ChatMessages extends React.Component<Props, State> {
    private loadingMessages = false;
    private allMessagesLoaded = false;
    private messagesSubscription: Subscription;

    private cellMeasurerCache = new CellMeasurerCache({
        fixedWidth: true,
    });

    state: State = {
        messages: List(),
        innerScrollContainerHeight: 0,
    };

    loadMessages() {
        this.loadingMessages = true;
        this.messagesSubscription = tg.getMessageHistory(this.props.chat, 100)
            .subscribe({
                next: messages => {
                    console.log(messages);

                    if (messages.length === 0) {
                        this.allMessagesLoaded = true;
                    } else {
                        this.setState({
                            messages: List(messages)
                                .reverse()
                                .toList(),
                            scrollToIndex: messages.length - 1,
                        });
                    }
                },
                complete: () => {
                    this.loadingMessages = false;
                }
            });
    }

    componentDidMount() {
        // console.log(this.props.chat);
        this.loadMessages();
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.chat !== this.props.chat
            || !nextState.messages.equals(this.state.messages)
            || nextState.innerScrollContainerHeight !== this.state.innerScrollContainerHeight
            || nextState.scrollToIndex !== this.state.scrollToIndex;
    }

    componentDidUpdate(prevProps: Props) {
        if (!this.props.chat.peerEquals(prevProps.chat.peer)) {
            this.loadMessages();
            // this.setState(state => {
            //     return {
            //         messages: state.messages.clear(),
            //     }
            // }, () => {
            //     this.loadMessages();
            // });
        }
    }

    componentWillUnmount() {
        this.messagesSubscription.unsubscribe();
    }

    isRowLoaded(params: { index: number }): boolean {
        return true;
        // return this.allMessagesLoaded || params.index < this.state.messages.size;
    }

    loadMoreRows(params: IndexRange): Promise<any> {
        // if (this.loadingMessages) return Promise.resolve();
        //
        // this.loadingMessages = true;
        // this.messagesSubscription = tg.getMessageHistory(this.props.chat.peer, 10)
        //     .subscribe({
        //         next: messages => {
        //             console.log("!!", messages);
        //         },
        //         complete: () => {
        //             this.loadingMessages = false;
        //         }
        //     });
        //
        // this.loadingChats = true;
        // tg.getChats(30, this.state.chats.get(params.startIndex - 1))
        //     .subscribe(chats => {
        //             if (chats.length === 0) {
        //                 this.allChatsLoaded = true;
        //             } else {
        //                 this.setState({
        //                     chats: this.state.chats.concat(chats).toList(),
        //                 });
        //             }
        //         },
        //         error => {
        //
        //         },
        //         () => {
        //             this.loadingChats = false;
        //         });

        return Promise.resolve();
    }

    rowHeight(params: { index: number }, containerWidth: number): number {
        let height = 0;
        if (!this.cellMeasurerCache.has(params.index, 0)) {
            const msg = this.state.messages.get(params.index);
            if (msg.message) {
                const size = measureText(msg.message, {
                    width: containerWidth - 150,
                    wordBreak: "break-word",
                    hyphens: "auto",
                    whiteSpace: "pre-wrap",
                    fontSize: "14px",
                    fontFamily: muiTheme.fontFamily,
                });
                height = size.height;
            } else if (msg.media instanceof API.MessageMediaPhoto
                && msg.media.photo instanceof API.Photo) {
                height = Photo.measure(
                    msg.media.photo,
                    photoMessageMaxSize,
                    photoMessageMaxSize).height;
            }

            if (this.isCompactMessage(msg, params.index)) {
                height += 12;
            } else {
                height = Math.max(height + 28, 48);
            }
        } else {
            height = this.cellMeasurerCache.rowHeight(params)!;
        }

        // Top message's (first from the bottom in the list)
        // height is greater to mimic padding
        if (params.index === this.state.messages.size - 1) {
            height += spacing.desktopGutterLess!;
        }

        return height;
    }

    rowCount(): number {
        return this.allMessagesLoaded ?
            this.state.messages.size :
            this.state.messages.size + 1;
    }

    renderRow(params: ListRowProps): React.ReactNode {
        const msg = this.state.messages.get(params.index);
        const compact = this.isCompactMessage(msg, params.index);

        return (
            <CellMeasurer cache={this.cellMeasurerCache}
                          columnIndex={0}
                          key={params.key}
                          rowIndex={params.index}
                          parent={params.parent as any}>
                {({ measure }) => (
                    <div style={params.style}>
                        <ChatMessagesItem
                            chat={this.props.chat}
                            message={msg}
                            compact={compact}
                            onLoad={measure}/>
                    </div>
                )}
            </CellMeasurer>
        );
    }

    isCompactMessage(msg: Message, index: number): boolean {
        // Show message as compact, i.e. without the avatar and user name,
        // if the previous message is from the same user and no more than
        // 10 minutes have passed.
        const compactThreshold = 60 * 10;
        let compact = false;
        if (index > 0) {
            const prevMsg = this.state.messages.get(index - 1);
            if (prevMsg.date + compactThreshold >= msg.date) {
                if (msg.from instanceof API.User && prevMsg.from instanceof API.User) {
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
            <div style={style}>
                <style type="text/css">{rotationStyle}</style>
                <InfiniteLoader
                    isRowLoaded={params => this.isRowLoaded(params)}
                    loadMoreRows={params => this.loadMoreRows(params)}
                    rowCount={this.rowCount()}>
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer onResize={() => this.cellMeasurerCache.clearAll()}>
                            {({ width, height }) => (
                                <VirtualizedList
                                    key={this.state.innerScrollContainerHeight}
                                    ref={registerChild}
                                    width={width}
                                    height={height}
                                    estimatedRowSize={48}
                                    rowHeight={params => this.rowHeight(params, width)}
                                    overscanRowCount={3}
                                    rowCount={this.state.messages.size}
                                    rowRenderer={params => this.renderRow(params)}
                                    onRowsRendered={info => {
                                        // if (info.startIndex === 0 &&
                                        //     info.stopIndex === this.state.messages.size - 1) {
                                        //     let height = 0;
                                        //     for (let i = 0; i <= info.stopIndex; i++) {
                                        //         height += this.cellMeasurerCache.rowHeight({ index: i }) || 0;
                                        //     }
                                        //     this.setState({
                                        //         innerScrollContainerHeight: height,
                                        //     });
                                        // } else {
                                        //     this.setState({
                                        //         innerScrollContainerHeight: 0,
                                        //     });
                                        // }

                                        onRowsRendered(info);
                                    }}
                                    onScroll={() => {
                                        this.setState({
                                            scrollToIndex: undefined,
                                        });
                                    }}
                                    deferredMeasurementCache={this.cellMeasurerCache}
                                    scrollToIndex={this.state.scrollToIndex}
                                    style={{
                                        outline: "none",
                                        paddingTop: this.state.innerScrollContainerHeight !== 0 ?
                                            height - this.state.innerScrollContainerHeight : 0,
                                    }}/>
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </div>
        );
    }
}

const style: CSSProperties = {
    flexGrow: 1,
};

const rotationStyle = `
@keyframes rotate {
    0% {
        transform: rotate(-90deg);
    }
    100% {
        transform: rotate(270deg);
    }
}`;