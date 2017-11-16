import { Paper } from "material-ui";
import * as React from "react";
import * as ReactDOM from "react-dom";


interface Props {
    open: boolean,
    anchorEl?: Element,
    onRequestClose: () => void,
    origin: Origin,
}

interface State {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,

    mountChildren: boolean,
}

export class Popover extends React.Component<Props, State> {
    private timeout: number;
    private popoverRoot?: HTMLElement;

    state: State = {
        mountChildren: false,
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.open && !this.props.open) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.setState({
                mountChildren: true,
            });
        } else if (!nextProps.open && this.props.open) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = window.setTimeout(() => {
                this.setState({
                    mountChildren: false,
                }, () => {
                    clearTimeout(this.timeout);
                })
            }, 350);
        }

        if (nextProps.anchorEl) {
            let top: number | undefined = undefined;
            let right: number | undefined = undefined;
            let bottom: number | undefined = undefined;
            let left: number | undefined = undefined;

            if (nextProps.origin[0] === "left") {
                left = nextProps.anchorEl.getBoundingClientRect().left;
            } else if (nextProps.origin[0] === "right") {
                right = document.body.clientWidth - nextProps.anchorEl.getBoundingClientRect().right;
            }

            if (nextProps.origin[1] === "top") {
                top = nextProps.anchorEl.getBoundingClientRect().top;
            } else if (nextProps.origin[1] === "bottom") {
                bottom = document.body.clientHeight - nextProps.anchorEl.getBoundingClientRect().bottom;
            }

            this.setState({
                top: top,
                right: right,
                bottom: bottom,
                left: left,
            })
        }
    }

    componentWillMount() {
        this.popoverRoot = document.createElement("div");
        document.body.appendChild(this.popoverRoot);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.open !== this.props.open
            || nextProps.anchorEl !== this.props.anchorEl
            || nextProps.onRequestClose !== this.props.onRequestClose
            || nextProps.origin !== this.props.origin
            || nextState.top !== this.state.top
            || nextState.right !== this.state.right
            || nextState.bottom !== this.state.bottom
            || nextState.left !== this.state.left
            || nextState.mountChildren !== this.state.mountChildren;
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        document.body.removeChild(this.popoverRoot as Node);
    }

    render() {
        const popover = (
            <Paper style={{
                position: "fixed",
                zIndex: 2100,

                pointerEvents: !this.props.open && "none",
                opacity: this.props.open ? 1 : 0,
                transform: this.props.open ? "scale(1,1)" : "scale(0,0)",
                transformOrigin: this.props.origin.join(" "),
                transition: "transform 200ms ease, opacity 150ms ease",

                top: this.state.top,
                right: this.state.right,
                bottom: this.state.bottom,
                left: this.state.left,
            }}>
                <div style={{
                    transform: this.props.open ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: this.props.origin[0],
                    transition: "transform 200ms ease-out",
                }}>
                    <div style={{
                        transform: this.props.open ? "scaleY(1)" : "scaleY(0)",
                        transformOrigin: this.props.origin[1],
                        transition: "transform 300ms ease-out",
                    }}>
                        {
                            this.state.mountChildren &&
                            this.props.children
                        }
                    </div>
                </div>
            </Paper>
        );

        return ReactDOM.createPortal(popover, this.popoverRoot!);
    }
}

type Origin = ["left" | "right", "top" | "bottom"];