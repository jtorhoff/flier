import { Paper } from "material-ui";
import * as React from "react";
import { CSSProperties } from "react";
import { ChatsList } from "./ChatsList";
import { Messages } from "./Messages";

interface Props {

}

interface State {

}

export class Main extends React.Component<Props, State> {
    render() {
        return (
            <Paper style={style} zDepth={1}>
                <ChatsList/>
                <Messages/>
            </Paper>
        );
    }
}

const style: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 960,
    height: "calc(100% - 68px)",
    display: "flex",
};