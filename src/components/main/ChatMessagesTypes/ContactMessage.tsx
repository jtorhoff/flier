import { StyleSheet, css } from "aphrodite/no-important";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Avatar } from "../../misc/Avatar";

export const contactMessage = (contact: API.MessageMediaContact) => {
    const title = [contact.firstName.string, contact.lastName.string].join(" ");
    let phoneNumber = contact.phoneNumber.string;
    if (phoneNumber.startsWith("+")) {
        try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            phoneNumber = phoneUtil.format(
                phoneUtil.parse(phoneNumber),
                PhoneNumberFormat.INTERNATIONAL);
        } catch (e) {
            // Ignore errors
        }
    }

    return (
        <div className={css(styles.root)}>
            <div className={css(styles.avatar)}>
                <Avatar id={contact.userId.value} title={title}/>
            </div>
            <div className={css(styles.info)}>
                <span className={css(styles.name)}>
                    {
                        title
                    }
                </span>
                <span>
                    {
                        phoneNumber
                    }
                </span>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    root: {
        height: 48,
        width: "100%",
        display: "flex",
    },
    avatar: {
        float: "left",
        alignSelf: "center",
        flexShrink: 0,
    },
    info: {
        height: "100%",
        paddingLeft: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    name: {
        fontWeight: 500,
    }
});