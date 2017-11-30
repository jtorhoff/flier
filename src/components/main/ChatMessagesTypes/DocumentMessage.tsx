import { StyleSheet, css } from "aphrodite/no-important";
import { fullWhite, lightBlack } from "material-ui/styles/colors";
import { EditorInsertDriveFile } from "material-ui/svg-icons";
import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";
import { readableFileSize } from "../../../misc/ReadableFileSize";

export const documentMessage = (document: API.Document) => {
    const filename = document.attributes.items.find(
        a => a instanceof API.DocumentAttributeFilename) as API.DocumentAttributeFilename;
    return (
        <div className={css(styles.root)}>
            <div className={css(styles.button)}>
                <EditorInsertDriveFile color={fullWhite}/>
            </div>
            <div className={css(styles.meta)}>
                <span className={css(styles.title)}>
                    {
                        filename.fileName.string
                    }
                </span>
                <span className={css(styles.size)}>
                    {
                        readableFileSize(document.size.value)
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
    size: {
        color: lightBlack,
        fontSize: 13,
        marginTop: 4,
    }
});