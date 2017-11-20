import * as React from "react";
import { API } from "../../../tg/Codegen/API/APISchema";
import { GIF } from "../../misc/GIF";
import { measureMedia } from "../../../misc/MediaMeasurer";
import { Photo } from "../../misc/Photo";
import { StyleSheet, css } from "aphrodite/no-important";

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

