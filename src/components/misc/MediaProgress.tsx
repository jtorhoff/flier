import * as React from "react";
import { CircularProgress } from "material-ui";
import { CSSProperties } from "react";
import { lightBlack } from "material-ui/styles/colors";


interface Props {
    containerWidth: number,
    containerHeight: number,

    totalSize?: number,
    progress?: number,
    done: boolean,
}

interface State {

}

export class MediaProgress extends React.Component<Props, State> {
    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.containerWidth !== this.props.containerWidth
            || nextProps.containerHeight !== this.props.containerHeight
            || nextProps.totalSize !== this.props.totalSize
            || nextProps.progress !== this.props.progress
            || nextProps.done !== this.props.done;
    }

    render() {
        const totalSize = this.props.totalSize || 100;
        const progress = this.props.progress || 5;

        return (
            <div style={{
                ...style,
                opacity: progress === totalSize ? 0 : 1,
                left: Math.floor((this.props.containerWidth || 0) / 2),
                top: Math.floor((this.props.containerHeight || 0) / 2),
                animationName: this.props.done ? "none" : "rotate",
            }}>
                <CircularProgress
                    mode="determinate"
                    size={40}
                    thickness={3}
                    min={totalSize / 100 * 5}
                    max={totalSize}
                    value={progress}
                    color="white"
                    style={{
                        transform: "rotate(-90deg)",
                    }}/>
            </div>
        );
    }
}

const style: CSSProperties = {
    width: 44,
    height: 44,
    marginTop: -22,
    marginLeft: -22,
    position: "absolute",
    backgroundColor: lightBlack,
    borderRadius: "50%",
    boxSizing: "border-box",
    padding: 2,

    animationDuration: "1800ms",
    animationIterationCount: "infinite",
    animationFillMode: "both",
    animationTimingFunction: "linear",

    transition: "opacity 500ms ease",
};