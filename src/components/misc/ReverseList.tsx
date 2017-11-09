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
    loadMoreRows: () => void,
}

interface State {
    paddingTop: number,
}

export class ReverseList extends React.Component<Props, State> {
    private listHeight = 0;
    private rowHeights: Array<number> = [];
    private gridRef?: Grid;
    private adjustingScroll = false;
    private loadingExtraToFillScreen = false;

    state: State = {
        paddingTop: 0,
    };

    recomputeRowHeights() {
        if (this.props.rowCount > 0) {
            this.gridRef!.recomputeGridSize();
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
            || nextState.paddingTop !== this.state.paddingTop;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.dataHash !== this.props.dataHash && this.gridRef) {
            if (!prevProps.scrollToBottom) {
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
                this.setState({
                    paddingTop: listEl.clientHeight - this.listHeight,
                });
            } else {
                this.setState({
                    paddingTop: 0,
                });
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
                horizontalOverscanSize={0}
                verticalOverscanSize={0}
                scrollingResetTimeInterval={0}
                scrollToRow={scrollToIndex}
                onScroll={(params: any) => this.onScroll(params)}
                style={{
                    outline: "none",
                    overflowX: "hidden",
                    paddingTop: this.state.paddingTop,
                }}/>
        );
    }
}

export type ListRowProps = {
    index: number,
    key: any,
    style?: React.CSSProperties,
};