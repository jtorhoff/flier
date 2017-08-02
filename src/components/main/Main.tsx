import { Paper } from "material-ui";
import * as React from "react";
import { CSSProperties } from "react";
import { ChatsList } from "./ChatsList";
import { Chat } from "./Chat";

interface Props {

}

interface State {

}

export class Main extends React.Component<Props, State> {
    render() {
        return (
            <Paper style={style} zDepth={1}>
                <ChatsList/>
                <Chat/>
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