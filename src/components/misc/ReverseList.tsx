import { List } from "immutable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    List as VirtualList,
    ListRowRenderer,
    ListRowProps
} from "react-virtualized";

interface Props {
    width: number,
    height: number,
    data: List<any>,
    rowHeight: (index: number) => number,
    rowRenderer: ListRowRenderer,
    loadMoreRows: () => void,
    overscanRowCount?: number,
    scrollToBottom?: boolean,
}

interface State {

}

export class ReverseList extends React.Component<Props, State> {
    private adjustingScroll = false;
    private scrollTop = 0;

    state: State = {};

    recomputeRowHeights() {
        (this.refs["list"] as VirtualList).recomputeRowHeights();
    }

    onScroll(params: { clientHeight: number, scrollHeight: number, scrollTop: number }) {
        if (params.scrollTop < params.clientHeight && !this.adjustingScroll && !this.props.scrollToBottom) {
            this.props.loadMoreRows();
        }

        if (params.scrollTop > 0) {
            this.scrollTop = params.scrollTop;
        }
    }

    rowHeight(index: number): number {
        return this.props.rowHeight(this.props.data.size - index - 1);
    }

    renderRow(params: ListRowProps): React.ReactNode {
        return this.props.rowRenderer({
            ...params,
            index: this.props.data.size - params.index - 1
        });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.width !== this.props.width
            || nextProps.height !== this.props.height
            || !nextProps.data.equals(this.props.data)
            || nextProps.rowHeight !== this.props.rowHeight
            || nextProps.rowRenderer !== this.props.rowRenderer
            || nextProps.loadMoreRows !== this.props.loadMoreRows
            || nextProps.overscanRowCount !== this.props.overscanRowCount
            || nextProps.scrollToBottom !== this.props.scrollToBottom;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!prevProps.data.equals(this.props.data) && this.refs["list"]) {
            if (!prevProps.scrollToBottom) {
                this.adjustingScroll = true;

                (this.refs["list"] as VirtualList).measureAllRows();
                let diff = 0;
                for (let i = prevProps.data.size; i < this.props.data.size; i++) {
                    diff += this.props.rowHeight(i);
                }

                const listEl = ReactDOM.findDOMNode(this.refs["list"])!;
                requestAnimationFrame(() => {
                    listEl.scrollTop += diff + this.scrollTop;
                    this.adjustingScroll = false;
                });
            }

            const listEl = ReactDOM.findDOMNode(this.refs["list"])!;
            if (listEl.scrollHeight === listEl.clientHeight) {
                requestAnimationFrame(() => {
                    this.props.loadMoreRows();
                });
            }
        }
    }

    render() {
        const scrollToIndex = this.props.scrollToBottom ?
            this.props.data.size - 1 : undefined;
        return (
            <VirtualList
                key={this.props.data.hashCode()}
                ref="list"
                width={this.props.width}
                height={this.props.height}
                rowHeight={params => this.rowHeight(params.index)}
                overscanRowCount={this.props.overscanRowCount || 0}
                rowCount={this.props.data.size}
                rowRenderer={params => this.renderRow(params)}
                scrollToIndex={scrollToIndex}
                onScroll={(params: any) => this.onScroll(params)}
                style={{
                    outline: "none"
                }}/>
        );
    }
}