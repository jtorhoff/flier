/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from "react";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../../../tg/Codegen/API/APISchema";
import { tg } from "../../../App";

interface Props {
    from: API.User,
    userId: number,
}

interface State {
    userName: string,
}

export class ChatDeleteUserMessage extends React.Component<Props, State> {
    private userSubscription?: Subscription;

    state: State = {
        userName: "user",
    };

    componentDidMount() {
        this.userSubscription = tg.getUsers(this.props.userId)
            .map(users => users.map(user => user.firstName!.string))
            .flatMap(users => users)
            .subscribe(user => {
                this.setState({
                    userName: user
                });
            });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.from !== this.props.from
            || nextProps.userId !== this.props.userId
            || nextState.userName !== this.state.userName;
    }

    componentWillUnmount() {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }

    render() {
        return (
            <span>
                {
                    this.props.from.firstName!.string
                }
                {
                    " removed "
                }
                {
                    this.state.userName
                }
                {
                    " from the group"
                }
            </span>
        );
    }
}