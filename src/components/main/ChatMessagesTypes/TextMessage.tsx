/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { StyleSheet, css } from "aphrodite/no-important";
import { darkBlack } from "material-ui/styles/colors";
import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";

export const textMessage = (message: string, entities?: Array<API.MessageEntityType>) => {
    return (
        <span className={css(styles.root)}>
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
            <span key={entityOffset} className={css(styles.pre)}>
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
            <em key={entityOffset}>
                {
                    spannedString
                }
            </em>
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
            <span key={entityOffset} className={css(styles.pre)}>
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
        const href = spannedString.startsWith("http") ? spannedString : "//" + spannedString;
        return (
            <a key={entityOffset} href={href} target="_blank">
                {
                    spannedString
                }
            </a>
        );
    }

    return spannedString;
};

const styles = StyleSheet.create({
    root: {
        color: darkBlack,
        maxWidth: "60ch",
        display: "inline-block",
        wordBreak: "break-word",
        hyphens: "auto",
        whiteSpace: "pre-wrap",
        fontSize: "14px",
        lineHeight: "16px",
    },
    pre: {
        fontFamily: "Menlo, Monaco, 'Courier New', Courier, monospace",
    }
});