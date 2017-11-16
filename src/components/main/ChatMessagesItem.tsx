import { StyleSheet, css } from "aphrodite/no-important";
import * as moment from "moment";
import * as React from "react";
import { API } from "../../tg/Codegen/API/APISchema";
import { MessageType } from "../../tg/Convenience/Message";
import { Message, Chat } from "../../tg/TG";
import { TLString } from "../../tg/TL/Types/TLString";
import { Avatar } from "../misc/Avatar";
import { contactMessage } from "./ChatMessagesTypes/ContactMessage";
import { gifMessage } from "./ChatMessagesTypes/GifMessage";
import {
    locationMessage,
    venueMessage
} from "./ChatMessagesTypes/LocationMessage";
import { photoMessage } from "./ChatMessagesTypes/PhotoMessage";
import { stickerMessage } from "./ChatMessagesTypes/StickerMessage";
import { textMessage } from "./ChatMessagesTypes/TextMessage";
import { videoMessage } from "./ChatMessagesTypes/VideoMessage";
import { voiceMessage } from "./ChatMessagesTypes/VoiceMessage";

interface Props {
    chat: Chat,
    message: Message,
    compact: boolean,
}

interface State {

}

export class ChatMessagesItem extends React.Component<Props, State> {
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.chat.readInboxMaxId !== this.props.chat.readInboxMaxId
            || nextProps.chat.readOutboxMaxId !== this.props.chat.readOutboxMaxId
            || nextProps.chat.title !== this.props.chat.title
            || nextProps.chat.photoSmall !== this.props.chat.photoSmall
            || nextProps.message !== this.props.message
            || nextProps.compact !== this.props.compact;
    }

    render() {
        let id = 0;
        let title;
        let photo: API.FileLocation | undefined = undefined;
        if (this.props.message.from instanceof API.User) {
            const user = this.props.message.from;
            const firstName = user.firstName || TLString.empty;
            const lastName = user.lastName || TLString.empty;
            id = user.id.value;
            title = [firstName.string, lastName.string]
                .join(" ")
                .trim();

            if (user.photo instanceof API.UserProfilePhoto &&
                user.photo.photoSmall instanceof API.FileLocation) {
                photo = user.photo.photoSmall;
            }
        } else if (this.props.message.peer instanceof API.PeerChannel) {
            title = this.props.chat.title;
            photo = this.props.chat.photoSmall;
        }

        if (!title || title === "") {
            title = "Not Available";
        }

        let content: JSX.Element | string | undefined = undefined;
        if (this.props.message.type === MessageType.Text) {
            content = textMessage(this.props.message.message!, this.props.message.entities);
        } else if (this.props.message.type === MessageType.Photo) {
            content = photoMessage(this.props.message.media as API.MessageMediaPhoto);
        } else if (this.props.message.type === MessageType.Sticker) {
            content = stickerMessage((this.props.message.media as API.MessageMediaDocument).document as API.Document);
        } else if (this.props.message.type === MessageType.Location) {
            const geo = (this.props.message.media as API.MessageMediaGeo);
            if (geo.geo instanceof API.GeoPoint) {
                content = locationMessage(geo.geo);
            }
        } else if (this.props.message.type === MessageType.Venue) {
            const venue = (this.props.message.media as API.MessageMediaVenue);
            if (venue.geo instanceof API.GeoPoint) {
                content = venueMessage(venue.geo, venue.title.string, venue.address.string);
            }
        } else if (this.props.message.type === MessageType.Contact) {
            const contact = this.props.message.media as API.MessageMediaContact;
            content = contactMessage(contact);
        } else if (this.props.message.type === MessageType.GIF) {
            const document = (this.props.message.media as API.MessageMediaDocument).document;
            if (document instanceof API.Document) {
                content = gifMessage(document);
            }
        } else if (this.props.message.type === MessageType.Video) {
            const document = (this.props.message.media as API.MessageMediaDocument).document;
            if (document instanceof API.Document) {
                content = videoMessage(document);
            }
        } else if (this.props.message.type === MessageType.Voice) {
            const document = (this.props.message.media as API.MessageMediaDocument).document;
            if (document instanceof API.Document) {
                content = voiceMessage(document);
            }
        }

        const date = moment.unix(this.props.message.date);
        return (
            <div className={css(styles.root)} style={{
                padding: this.props.compact ? "6px 20px 6px 16px" : "4px 20px 4px 16px",
            }}>
                <div className={css(styles.avatarRow)}>
                    {
                        !this.props.compact &&
                        <Avatar id={id}
                                title={title}
                                photo={photo}/>
                    }
                </div>
                <div className={css(styles.contentRow)}>
                    {
                        !this.props.compact &&
                        <div className={css(styles.title)}>
                            {
                                title
                            }
                        </div>
                    }
                    <div className={css(styles.content)} style={{
                        marginTop: this.props.compact ? undefined : 4
                    }}>
                        {
                            content
                        }
                    </div>
                </div>
                <div className={css(styles.metaRow, this.props.compact && styles.contentRowCompact)}>
                    {
                        date.format("LT")
                    }
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        display: "flex",
    },
    avatarRow: {
        width: 40,
        flexGrow: 0,
        flexShrink: 0,
    },
    contentRow: {
        marginLeft: 12,
        marginRight: 32,
        flexGrow: 1,
        flexShrink: 1,
        alignSelf: "baseline",
    },
    contentRowCompact: {
        alignSelf: "center",
    },
    metaRow: {
        fontSize: 12,
        color: "rgba(0,0,0,0.44)",
        flexGrow: 0,
        flexShrink: 0,
        cursor: "default",
    },
    title: {
        width: "100%",
        height: 16,
        fontSize: 14,
        lineHeight: "16px",
        fontWeight: 500,
        alignSelf: "baseline",
        wordBreak: "break-all",
        overflow: "hidden",
        color: "rgba(61, 129, 161, 1)",
    },
    content: {
        width: "100%",
        fontSize: 14,
    }
});