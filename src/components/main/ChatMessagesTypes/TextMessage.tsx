import { darkBlack } from "material-ui/styles/colors";
import * as React from "react";
import { CSSProperties } from "react";

export const textMessage = (message: string) => {
    return (
        <span style={style}>
            {
                message
            }
        </span>
    );
};

const style: CSSProperties = {
    color: darkBlack,
    maxWidth: "60ch",
    display: "inline-block",
    wordBreak: "break-word",
    hyphens: "auto",
    whiteSpace: "pre-wrap",
};