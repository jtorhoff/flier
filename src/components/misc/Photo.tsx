/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { StyleSheet, css } from "aphrodite/no-important";
import * as React from "react";
import "rxjs/add/operator/timeout";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { MediaProgress } from "./MediaProgress";

interface Props {
    width: number,
    height: number,
    photo: API.Photo,
    round?: boolean,
    withProgress?: boolean,
}

interface State {
    thumbDataURL?: string,
    photoTotalSize?: number,
    photoProgress?: number,
    photoDataURL?: string,
}

export class Photo extends React.Component<Props, State> {
    // noinspection JSUnusedGlobalSymbols
    public static defaultProps: Partial<Props> = {
        round: false,
        withProgress: true,
    };

    private photoSubscription?: Subscription;
    private progressSubscription?: Subscription;

    state: State = {};

    componentDidMount() {
        const thumb = this.props.photo.sizes.items
            .find(size => size instanceof API.PhotoCachedSize) as API.PhotoCachedSize | undefined;
        if (thumb) {
            const url = URL.createObjectURL(new Blob([thumb.bytes.bytes]));
            this.setState({
                thumbDataURL: url,
            });
        }

        const size = this.props.photo.sizes.items
            .find((size, index) => {
                if (size instanceof API.PhotoSize) {
                    return (size.w.value >= this.props.width * devicePixelRatio
                        && size.h.value >= this.props.height * devicePixelRatio)
                        || index === this.props.photo.sizes.items.length - 1;
                }

                return false;
            }) as API.PhotoSize | undefined;

        if (size && size.location instanceof API.FileLocation) {
            this.setState({
                photoTotalSize: size.size.value,
            });

            this.photoSubscription = tg.getFile(size.location)
                .subscribe(blob => {
                    const url = URL.createObjectURL(blob);
                    this.setState({
                        photoDataURL: url,
                    });
                });

            if (this.props.withProgress) {
                this.progressSubscription = tg.getDownloadProgress(size.location)
                    .subscribe(progress => {
                        this.setState({
                            photoProgress: progress,
                        });
                    });
            }
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.width !== this.props.width
            || nextProps.height !== this.props.height
            || nextProps.photo !== this.props.photo
            || nextProps.round !== this.props.round
            || nextProps.withProgress !== this.props.withProgress
            || nextState.thumbDataURL !== this.state.thumbDataURL
            || nextState.photoDataURL !== this.state.photoDataURL
            || nextState.photoTotalSize !== this.state.photoTotalSize
            || nextState.photoProgress !== this.state.photoProgress;
    }

    componentWillUnmount() {
        if (this.photoSubscription) {
            this.photoSubscription.unsubscribe();
        }
        if (this.progressSubscription) {
            this.progressSubscription.unsubscribe();
        }
        if (this.state.thumbDataURL) {
            URL.revokeObjectURL(this.state.thumbDataURL);
        }
        if (this.state.photoDataURL) {
            URL.revokeObjectURL(this.state.photoDataURL);
        }
    }

    render() {
        return (
            <div className={css(styles.root, this.props.round && styles.round)} style={{
                width: this.props.width,
                height: this.props.height,
            }}>
                <img className={css(
                    !this.state.photoDataURL && this.state.thumbDataURL && styles.thumb,
                    this.props.round && styles.round)}
                     width={this.props.width}
                     height={this.props.height}
                     src={this.state.photoDataURL ? this.state.photoDataURL : this.state.thumbDataURL}/>
                {
                    this.props.withProgress &&
                    <MediaProgress containerWidth={this.props.width}
                                   containerHeight={this.props.height}
                                   totalSize={this.state.photoTotalSize}
                                   progress={this.state.photoProgress}
                                   done={!!this.state.photoDataURL}/>
                }
            </div>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        overflow: "hidden",
        position: "relative",
        borderRadius: 4,
    },
    thumb: {
        filter: "blur(3px)",
    },
    round: {
        borderRadius: "50%",
    }
});