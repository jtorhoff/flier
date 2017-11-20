import * as React from "react";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../../../tg/Codegen/API/APISchema";
import { tg } from "../../../App";

interface Props {
    from: API.User,
    userIds: Array<number>,
}

interface State {
    userNames: Array<string>,
}

export class ChatAddedUsersMessage extends React.Component<Props, State> {
    private usersSubscription?: Subscription;

    state: State = {
        userNames: ["user(s)"],
    };

    componentDidMount() {
        this.usersSubscription = tg.getUsers(...this.props.userIds)
            .map(users => users.map(user => user.firstName!.string))
            .subscribe(users => {
                this.setState({
                    userNames: users,
                });
            });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.from !== this.props.from
            || nextProps.userIds !== this.props.userIds
            || nextState.userNames !== this.state.userNames;
    }

    componentWillUnmount() {
        if (this.usersSubscription) {
            this.usersSubscription.unsubscribe();
        }
    }

    render() {
        return (
            <span>
                {
                    this.props.from.firstName!.string
                }
                {
                    " added "
                }
                {
                    this.state.userNames.join(", ")
                }
                {
                    " to the group"
                }
            </span>
        );
    }
}