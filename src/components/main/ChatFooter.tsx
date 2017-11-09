import { StyleSheet, css } from "aphrodite/no-important";
import { TextField, IconButton } from "material-ui";
import { spacing } from "material-ui/styles";
import { faintBlack } from "material-ui/styles/colors";
import {
    EditorInsertEmoticon,
    EditorAttachFile,
    AvMicNone,
    ContentSend
} from "material-ui/svg-icons";
import * as React from "react";
import { CSSProperties } from "react";
import * as ReactDOM from "react-dom";
import { CSSTransitionGroup } from "react-transition-group";
import { primaryColor } from "../App";
import { ChatStickersPopup } from "./ChatStickersPopup";
import TextFieldProps = __MaterialUI.TextFieldProps;

interface Props {

}

interface State {
    message: string | undefined,
    stickersPopupOpen: boolean,
}

export class ChatFooter extends React.Component<Props, State> {
    private stickersPopupAnchor?: Element;

    state: State = {
        message: undefined,
        stickersPopupOpen: false,
    };

    onInput(event: React.SyntheticEvent<TextFieldProps>) {
        event.preventDefault();

        this.setState({
            message: event.currentTarget.value as string,
        })
    }

    onInsertEmoticonClick(event: React.SyntheticEvent<any>) {
        event.preventDefault();

        this.setState({
            stickersPopupOpen: true,
        });
    }

    onStickerPopupClose() {
        this.setState({
            stickersPopupOpen: false,
        });
    }

    componentDidMount() {
        this.stickersPopupAnchor = ReactDOM.findDOMNode(this.refs["stickersPopupAnchor"]);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextState.message !== this.state.message
            || nextState.stickersPopupOpen !== this.state.stickersPopupOpen;
    }

    render() {
        const action = this.state.message ?
            <IconButton key={"send"}
                        style={iconButtonStyle}
                        iconStyle={iconButtonIconStyle}>
                <ContentSend
                    color={primaryColor}/>
            </IconButton> :
            <IconButton key={"mic"}
                        style={iconButtonStyle}
                        iconStyle={iconButtonIconStyle}
                        disabled={true}>
                <AvMicNone
                    color={"rgba(0,0,0,0.4)"}
                    hoverColor={primaryColor}/>
            </IconButton>;
        return (
            <div className={css(styles.root)}>
                <style type="text/css">{transitionStyle}</style>
                <IconButton style={iconButtonStyle}
                            iconStyle={iconButtonIconStyle}
                            disabled={true}>
                    <EditorAttachFile color={"rgba(0,0,0,0.4)"}
                                      hoverColor={primaryColor}/>
                </IconButton>
                <div className={css(styles.textField)}>
                    <TextField hintText={"Write a message\u2026"}
                               onChange={e => this.onInput(e)}
                               fullWidth={true}
                               multiLine={true}
                               rowsMax={3}
                               underlineShow={false}
                               ref={ref => ref && ref.focus()}/>
                </div>
                <IconButton ref="stickersPopupAnchor"
                            style={iconButtonStyle}
                            iconStyle={iconButtonIconStyle}
                            onClick={e => this.onInsertEmoticonClick(e)}
                            onMouseEnter={e => this.onInsertEmoticonClick(e)}>
                    <EditorInsertEmoticon
                        color={"rgba(0,0,0,0.4)"}
                        hoverColor={primaryColor}/>
                </IconButton>
                <div style={{ width: 6 }}></div>
                <CSSTransitionGroup transitionName="transition"
                                    component="div"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        display: "flex",
                                        overflow: "hidden",
                                    }}
                                    transitionEnterTimeout={100}
                                    transitionLeaveTimeout={100}>
                    {
                        action
                    }
                </CSSTransitionGroup>
                <ChatStickersPopup open={this.state.stickersPopupOpen}
                                   onClose={() => this.onStickerPopupClose()}
                                   anchorEl={this.stickersPopupAnchor}/>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        minHeight: spacing.desktopToolbarHeight,
        borderTop: `1px solid ${faintBlack}`,
        padding: "0 12px 10px 12px",
        flexGrow: 0,
        flexShrink: 0,
        display: "flex",
        flexBasis: "auto",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        boxSizing: "border-box",
    },
    textField: {
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: -6,
        padding: `0 ${spacing.desktopGutterMini}px`,
    }
});

const transitionStyle = `
.transition-enter {
    position: absolute !important;
    transform: scale(0.25);
    transition: transform 100ms cubic-bezier(0.4, 0.0, 0.2, 1) !important;
}

.transition-enter.transition-enter-active {
    transform: scale(1);
}

.transition-leave {
    position: absolute !important;
    transform: scale(1);
    transition: transform 100ms cubic-bezier(0.4, 0.0, 0.2, 1) !important;
}

.transition-leave.transition-leave-active {
    transform: scale(0.25);
}
`;

const iconButtonStyle: CSSProperties = {
    width: 36,
    height: 36,
    padding: 6,
};

const iconButtonIconStyle: CSSProperties = {
    width: 24,
    height: 24,
};