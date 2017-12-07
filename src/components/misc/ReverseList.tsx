/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from "react";
import { ReactNode } from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridCellProps } from "react-virtualized";

interface Props {
    width: number,
    height: number,
    rowCount: number,
    rowHeight: (index: number) => number,
    rowRenderer: (params: ListRowProps) => ReactNode,
    scrollToBottom: boolean,
    dataHash: number,
    firstItem: any,
    lastItem: any,
    loadMoreRows: () => void,
    onRowsRendered?: (params: { startIndex: number, stopIndex: number }) => void,
}

interface State {

}

export class ReverseList extends React.Component<Props, State> {
    private listHeight = 0;
    private rowHeights: Array<number> = [];
    private gridRef?: Grid;
    private adjustingScroll = false;
    private loadingExtraToFillScreen = false;
    private scrolledToBottom = false;
    private paddingTop = 0;

    recomputeRowHeights() {
        if (this.props.rowCount > 0) {
            this.gridRef!.invalidateCellSizeAfterRender({
                columnIndex: 0,
                rowIndex: 0,
            });
        }
    }

    updateRowHeightsAndOffsets(props: Props) {
        const rowHeights = new Array(props.rowCount)
            .fill(0)
            .map((_, index) => props.rowHeight(index));
        const offsets = new Array(...rowHeights);
        for (let i = 0, offset = 0; i < offsets.length; i++) {
            offsets[i] = offset;
            offset += rowHeights[i];
        }
        this.rowHeights = rowHeights;
        this.listHeight = rowHeights.reduce((sum, height) => sum + height, 0);
    }

    onScroll(params: { clientHeight: number, scrollHeight: number, scrollTop: number }) {
        if (params.scrollTop < params.clientHeight && !this.adjustingScroll && !this.props.scrollToBottom) {
            this.props.loadMoreRows();
        }

        this.scrolledToBottom = params.scrollHeight - params.clientHeight === params.scrollTop;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.dataHash !== this.props.dataHash) {
            this.updateRowHeightsAndOffsets(nextProps);
        }
        if (nextProps.width !== this.props.width) {
            this.updateRowHeightsAndOffsets(nextProps);
            this.recomputeRowHeights();
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.width !== this.props.width
            || nextProps.height !== this.props.height
            || nextProps.rowCount !== this.props.rowCount
            || nextProps.rowHeight !== this.props.rowHeight
            || nextProps.rowRenderer !== this.props.rowRenderer
            || nextProps.scrollToBottom !== this.props.scrollToBottom
            || nextProps.dataHash !== this.props.dataHash
            || nextProps.loadMoreRows !== this.props.loadMoreRows
            || nextProps.onRowsRendered !== this.props.onRowsRendered;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.dataHash !== this.props.dataHash && this.gridRef) {
            if (this.scrolledToBottom &&
                !prevProps.scrollToBottom &&
                prevProps.firstItem !== this.props.firstItem) {
                this.gridRef.scrollToCell({
                    columnIndex: 0,
                    rowIndex: this.props.rowCount - 1,
                });
            } else if (prevProps.lastItem !== this.props.lastItem) {
                this.adjustingScroll = true;

                let diff = 0;
                for (let i = prevProps.rowCount; i < this.props.rowCount; i++) {
                    diff += this.rowHeights[i];
                }

                const listEl = ReactDOM.findDOMNode(this.gridRef);
                requestAnimationFrame(() => {
                    listEl.scrollTop += diff;
                    this.adjustingScroll = false;
                    this.loadingExtraToFillScreen = false;
                });
            }

            // Call load one more time if the there are not enough items to scroll
            const listEl = ReactDOM.findDOMNode(this.gridRef);
            if (listEl.scrollHeight === listEl.clientHeight) {
                requestAnimationFrame(() => {
                    this.loadingExtraToFillScreen = true;
                    this.props.loadMoreRows();
                });
            }

            if (this.listHeight < listEl.clientHeight) {
                if (this.paddingTop !== listEl.clientHeight - this.listHeight) {
                    this.paddingTop = listEl.clientHeight - this.listHeight;
                    (listEl as HTMLElement).style.paddingTop = this.paddingTop + "px";
                }
            } else {
                if (this.paddingTop !== 0) {
                    this.paddingTop = 0;
                    (listEl as HTMLElement).style.paddingTop = "0px";
                }
            }
        }
    }

    rowHeight(index: number) {
        return this.rowHeights[this.props.rowCount - index - 1];
    }

    renderRow(params: GridCellProps): React.ReactNode {
        return this.props.rowRenderer({
            index: this.props.rowCount - params.rowIndex - 1,
            key: params.key,
            style: params.style,
        });
    }

    render() {
        const scrollToIndex = this.props.scrollToBottom || this.loadingExtraToFillScreen ?
            this.props.rowCount - 1 : undefined;
        return (
            <Grid
                ref={ref => this.gridRef = ref!}
                width={this.props.width}
                height={this.props.height}
                rowCount={this.props.rowCount}
                columnCount={1}
                columnWidth={this.props.width}
                rowHeight={params => this.rowHeight(params.index)}
                cellRenderer={params => this.renderRow(params)}
                onSectionRendered={params => {
                    if (!this.props.onRowsRendered) return;
                    this.props.onRowsRendered({
                        startIndex: Math.abs(params.rowStopIndex - this.props.rowCount + 1),
                        stopIndex: Math.abs(params.rowStartIndex - this.props.rowCount + 1),
                    })
                }}
                estimatedRowSize={48}
                horizontalOverscanSize={0}
                verticalOverscanSize={0}
                scrollingResetTimeInterval={0}
                scrollToRow={scrollToIndex}
                scrollToAlignment={"end"}
                onScroll={(params: any) => this.onScroll(params)}
                style={{
                    outline: "none",
                    overflowX: "hidden",
                }}/>
        );
    }
}

export type ListRowProps = {
    index: number,
    key: any,
    style?: React.CSSProperties,
};