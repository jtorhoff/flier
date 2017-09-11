import { spacing } from "material-ui/styles";
import { faintBlack, lightBlack } from "material-ui/styles/colors";
import * as React from "react";
import { CSSProperties } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { Subscription } from "rxjs/Subscription";
import { NetworkState } from "../../tg/Session/DataCenter";
import { Chat } from "../../tg/TG";
import { tg } from "../App";
import { ReadableStatus } from "../misc/ReadableStatus";
import { API } from "../../tg/Codegen/API/APISchema";
import { Update } from "../../tg/Updates/Update";
import moment = require("moment");
import { List } from "immutable";

interface Props {
    chat: Chat,
}

interface State {
    networkState: NetworkState,
    typing: List<{
        readonly user: API.User,
        readonly action: API.SendMessageActionType,
        readonly expires: number
    }>,
}

export class ChatHeader extends React.Component<Props, State> {
    private networkStateSubscription: Subscription;
    private updatesSubscription: Subscription;
    private typingIntervalId: number;

    state: State = {
        networkState: tg.stateValue,
        typing: List(),
    };

    handleUpdate(update: Update) {
        switch (update.constructor) {
            case Update.UserTyping: {
                const upd = update as Update.UserTyping;
                if (this.props.chat.peerEquals(upd.peer)) {
                    this.setState({
                        typing: this.state.typing
                            .filter(typing =>
                                !typing!.user.id.equals(upd.user.id))
                            .concat(upd)
                            .toList()
                    });
                }
            } break;

            case Update.NewMessage: {
                const upd = update as Update.NewMessage;
                if (upd.message.peer && this.props.chat.peerEquals(upd.message.peer)) {
                    this.setState({
                        typing: this.state.typing.clear(),
                    });
                }
            } break;
        }
    }

    clearTypingActions() {
        const now = moment().unix();
        this.setState({
            typing: this.state.typing
                .filter(typing => typing!.expires > now)
                .toList(),
        });
    }

    componentDidMount() {
        this.networkStateSubscription = tg.state.subscribe(state => {
            this.setState({
                networkState: state,
            });
        });
        this.updatesSubscription = tg.updates
            .subscribe(update => this.handleUpdate(update));
        this.typingIntervalId = setInterval(
            () => this.clearTypingActions(),
            5000);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!nextProps.chat.peerEquals(this.props.chat.peer)) {
            this.setState({
                typing: this.state.typing.clear(),
            });
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.chat !== this.props.chat
            || nextState.networkState !== this.state.networkState
            || !nextState.typing.equals(this.state.typing);
    }

    componentWillUnmount() {
        this.networkStateSubscription.unsubscribe();
        this.updatesSubscription.unsubscribe();
        clearInterval(this.typingIntervalId);
    }

