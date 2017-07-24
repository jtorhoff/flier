import * as React from "react";
import { CSSProperties } from "react";

interface Props {

}

interface State {

}

export class Messages extends React.Component<Props, State> {
    render() {
        return (
            <div style={style}>

            </div>
        );
    }
}

const style: CSSProperties = {
    flexGrow: 2,
    minWidth: 320,
};