
import * as React from "react";
import { CSSProperties } from "react";
import { spacing } from "material-ui/styles";

interface Props {

}

interface State {

}

export class ChatHeader extends React.Component<Props, State> {
    render() {
        return (
            <div style={style}></div>
        );
    }
}

const style: CSSProperties = {
    height: spacing.desktopToolbarHeight,
    flexGrow: 0,
    flexShrink: 0,
};