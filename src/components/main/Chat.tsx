import { StyleSheet, css } from "aphrodite/no-important";
import * as React from "react";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { Chat as TgChat } from "../../tg/TG";
import { Update } from "../../tg/Updates/Update";
import { tg } from "../App";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";

interface Props {
    peer: API.PeerType,
}

interface State {
    chat?: TgChat,
}

export class Chat extends React.Component<Props, State> {
    private chatSubscription: Subscription;
    private updatesSubscription: Subscription;

    state: State = {};

    private loadChat(peer: API.PeerType) {
        if (this.chatSubscription) {
            this.chatSubscription.unsubscribe();
        }
        this.chatSubscription = tg.getChat(peer)
            .subscribe(chat => {
                this.setState({
                    chat: chat,
                });
            });
    }

    handleUpdate(update: Update) {
        if (!this.state.chat) return;

        switch (update.constructor) {
            case Update.ReadHistoryInbox: {
                const upd = update as Update.ReadHistoryInbox;
                if (this.state.chat.peerEquals(upd.peer)) {
                    this.setState(state => {
                        if (state.chat) {
                            return {
                                chat: state.chat.setReadInboxMaxId(upd.maxId),
                            }
                        }
                        return {};
                    });
                }
            } break;

            case Update.ReadHistoryOutbox: {
                const upd = update as Update.ReadHistoryOutbox;
                if (this.state.chat.peerEquals(upd.peer)) {
                    this.setState(state => {
                        if (state.chat) {
                            return {
                                chat: state.chat.setReadOutboxMaxId(upd.maxId),
                            }
                        }
                        return {};
                    });
                }
            } break;

            case Update.User: {
                const upd = update as Update.User;
                if (this.state.chat.kind.kind === "dialog" &&
                    this.state.chat.kind.user.id.equals(upd.user.id)) {
                    this.setState(state => {
                        if (state.chat) {
                            return {
                                chat: state.chat.setKind({
                                    kind: "dialog",
                                    user: upd.user,
                                })
                            }
                        }
                        return {};
                    });
                }
            } break;

            case Update.Chat: {
                const upd = update as Update.Chat;
                if (this.state.chat.kind.kind === "chat" &&
                    this.state.chat.kind.chat.id.equals(upd.chat.id)) {
                    this.setState(state => {
                        if (state.chat) {
                            return {
                                chat: state.chat.setKind({
                                    kind: "chat",
                                    chat: upd.chat,
                                })
                            }
                        }
                        return {};
                    });
                }
            } break;

            case Update.Channel: {
                const upd = update as Update.Channel;
                if (this.state.chat.kind.kind === "channel" &&
                    this.state.chat.kind.channel.id.equals(upd.channel.id)) {
                    this.setState(state => {
                        if (state.chat) {
                            return {
                                chat: state.chat.setKind({
                                    kind: "channel",
                                    channel: upd.channel,
                                })
                            }
                        }
                        return {};
                    });
                }
            } break;
        }
    }

    componentDidMount() {
        this.loadChat(this.props.peer);
        this.updatesSubscription = tg.updates
            .subscribe(update => this.handleUpdate(update));
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.peer !== this.props.peer
            || nextState.chat !== this.state.chat;
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.peer !== prevProps.peer) {
            this.loadChat(this.props.peer);
        }
    }

    componentWillUnmount() {
        this.chatSubscription.unsubscribe();
        this.updatesSubscription.unsubscribe();
    }

    render() {
        if (!this.state.chat) {
            return (<div/>);
        }

        return (
            <div className={css(styles.root)}>
                <ChatHeader chat={this.state.chat}/>
                <ChatMessages key={this.state.chat.peerId} chat={this.state.chat}/>
                <ChatFooter peer={this.props.peer}/>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    }
});