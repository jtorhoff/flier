import { StyleSheet, css } from "aphrodite/no-important";
import {
    red300,
    pink300,
    orange300,
    deepOrange300,
    lightGreen300,
    green300,
    teal300,
    cyan300,
    lightBlue300,
    blue300,
    indigo300,
    purple300
} from "material-ui/styles/colors";
import * as React from "react";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";

interface Props {
    id: number,
    title: string,
    photo?: API.FileLocation,
}

interface State {
    photoDataURL?: string,
}

export class Avatar extends React.Component<Props, State> {
    private photoSubscription?: Subscription;

    state: State = {
        photoDataURL: undefined,
    };

    private loadPhoto(photo: API.FileLocation) {
        if (this.photoSubscription) {
            this.photoSubscription.unsubscribe();
        }
        this.photoSubscription = tg.getFile(photo)
            .map(blob => URL.createObjectURL(blob))
            .subscribe(dataURL => {
                this.setState({
                    photoDataURL: dataURL,
                });
            });
    }

    componentDidMount() {
        if (this.props.photo) {
            this.loadPhoto(this.props.photo);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.photo) {
            this.loadPhoto(nextProps.photo);
        } else {
            this.setState({
                photoDataURL: undefined,
            });
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.id !== this.props.id
            || nextProps.title !== this.props.title
            || nextProps.photo !== this.props.photo
            || nextState.photoDataURL !== this.state.photoDataURL;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.photoDataURL !== this.state.photoDataURL && prevState.photoDataURL) {
            URL.revokeObjectURL(prevState.photoDataURL);
        }
    }

    componentWillUnmount() {
        if (this.photoSubscription) {
            this.photoSubscription.unsubscribe();
        }
        if (this.state.photoDataURL) {
            URL.revokeObjectURL(this.state.photoDataURL);
        }
    }

    render() {
        return (
            <div className={css(styles.root)}
                 style={{
                     backgroundColor: !this.props.photo && hashColor(this.props.id)
                 }}>
                {
                    !this.props.photo &&
                    extractInitials(this.props.title)
                }
                <img className={css(styles.img)}
                     style={{
                         opacity: this.state.photoDataURL ? 1 : 0,
                     }}
                     width={40}
                     height={40}
                     src={this.state.photoDataURL}/>
            </div>
        );
    }
}

const extractInitials = (title: string): string => {
    const components = title.trim().split(/\s|\n/);
    if (components[0] === components[components.length - 1]) {
        return title.substring(0, 1);
    }

    return components[0].substring(0, 1) + components[components.length - 1].substring(0, 1);
};

const colors = [
    red300,
    pink300,
    purple300,
    indigo300,
    blue300,
    lightBlue300,
    cyan300,
    teal300,
    green300,
    lightGreen300,
    orange300,
    deepOrange300,
];

const hashColor = (x: number): string => {
    // Hashing function for integers taken from h2 database
    x = ((x >> 16) ^ x) * 0x45d9f3b;
    x = ((x >> 16) ^ x) * 0x45d9f3b;
    x = ((x >> 16) ^ x);

    return colors[x % colors.length];
};

const styles = StyleSheet.create({
    root: {
        overflow: "hidden",
        position: "relative",
        color: "rgb(255, 255, 255)",
        userSelect: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        borderRadius: "50%",
        height: 40,
        width: 40,
    },
    img: {
        top: 0,
        left: 0,
        position: "absolute",
        transition: "opacity 200ms ease",
        borderRadius: "50%",
    }
});