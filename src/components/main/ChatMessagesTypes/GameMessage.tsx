/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { StyleSheet, css } from "aphrodite/no-important";
import * as React from "react";
import { measureMedia } from "../../../misc/MediaMeasurer";
import { API } from "../../../tg/Codegen/API/APISchema";
import { GIF } from "../../misc/GIF";
import { Photo } from "../../misc/Photo";

export const gameMessage = (game: API.Game) => {
    let preview: JSX.Element | undefined = undefined;
    if (game.document instanceof API.Document) {
        const size = measureMedia(
            gameMessagePreviewMaxSize,
            gameMessagePreviewMaxSize,
            game.document.thumb);
        preview = (
            <GIF width={size.width}
                 height={size.height}
                 document={game.document}/>
        );
    } else if (game.photo instanceof API.Photo) {
        const size = measureMedia(
            gameMessagePreviewMaxSize,
            gameMessagePreviewMaxSize,
            ...game.photo.sizes.items);
        preview = <Photo width={size.width}
                         height={size.height}
                         photo={game.photo}/>
    } else {
        preview = <span/>;
    }

    return (
        <div className={css(styles.root)}>
            <span className={css(styles.title)}>
                {
                    game.title.string
                }
            </span>
            <div className={css(styles.preview)}>
                {
                    preview
                }
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    root: {
        borderLeft: "2px solid rgb(61, 129, 161)",
        paddingLeft: 8,
    },
    title: {
        fontWeight: 500,
        color: "rgb(61, 129, 161)",
        height: 18,
    },
    preview: {
        marginTop: 4,
    }
});

export const gameMessagePreviewMaxSize = 250;

