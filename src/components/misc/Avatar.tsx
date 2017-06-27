import { Avatar as MuiAvatar } from "material-ui";
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
import { CSSProperties } from "react";
import { Subscription } from "rxjs/Subscription";
import { blobToDataURL } from "../../misc/BlobToDataURL";
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
    initials: string;
    color: string;
    photoSubscription: Subscription;

    state: State = {
        photoDataURL: undefined,
    };

    constructor(props: Props) {
        super(props);

        this.initials = extractInitials(props.title);
        this.color = hashColor(props.id);
    }

    componentWillReceiveProps(props: Props) {
        this.initials = extractInitials(props.title);
        this.color = hashColor(props.id);
    }

    componentDidMount() {
        if (this.props.photo) {
            this.photoSubscription = tg.getFile(this.props.photo)
                .flatMap(blob => blobToDataURL(blob))
                .subscribe(dataURL => {
                        this.setState({
                            photoDataURL: dataURL,
                        });
                    },
                    error => {
                        console.log("!err", error);
                    });
        }
    }

    componentWillUnmount() {
        if (this.photoSubscription) {
            this.photoSubscription.unsubscribe();
        }
    }

    render() {
        return (
            <MuiAvatar style={style} backgroundColor={
                this.state.photoDataURL ? "rgba(0,0,0,0)" : this.color
            }>
                {this.state.photoDataURL ? (
                    <img style={{
                        width: "100%",
                        height: "100%",
                    }} src={this.state.photoDataURL}/>
                ) : (
                    this.initials
                )}
            </MuiAvatar>
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
    x = (x >> 16) ^ x;

    return colors[x % colors.length];
};

const style: CSSProperties = {
    position: "absolute",
    left: 16,
    top: 16,
    overflow: "hidden",
};