    render() {
        let state: JSX.Element;
        if (this.state.networkState === NetworkState.waitingForNetwork) {
            state =
                <span key={NetworkState.waitingForNetwork}>
                {
                    "Waiting for network\u2026"
                }
                </span>;
        } else if (this.state.networkState === NetworkState.connecting) {
            state =
                <span key={NetworkState.connecting}>
                {
                    "Connecting\u2026"
                }
                </span>;
        } else {
            state = <span key={NetworkState.idling}/>;
        }

        let element: JSX.Element;
        if (this.state.networkState === NetworkState.idling) {
            let of: API.User | API.Chat | API.ChatForbidden | API.Channel | API.ChannelForbidden;
            switch (this.props.chat.kind.kind) {
                case "dialog":
                    of = this.props.chat.kind.user;
                    break;
                case "chat":
                    of = this.props.chat.kind.chat;
                    break;
                case "channel":
                    of = this.props.chat.kind.channel;
                    break;
                default:
                    throw new Error();
            }
            element =
                <div key={"idling"} style={{
                    height: "100%",
                    padding: `0 ${spacing.desktopGutterLess}px`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                    <span style={{
                        fontSize: 16,
                        fontWeight: 500
                    }}>
                        {
                            this.props.chat.title
                        }
                    </span>
                    {
                        this.state.typing.size > 0 ?
                            typingElement(
                                this.props.chat,
                                this.state.typing
                                    .map(typing => typing!.user).toArray()) :
                            <span style={{ fontSize: 13, color: lightBlack }}>
                                <ReadableStatus of={of}/>
                            </span>
                    }
                </div>;
        } else {
            element =
                <div key={"busy"}>
                    <style type="text/css">{progressKeyframes}</style>
                    <div style={progressStyle}>
                        <div style={{
                            animation: "increase 3s 200ms infinite",
                            ...progressChildStyle,
                        }}/>
                        <div style={{
                            animation: "decrease 3s 1s infinite",
                            ...progressChildStyle,
                        }}/>
                    </div>
                    <div style={{ margin: "18px 16px" }}>
                        <style
                            type="text/css">{networkStateTransitionStyle}</style>
                        <CSSTransitionGroup
                            transitionName="network-state-transition"
                            transitionAppear={true}
                            transitionAppearTimeout={200}
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}>
                            {
                                state
                            }
                        </CSSTransitionGroup>
                    </div>
                </div>;
        }

        return (
            <div style={{
                height: spacing.desktopToolbarHeight,
                flexGrow: 0,
                flexShrink: 0,
                boxShadow: this.state.networkState === NetworkState.idling ?
                    `inset 0 -1px 0 0 ${faintBlack}` : "none",
                position: "relative",
            }}>
                <style type="text/css">{containerTransitionStyle}</style>
                <CSSTransitionGroup transitionName="container-transition"
                                    transitionEnterTimeout={200}
                                    transitionLeaveTimeout={200}>
                    {
                        element
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}

const typingElement = (chat: Chat, users: Array<API.User>) => {
    return (
        <span style={{
            fontSize: 13,
            color: "rgba(61,129,161,1)",
        }}>
            <style type="text/css">{typingStyle}</style>
            {
                typingDots
            }
            {
                chat.peer instanceof API.PeerUser ?
                    "typing" :
                    `${users.map(user => user.firstName!.string).join(", ")} typing`
            }
        </span>
    );
};

const containerTransitionStyle = `
.container-transition-enter {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 200ms ease;
}

.container-transition-enter.container-transition-enter-active {
    opacity: 1;
}

.container-transition-leave {
    opacity: 1;
    transition: opacity 200ms ease;
}

.container-transition-leave.container-transition-leave-active {
    opacity: 0;
}
`;

const networkStateTransitionStyle = `
.network-state-transition-appear {
    position: absolute;
    transform: translateX(-16px);
    transition: transform 200ms ease;
}

.network-state-transition-appear.network-state-transition-appear-active {
    transform: translateX(0);
}

.network-state-transition-enter {
    position: absolute;
    opacity: 0;
    transform: translateX(-16px);
    transition: all 200ms ease;
}

.network-state-transition-enter.network-state-transition-enter-active {
    transform: translateX(0);
    opacity: 1;
}

.network-state-transition-leave {
    position: absolute;
    opacity: 1;
    transition: all 200ms ease;
}

.network-state-transition-leave.network-state-transition-leave-active {
    transform: translateX(16px);
    opacity: 0;
}
`;

const progressStyle: CSSProperties = {
    position: "absolute",
    height: 4,
    overflowX: "hidden",
    background: "rgba(61, 129, 161, 0.4)",
    left: 0,
    right: 0,
    bottom: 0,
    animation: "appear 400ms ease"
};

const progressChildStyle: CSSProperties = {
    position: "absolute",
    background: "rgba(61, 129, 161, 1)",
    width: "100%",
    height: "100%",
    left: 0,
    transform: "translateX(-100%)",
};

const progressKeyframes = `
@keyframes appear {
    from {
        height: 0;
    }
    to {
        height: 4;
    }
}

@keyframes increase {
    from {
        transform: translateX(-67%) scaleX(0.33); 
    }
    to {
        transform: translateX(133%) scaleX(0.67);
    }
}
@keyframes decrease {
    from { 
        transform: translateX(-133%) scaleX(1);  
    }
    to { 
        transform: translateX(100%) scaleX(0.5);
    }
}
`;

const typingDotStyle: CSSProperties = {
    width: 5,
    height: 5,
    background: "rgba(61,129,161,1)",
    marginRight: 3,
    borderRadius: "50%",
    display: "block",
    float: "left",
};

const typingDots = (
    <span className="typing" style={{
        marginRight: 6,
        display: "inline-block",
        height: 5,
        marginBottom: 1,
    }}>
        <span style={typingDotStyle}/>
        <span style={typingDotStyle}/>
        <span style={typingDotStyle}/>
    </span>
);

const typingStyle = `
.typing span {
    animation-name: blink;
    animation-duration: 1200ms;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-timing-function: steps(16, end);
}

.typing span:nth-child(2) {
    animation-delay: 200ms;
}

.typing span:nth-child(3) {
    animation-delay: 400ms;
}

@keyframes blink {
    0% {
        opacity: .67;
        transform: scale(0.67);
    }
    20% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: .67;
        transform: scale(0.67);
    }
}`;