import { darkBlack } from "material-ui/styles/colors";
import * as React from "react";
import { CSSProperties } from "react";
import { API } from "../../../tg/Codegen/API/APISchema";

export const textMessage = (message: string, entities?: Array<API.MessageEntityType>) => {
    return (
        <span style={style}>
            {
                entities ? resolveEntities(message, entities) : message
            }
        </span>
    );
};

const resolveEntities = (msg: string, entities: Array<API.MessageEntityType>) => {
    const result: Array<string | JSX.Element> = [];
    for (let i = 0; i < entities.length; i++) {
        if (i === 0) {
            result.push(msg.substring(0, entities[0].offset.value));
        }
        result.push(jsxElementForEntity(msg, entities[i]));
        let end = 0;
        if (i === entities.length - 1) {
            end = msg.length;
        } else {
            end = entities[i + 1].offset.value;
        }
        result.push(msg.substring(entities[i].offset.value + entities[i].length.value, end));
    }

    return result
        .filter(item => item !== "");
};

const jsxElementForEntity = (msg: string, entity: API.MessageEntityType) => {
    const entityOffset = entity.offset.value;
    const entityLength = entity.length.value;

    const spannedString = msg.substr(entityOffset, entityLength);
    if (entity instanceof API.MessageEntityBold) {
        return (
            <strong key={entityOffset} style={{ fontWeight: 600 }}>
                {
                    spannedString
                }
            </strong>
        );
    } else if (entity instanceof API.MessageEntityBotCommand) {
        // TODO
        return (
            <span key={entityOffset}>
                {
                    spannedString
                }
            </span>
        );
    } else if (entity instanceof API.MessageEntityCode) {
        return (
            <span key={entityOffset} style={entityCodeSpanStyle}>
                {
                    spannedString
                }
            </span>
        );
    } else if (entity instanceof API.MessageEntityEmail) {
        return (
            <a key={entityOffset} href={"mailto:" + spannedString}>
                {
                    spannedString
                }
            </a>
        );
    } else if (entity instanceof API.MessageEntityHashtag) {
        // TODO
        return (
            <span key={entityOffset}>
                {
                    spannedString
                }
            </span>
        );
    } else if (entity instanceof API.MessageEntityItalic) {
        return (
            <i key={entityOffset}>
                {
                    spannedString
                }
            </i>
        );
    } else if (entity instanceof API.MessageEntityMention) {
        // TODO
        return (
            <span key={entityOffset}>
                {
                    spannedString
                }
            </span>
        );
    } else if (entity instanceof API.MessageEntityMentionName) {
        // TODO
        return (
            <span key={entityOffset}>
                {
                    spannedString
                }
            </span>
        );
    } else if (entity instanceof API.MessageEntityPre) {
        return (
            <span key={entityOffset} style={entityPreSpanStyle}>
                {
                    spannedString
                }
            </span>
        );
    } else if (entity instanceof API.MessageEntityTextUrl) {
        return (
            <a key={entityOffset} href={entity.url.string} target="_blank">
                {
                    spannedString
                }
            </a>
        );
    } else if (entity instanceof API.MessageEntityUrl) {
        return (
            <a key={entityOffset} href={spannedString} target="_blank">
                {
                    spannedString
                }
            </a>
        );
    }

    return spannedString;
};

const style: CSSProperties = {
    color: darkBlack,
    maxWidth: "60ch",
    display: "inline-block",
    wordBreak: "break-word",
    hyphens: "auto",
    whiteSpace: "pre-wrap",
};

const entityCodeSpanStyle: CSSProperties = {
    fontFamily: "Menlo, Monaco, 'Courier New', Courier, monospace",
};

const entityPreSpanStyle: CSSProperties = {
    fontFamily: "Menlo, Monaco, 'Courier New', Courier, monospace",
};