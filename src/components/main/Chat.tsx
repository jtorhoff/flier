import * as React from "react";
import { CSSProperties } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatFooter } from "./ChatFooter";

interface Props {

}

interface State {

}

export class Chat extends React.Component<Props, State> {
    render() {
        return (
            <div style={style}>
                <ChatHeader/>
                <ChatMessages/>
                <ChatFooter/>
            </div>
        );
    }
}

const style: CSSProperties = {
    flexGrow: 2,
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
};