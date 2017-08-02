import { List } from "immutable";
import { List as MaterialList, makeSelectable, Divider } from "material-ui";
import * as moment from "moment";
import * as React from "react";
import { CSSProperties } from "react";
import {
    List as VirtualizedList,
    InfiniteLoader,
    AutoSizer,
    ListRowProps,
    IndexRange
} from "react-virtualized";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { Chat } from "../../tg/TG";
import { Update } from "../../tg/Updates/Update";
import { tg } from "../App";
import { ChatsListItem } from "./ChatsListItem";
import { faintBlack } from "material-ui/styles/colors";

interface Props {

}

interface State {
    chats: List<Chat>,
    typing: List<Array<{
        readonly user: API.User,
        readonly action: API.SendMessageActionType,
        readonly expires: number
    }>>,
}

export class ChatsList extends React.Component<Props, State> {
    loadingChats = false;
    allChatsLoaded = false;
    updatesSubscription: Subscription;
    typingIntervalId: number;

    state: State = {
        chats: List(),
        typing: List(),
    };

    isRowLoaded(params: { index: number }): boolean {
        return this.allChatsLoaded || params.index < this.state.chats.size;
    }

    loadMoreRows(params: IndexRange): Promise<any> {
        if (this.loadingChats) return Promise.resolve();

        this.loadingChats = true;
        tg.getChats(30, this.state.chats.get(params.startIndex - 1))
            .subscribe(chats => {
                if (chats.length === 0) {
                    this.allChatsLoaded = true;
                } else {
                    this.setState({
                        chats: this.state.chats.concat(chats).toList(),
                    });
                }
            },
            error => {

            },
            () => {
                this.loadingChats = false;
            });

        return Promise.resolve();
    }

    rowCount(): number {
        return this.allChatsLoaded ?
            this.state.chats.size :
            this.state.chats.size + 1;
    }

    renderRow(params: ListRowProps): React.ReactNode {
        return (
            <div key={params.key} style={params.style}>
                <ChatsListItem
                    chat={this.state.chats.get(params.index)}
                    typing={this.state.typing.get(params.index)}/>
                {
                    params.index < this.state.chats.size - 1 &&
                    <Divider inset={true}/>
                }
            </div>
        );
    }

    handleUpdate(update: Update) {
        switch (update.constructor) {
            case Update.NewMessage: {
                const message = (update as Update.NewMessage).message;
                const index = this.state.chats
                    .findIndex(chat =>
                        !!message.peer && !!chat && chat.peerEquals(message.peer));
                if (index !== -1) {
                    const chat = this.state.chats.get(index)
                        .setTopMessage(message);
                    this.setState({
                        chats: this.state.chats
                            .remove(index)
                            .insert(0, chat),
                    });
                } else {
                    // TODO insert at top
                }
            } break;

            case Update.ReadHistoryInbox: {
                const upd = update as Update.ReadHistoryInbox;
                const index = this.state.chats
                    .findIndex(chat =>
                        !!chat && chat.peerEquals(upd.peer));
                if (index !== -1) {
                    const chat = this.state.chats.get(index)
                        .setReadInboxMaxId(upd.maxId);

                    this.setState({
                        chats: this.state.chats.set(index, chat),
                    });
                }
            } break;

            case Update.ReadHistoryOutbox: {
                const upd = update as Update.ReadHistoryOutbox;
                const index = this.state.chats
                    .findIndex(chat =>
                        !!chat && chat.peerEquals(upd.peer));
                if (index !== -1) {
                    const chat = this.state.chats.get(index)
                        .setReadOutboxMaxId(upd.maxId);

                    this.setState({
                        chats: this.state.chats.set(index, chat),
                    });
                }
            } break;

            case Update.User: {
                const upd = update as Update.User;
                const index = this.state.chats
                    .findIndex(chat =>
                        !!chat  &&
                        chat.kind.kind === "dialog" &&
                        chat.kind.user.id.equals(upd.user.id));
                if (index !== -1) {
                    const chat = this.state.chats.get(index)
                        .setKind({ kind: "dialog", user: upd.user });

                    this.setState({
                        chats: this.state.chats.set(index, chat),
                    });
                }
            } break;

            case Update.Chat: {
                const upd = update as Update.Chat;
                const index = this.state.chats
                    .findIndex(chat =>
                        !!chat  &&
                        chat.kind.kind === "chat" &&
                        chat.kind.chat.id.equals(upd.chat.id));
                if (index !== -1) {
                    const chat = this.state.chats.get(index)
                        .setKind({ kind: "chat", chat: upd.chat });

                    this.setState({
                        chats: this.state.chats.set(index, chat),
                    });
                }
            } break;

            case Update.Channel: {
                const upd = update as Update.Channel;
                const index = this.state.chats
                    .findIndex(chat =>
                        !!chat  &&
                        chat.kind.kind === "channel" &&
                        chat.kind.channel.id.equals(upd.channel.id));
                if (index !== -1) {
                    const chat = this.state.chats.get(index)
                        .setKind({ kind: "channel", channel: upd.channel });

                    this.setState({
                        chats: this.state.chats.set(index, chat),
                    });
                }
            } break;

            case Update.DeleteMessages: {
                const upd = update as Update.DeleteMessages;
                upd.messages.forEach(peer => {
                    const index = this.state.chats
                        .findIndex(chat =>
                            !!chat && chat.peerEquals(peer.peer));
                    if (index === -1) return;

                    tg.getTopMessageForPeer(peer.peer).subscribe(msg => {
                        if (!msg) return;
                        const index = this.state.chats
                            .findIndex(chat =>
                                !!chat && chat.peerEquals(peer.peer));
                        if (index === -1) return;
                        const chat = this.state.chats.get(index)
                            .setTopMessage(msg);

                        this.setState({
                            chats: this.state.chats.set(index, chat),
                        });
                    });
                });
            } break;

            case Update.UserTyping: {
                const upd = update as Update.UserTyping;
                const index = this.state.chats
                    .findIndex(chat =>
                        !!chat && chat.peerEquals(upd.peer));
                if (index !== -1) {
                    if (this.state.typing.has(index)) {
                        let typing = this.state.typing.get(index);
                        if (typing) {
                            typing = typing.filter(typing =>
                                typing.user.id.equals(upd.user.id));
                        } else {
                            typing = [];
                        }
                        typing.push(upd);

                        this.setState({
                            typing: this.state.typing.set(index, typing),
                        });
                    } else {
                        this.setState({
                            typing: this.state.typing.set(index, [upd]),
                        });
                    }
                }
            } break;

            case Update.EditMessage: {
                const upd = update as Update.EditMessage;
                const index = this.state.chats
                    .findIndex(chat =>
                        !!chat && chat.topMessage.id === upd.message.id);
                if (index !== -1) {
                    const chat = this.state.chats.get(index)
                        .setTopMessage(upd.message);

                    this.setState({
                        chats: this.state.chats.set(index, chat),
                    });
                }
            } break;
        }
    }

