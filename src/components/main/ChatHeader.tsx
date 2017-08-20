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

interface Props {
    chat: Chat,
}

interface State {
    networkState: NetworkState,
}

export class ChatHeader extends React.Component<Props, State> {
    private networkStateSubscription: Subscription;

    state: State = {
        networkState: tg.stateValue,
    };

    componentDidMount() {
        this.networkStateSubscription = tg.state.subscribe(state => {
            this.setState({
                networkState: state,
            });
        });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.chat !== this.props.chat
            || nextState.networkState !== this.state.networkState;
    }

    componentWillUnmount() {
        this.networkStateSubscription.unsubscribe();
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
                    }}>{this.props.chat.title}</span>
                    <span style={{ fontSize: 13, color: lightBlack }}>
                        <ReadableStatus of={of}/>
                    </span>
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