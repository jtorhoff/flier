import * as React from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { Message } from "../../tg/TG";
import { TLString } from "../../tg/TL/Types/TLString";
import { Avatar } from "../misc/Avatar";

interface Props {
    message: Message,
}

interface State {

}

export class ChatMessagesItem extends React.Component<Props, State> {
    render() {
        let title;
        let photo: API.FileLocation | undefined = undefined;
        if (this.props.message.from instanceof API.User) {
            const user = this.props.message.from;
            const firstName = user.firstName || TLString.empty;
            const lastName = user.lastName || TLString.empty;
            title = [firstName.string, lastName.string]
                .join(" ")
                .trim();

            if (user.photo instanceof API.UserProfilePhoto &&
                user.photo.photoSmall instanceof API.FileLocation) {
                photo = user.photo.photoSmall;
            }
        } else {
            title = TLString.empty.string;
        }

        return (
            <div>
                <Avatar id={this.props.message.id}
                        title={title}
                        photo={photo}/>
            </div>
        );
    }
}