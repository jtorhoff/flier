/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { StyleSheet, css } from "aphrodite/no-important";
import { Paper } from "material-ui";
import * as moment from "moment";
import * as React from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { Chat } from "./Chat";
import { ChatsList } from "./ChatsList";

interface Props {

}

interface State {
    peer?: API.PeerType,
}

export class Main extends React.Component<Props, State> {
    private online: [boolean, number] = [false, 0];

    private windowOnFocusListener = () => {
        this.setOnlineStatus([true, moment().valueOf()]);
    };

    private windowOnBlurListener = () => {
        this.setOnlineStatus([false, moment().valueOf()]);
    };

    private statusUpdateIntervalId = 0;

    state: State = {};

    setOnlineStatus(online: [boolean, number]) {
        if (online[0] !== this.online[0]) {
            tg.setStatus(online[0])
                .subscribe();
        }
        this.online = online;
    }

    setPeer(peer: API.PeerType) {
        this.setState({
            peer: peer
        });
    }

    componentDidMount() {
        window.addEventListener("focus", this.windowOnFocusListener);
        window.addEventListener("blur", this.windowOnBlurListener);
        window.addEventListener("beforeunload", this.windowOnBlurListener);

        this.statusUpdateIntervalId = setInterval(() => {
            if (this.online[0] &&
                tg.onlineUpdatePeriod > 0 &&
                moment().valueOf() > this.online[1] + tg.onlineUpdatePeriod) {

                this.online = [true, moment().valueOf()];
                tg.setStatus(true)
                    .subscribe();
            }
        }, 5000) as any;

        this.setOnlineStatus([document.hasFocus(), moment().valueOf()]);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextState.peer !== this.state.peer;
    }

    componentWillUnmount() {
        window.removeEventListener("focus", this.windowOnFocusListener);
        window.removeEventListener("blur", this.windowOnBlurListener);
        window.removeEventListener("beforeunload", this.windowOnBlurListener);
        clearInterval(this.statusUpdateIntervalId);
    }

    render() {
        const child = this.state.peer ? <Chat peer={this.state.peer}/> : <div/>;
        return (
            <Paper className={css(styles.root)} zDepth={1}>
                <ChatsList
                    selectedPeer={peer => this.setPeer(peer)}/>
                <div className={css(styles.child)}>
                    {
                        child
                    }
                </div>
            </Paper>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "80vw",
        height: "calc(100% - 68px)",
        maxWidth: 1152,
        minWidth: 560,
        display: "flex",
        transition: "none !important",
    },
    child: {
        height: "100%",
        flexGrow: 2,
        minWidth: 320,
    }
});