    clearTypingActions() {
        const now = moment().unix();
        const typing = this.state.typing.withMutations(typings => {
            typings.forEach((typing, index) => {
                if (typing) {
                    typings.set(index!, typing.filter(typing => typing.expires > now));
                }
            });
        });
        this.setState({
            typing: typing,
        });
    }

    componentDidMount() {
        this.updatesSubscription = tg.updates
            .subscribe(update => this.handleUpdate(update));

        this.loadingChats = true;
        tg.getChats(30).subscribe(chats => {
                this.setState({
                    chats: this.state.chats.concat(chats).toList(),
                });
            },
            error => {

            },
            () => {
                this.loadingChats = false;
            });

        this.typingIntervalId = setInterval(
            () => this.clearTypingActions(),
            5000);
    }

    componentWillUnmount() {
        this.updatesSubscription.unsubscribe();
        clearInterval(this.typingIntervalId);
    }

    render() {
        return (
            <SelectableList style={style}>
                <style type="text/css">{typingStyle}</style>
                <InfiniteLoader
                    isRowLoaded={(params) => this.isRowLoaded(params)}
                    loadMoreRows={(params) => this.loadMoreRows(params)}
                    rowCount={this.rowCount()}>
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer>
                            {({ width, height }) => (
                                <VirtualizedList
                                    ref={registerChild}
                                    width={width}
                                    height={height}
                                    rowHeight={90}
                                    overscanRowCount={5}
                                    rowCount={this.state.chats.size}
                                    rowRenderer={(params) => this.renderRow(params)}
                                    onRowsRendered={onRowsRendered}/>
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </SelectableList>
        );
    }
}

const SelectableList = makeSelectable(MaterialList);

const style: CSSProperties = {
    height: "100%",
    maxWidth: 320,
    minWidth: 240,
    borderRight: `1px solid ${faintBlack}`,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 240,
    overflowY: "auto",
    overflowX: "hidden",
    padding: 0,
};


const typingStyle = `
.typing span {
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-timing-function: steps(16, end);
}

.typing span:nth-child(2) {
  animation-delay: .2s;
}

.typing span:nth-child(3) {
  animation-delay: .4s;
}

@keyframes blink {
  0% {
    opacity: .1;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .1;
  }
}
`;