import { Paper } from "material-ui";
import * as React from "react";
import { CSSProperties } from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { Chat } from "./Chat";
import { ChatsList } from "./ChatsList";
import moment = require("moment");

interface Props {

}

interface State {
    peer?: API.PeerType,
    online: [boolean, number],
}

export class Main extends React.Component<Props, State> {
    private windowOnFocusListener = () => {
        this.setState({
            online: [true, moment().valueOf()],
        });
    };

    private windowOnBlurListener = () => {
        this.setState({
            online: [false, moment().valueOf()],
        });
    };

    private statusUpdateIntervalId = 0;

    state: State = {
        online: [false, 0],
    };

    componentDidMount() {
        window.addEventListener("focus", this.windowOnFocusListener);
        window.addEventListener("blur", this.windowOnBlurListener);
        window.addEventListener("beforeunload", this.windowOnBlurListener);

        this.statusUpdateIntervalId = setInterval(() => {
            if (this.state.online[0] &&
                tg.onlineUpdatePeriod > 0 &&
                moment().valueOf() > this.state.online[1] + tg.onlineUpdatePeriod) {
                this.setState({
                    online: [true, moment().valueOf()],
                });
                tg.setStatus(true)
                    .subscribe();
            }
        }, 5000);

        this.setState({
            online: [document.hasFocus(), moment().valueOf()],
        });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextState.peer !== this.state.peer
            || nextState.online !== this.state.online;
    }

    componentDidUpdate(prevPops: Props, prevState: State) {
        if (this.state.online[0] !== prevState.online[0]) {
            tg.setStatus(this.state.online[0])
                .subscribe();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("focus", this.windowOnFocusListener);
        window.removeEventListener("blur", this.windowOnBlurListener);
        window.removeEventListener("beforeunload", this.windowOnBlurListener);
        clearInterval(this.statusUpdateIntervalId);
    }

    render() {
        const child = this.state.peer ? <Chat peer={this.state.peer}/> : <div/>;
        return (
            <Paper style={style} zDepth={1}>
                <ChatsList
                    selectedPeer={peer => this.setState({ peer: peer })}/>
                <div style={childStyle}>
                    {
                        child
                    }
                </div>
            </Paper>
        );
    }
}

const style: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "calc(100% - 68px)",
    maxWidth: 960,
    minWidth: 560,
    display: "flex",
};

const childStyle: CSSProperties = {
    height: "100%",
    flexGrow: 2,
    minWidth: 320,
};