import { StyleSheet, css } from "aphrodite/no-important";
import { CircularProgress } from "material-ui";
import { lightBlack } from "material-ui/styles/colors";
import * as React from "react";


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
            <div
                className={css(styles.root, !this.props.done && styles.infiniteAnimation)}
                style={{
                    opacity: progress === totalSize ? 0 : 1,
                    left: Math.floor((this.props.containerWidth || 0) / 2),
                    top: Math.floor((this.props.containerHeight || 0) / 2),
                }}>
                <CircularProgress
                    mode="determinate"
                    size={40}
                    thickness={3}
                    min={Math.floor(totalSize / 100 * 5)}
                    max={totalSize}
                    value={progress}
                    color="white"
                    innerStyle={{
                        transform: "rotate(0deg)",
                    }}/>
            </div>
        );
    }
}

const rotatingAnimation = {
    from: {
        transform: "rotate(-90deg)",
    },
    to: {
        transform: "rotate(270deg)",
    }
};

const styles = StyleSheet.create({
    root: {
        width: 44,
        height: 44,
        marginTop: -22,
        marginLeft: -22,
        position: "absolute",
        backgroundColor: lightBlack,
        borderRadius: "50%",
        boxSizing: "border-box",
        padding: 2,

        transition: "opacity 500ms ease",

        animationName: rotatingAnimation,
        animationDuration: "1800ms",
        animationIterationCount: 1,
        animationFillMode: "both",
        animationTimingFunction: "linear",
    },
    infiniteAnimation: {
        animationIterationCount: "infinite !important",
    },
});