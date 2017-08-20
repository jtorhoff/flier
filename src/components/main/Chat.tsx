import * as React from "react";
import { CSSProperties } from "react";
import { Chat as TgChat } from "../../tg/TG";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { Subscription } from "rxjs/Subscription";
import { Update } from "../../tg/Updates/Update";

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
                })
            })
    }

    handleUpdate(update: Update) {
        if (!this.state.chat) return;

        switch (update.constructor) {
            case Update.ReadHistoryInbox: {
                const upd = update as Update.ReadHistoryInbox;
                if (this.state.chat.peerEquals(upd.peer)) {
                    this.setState({
                        chat: this.state.chat.setReadInboxMaxId(upd.maxId)
                    });
                }
            } break;

            case Update.ReadHistoryOutbox: {
                const upd = update as Update.ReadHistoryOutbox;
                if (this.state.chat.peerEquals(upd.peer)) {
                    this.setState({
                        chat: this.state.chat.setReadOutboxMaxId(upd.maxId)
                    });
                }
            } break;

            case Update.User: {
                const upd = update as Update.User;
                if (this.state.chat.kind.kind === "dialog" &&
                    this.state.chat.kind.user.id.equals(upd.user.id)) {
                    this.setState({
                        chat: this.state.chat.setKind({
                            kind: "dialog",
                            user: upd.user,
                        })
                    });
                }
            } break;

            case Update.Chat: {
                const upd = update as Update.Chat;
                if (this.state.chat.kind.kind === "chat" &&
                    this.state.chat.kind.chat.id.equals(upd.chat.id)) {
                    this.setState({
                        chat: this.state.chat.setKind({
                            kind: "chat",
                            chat: upd.chat,
                        })
                    });
                }
            } break;

            case Update.Channel: {
                const upd = update as Update.Channel;
                if (this.state.chat.kind.kind === "channel" &&
                    this.state.chat.kind.channel.id.equals(upd.channel.id)) {
                    this.setState({
                        chat: this.state.chat.setKind({
                            kind: "channel",
                            channel: upd.channel,
                        })
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
            <div style={style}>
                <ChatHeader chat={this.state.chat}/>
                <ChatMessages/>
                <ChatFooter/>
            </div>
        );
    }
}

const style: CSSProperties = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
};