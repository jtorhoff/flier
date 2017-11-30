import { StyleSheet, css } from "aphrodite/no-important";
import { lightBlack, green500, red500 } from "material-ui/styles/colors";
import {
    CommunicationCallMade,
    CommunicationPhone, CommunicationCallReceived
} from "material-ui/svg-icons";
import * as moment from "moment";
import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";

export const phoneCallMessage = (call: API.MessageActionPhoneCall, out: boolean) => {
    let info = undefined;
    if (call.reason instanceof API.PhoneCallDiscardReasonHangup && call.duration) {
        let duration = moment.utc(call.duration.value * 1000);
        if (duration.hours()) {
            info = `${duration.hours()} hours ${duration.minutes()} minutes`;
        } else if (duration.minutes()) {
            info = `${duration.minutes()} minutes`;
        } else if (duration.seconds()) {
            info = `${duration.seconds()} seconds`;
        }
    } else if (call.reason instanceof API.PhoneCallDiscardReasonMissed) {
        info = "Missed";
    } else {
        info = "Cancelled";
    }

    let title = undefined;
    if (out) {
        title = "Outgoing call";
    } else {
        title = "Incoming call";
    }

    return (
        <div className={css(styles.root)}>
            <div className={css(styles.icon)}>
                <CommunicationPhone
                    color={lightBlack}
                    style={{
                        width: 32,
                        height: 32,
                    }}/>
            </div>
            <div className={css(styles.meta)}>
                <div className={css(styles.title)}>
                    {
                        title
                    }
                </div>
                <div className={css(styles.info)}>
                    {
                        out &&
                        <CommunicationCallMade
                            color={call.duration ? green500 : red500}
                            style={{
                                width: 16,
                                height: 16,
                                marginRight: 6,
                            }}/>
                    }
                    {
                        !out &&
                        <CommunicationCallReceived
                            color={call.duration ? green500 : red500}
                            style={{
                                width: 16,
                                height: 16,
                                marginRight: 6,
                            }}/>
                    }
                    {
                        info
                    }
                </div>
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
    icon: {
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    meta: {
        height: 40,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: 12,
    },
    title: {
        fontWeight: 500,
    },
    info: {
        color: lightBlack,
        fontSize: 13,
        marginTop: 4,
        display: "inline-flex",
        alignItems: "center",
    }
});