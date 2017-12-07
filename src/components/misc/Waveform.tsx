/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { primaryColor } from "../App";

interface Props {
    waveform: Array<number>,
    duration: number,
}

interface State {

}

export class Waveform extends React.Component<Props, State> {
    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs["canvas"]) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d")!;

        ctx.lineWidth = 2 * devicePixelRatio;
        ctx.lineCap = "round";
        ctx.strokeStyle = primaryColor;
        // Flip the coordinate system on the y-axis
        ctx.translate(ctx.lineWidth, waveformHeight * devicePixelRatio);
        ctx.scale(1, -1);

        let scalingFactor: number = 2;
        if (this.props.duration <= 3) {
            scalingFactor = 5;
        } else if (this.props.duration <= 5) {
            scalingFactor = 4;
        } else if (this.props.duration <= 15) {
            scalingFactor = 3;
        }

        const normalized = normalize(rescale(this.props.waveform, scalingFactor), 31);
        const ceiling = waveformHeight * devicePixelRatio - ctx.lineWidth;

        const paddedLineWidth = ctx.lineWidth + devicePixelRatio;
        ctx.beginPath();
        for (let i = 0; i < normalized.length; i++) {
            ctx.moveTo(i * (paddedLineWidth) + i, 0);
            ctx.lineTo(i * (paddedLineWidth) + i, Math.max(normalized[i] / 31 * ceiling, devicePixelRatio));
        }
        ctx.stroke();
    }

    render() {
        return (
            <canvas ref="canvas"
                    width={waveformWidth * devicePixelRatio}
                    height={waveformHeight * devicePixelRatio}
                    style={{
                        width: waveformWidth,
                        height: waveformHeight,
                    }}>
            </canvas>
        );
    }
}

export const waveformWidth = 177;
export const waveformHeight = 16;

const rescale = (array: Array<number>, avg: number) => {
    const result = new Array((array.length / avg) | 0);
    for (let i = 0; i < result.length; i++) {
        result[i] = Math.max(...array.slice(i * avg, i * avg + avg));
    }
    return result;
};

const normalize = (array: Array<number>, constant: number) => {
    const max = Math.max(...array);
    return array.map(value => value / max * constant);
};