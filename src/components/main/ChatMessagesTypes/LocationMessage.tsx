/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { StyleSheet, css } from "aphrodite/no-important";
import { lightBlack } from "material-ui/styles/colors";
import * as React from "react";
import * as URI from "urijs";
import { API } from "../../../tg/Codegen/API/APISchema";

export const locationMessage = (geoPoint: API.GeoPoint) => {
    const tileQuery = {
        center: [geoPoint.lat.value, geoPoint.long.value].join(","),
        zoom: 15,
        size: [250, 144].join("x"),
        scale: devicePixelRatio > 1 ? 2 : 1,
        language: navigator.language,
        key: apiKey,
    };
    const tileUrl = apiUrl.query(tileQuery).toString();
    const targetUrl = googleMapsUrl({
        lat: geoPoint.lat.value,
        long: geoPoint.long.value,
        zoom: 17,
    });

    return (
        <a href={targetUrl} target={"_blank"} className={css(styles.tile, styles.location)}>
            <img src={tileUrl} width={250} height={144}/>
            <div className={css(styles.marker)}/>
        </a>
    );
};

export const venueMessage = (geoPoint: API.GeoPoint, title: string, address: string) => {
    const tileQuery = {
        center: [geoPoint.lat.value, geoPoint.long.value].join(","),
        zoom: 15,
        size: [96, 96].join("x"),
        scale: devicePixelRatio > 1 ? 2 : 1,
        language: navigator.language,
        key: apiKey,
    };
    const tileUrl = apiUrl.query(tileQuery).toString();
    const targetUrl = googleMapsUrl({
        lat: geoPoint.lat.value,
        long: geoPoint.long.value,
        zoom: 17,
        q: [title, address].join(", "),
    });

    return (
        <div className={css(styles.venue)}>
            <a href={targetUrl}
               target={"_blank"}
               className={css(styles.tile, styles.venueTile)}>
                <img src={tileUrl} width={96} height={96}/>
                <div className={css(styles.marker)}/>
            </a>
            <div className={css(styles.venueInfo)}>
                <span>
                    {
                        title
                    }
                </span>
                <span className={css(styles.venueInfoAddress)}>
                    {
                        address
                    }
                </span>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    tile: {
        borderRadius: 4,
        display: "block",
        overflow: "hidden",
        position: "relative",
    },
    location: {
        width: 250,
        height: 144,
    },
    venue: {
        width: "100%",
        height: 96,
    },
    venueTile: {
        width: 96,
        height: 96,
        float: "left",
    },
    venueInfo: {
        height: "100%",
        paddingLeft: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    venueInfoAddress: {
        color: lightBlack,
    },
    marker: {
        width: 16,
        height: 16,
        background: "rgba(61, 129, 161, 1)",
        borderRadius: "50%",
        borderColor: "white",
        borderWidth: 4,
        borderStyle: "solid",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "rgba(0, 0, 0, 0.2) 0 0 30px 2px, rgba(0, 0, 0, 0.3) 0 0 10px",
    }
});

const apiUrl = new URI("https://maps.googleapis.com/maps/api/staticmap");
const apiKey = "AIzaSyDufISaoD_9ADIpWCwVbm__zMKoxUO6dao";

const googleMapsUrl = (params: { lat: number, long: number, zoom: number, q?: string }) => {
    let uri: string;
    if (params.q) {
        uri = `https://www.google.com/maps/search/${params.q}/@${[params.lat, params.long, params.zoom + "z"].join(",")}`;
    } else {
        uri = `https://www.google.com/maps/search/@${[params.lat, params.long, params.zoom + "z"].join(",")}`;
    }

    return encodeURI(uri);
};