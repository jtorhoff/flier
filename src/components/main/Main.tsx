import { Paper } from "material-ui";
import * as React from "react";
import { CSSProperties } from "react";
import { ChatsList } from "./ChatsList";
import { Chat } from "./Chat";
import { Chat as TgChat } from "../../tg/TG";
import { API } from "../../tg/Codegen/API/APISchema";

interface Props {

}

interface State {
    peer?: API.PeerType,
}

export class Main extends React.Component<Props, State> {
    state: State = {};

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