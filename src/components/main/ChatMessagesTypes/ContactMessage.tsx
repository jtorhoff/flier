import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Avatar } from "../../misc/Avatar";

export const contactMessage = (contact: API.MessageMediaContact) => {
    const title = [contact.firstName.string, contact.lastName.string].join(" ");

    return (
        <div style={{
            height: 48,
            width: "100%",
            display: "flex",
        }}>
            <div style={{
                float: "left",
                alignSelf: "center",
            }}>
                <Avatar id={contact.userId.value} title={title}/>
            </div>
            <div style={{
                height: "100%",
                paddingLeft: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>
                <span style={{
                    fontWeight: 500,
                }}>
                    {
                        title
                    }
                </span>
                <span>
                    {
                        contact.phoneNumber.string
                    }
                </span>
            </div>
        </div>
    );
};