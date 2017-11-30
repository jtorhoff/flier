import { StyleSheet, css } from "aphrodite/no-important";
import { darkWhite, fullWhite, lightBlack } from "material-ui/styles/colors";
import { AvPlayArrow } from "material-ui/svg-icons";
import * as React from "react";
import { decodePCM } from "../../../misc/PCMUtils";
import { API } from "../../../tg/Codegen/API/APISchema";
import { Waveform } from "../../misc/Waveform";
import * as moment from "moment";

export const voiceMessage = (document: API.Document) => {
    const attr = document.attributes.items.find(
        a => a instanceof API.DocumentAttributeAudio) as API.DocumentAttributeAudio;
    let waveform: Array<number> | undefined;
    if (attr.waveform) {
        waveform = decodePCM(attr.waveform.bytes);
    }

    const duration = moment.utc(attr.duration.value * 1000)
        .format("m:ss");

    return (
        <div className={css(styles.root)}>
            <div className={css(styles.button)}>
                <AvPlayArrow color={fullWhite}/>
            </div>
            <div className={css(styles.waveform)}>
                {
                    waveform &&
                    <Waveform waveform={waveform} duration={attr.duration.value}/>
                }
                <span className={css(styles.meta)}>
                    {
                        duration
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
    button: {
        width: 40,
        height: 40,
        background: "rgb(61, 129, 161)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },
    waveform: {
        height: 40,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: 12,
    },
    meta: {
        color: lightBlack,
        fontSize: 13,
        marginTop: 4,
    }
});