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
    rowHeight: ((params: { index: number }) => number),
    rowRenderer: ListRowRenderer,
    loadMoreRows: () => void,
    overscanRowCount?: number,
    scrollToBottom?: boolean,
}

interface State {
    scrollTop?: number,
}

export class ReverseList extends React.Component<Props, State> {
    private listRef?: VirtualList;
    private adjustingScroll = false;
    private clientHeight = 0;

    state: State = {

    };

    recomputeRowHeights() {
        if (this.listRef) {
            this.listRef.recomputeRowHeights();
        }
    }

    onScroll(params: { clientHeight: number, scrollHeight: number, scrollTop: number }) {
        if (params.scrollTop < params.clientHeight && !this.adjustingScroll && !this.props.scrollToBottom) {
            this.props.loadMoreRows();
        }

        this.clientHeight = params.clientHeight;
    }

    rowHeight(index: number): number {
        return this.props.rowHeight({
            index: this.props.data.size - index - 1,
        });
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
            || nextProps.scrollToBottom !== this.props.scrollToBottom
            || nextState.scrollTop !== this.state.scrollTop;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!prevProps.data.equals(this.props.data) && this.listRef && !prevProps.scrollToBottom) {
            this.adjustingScroll = true;

            this.listRef.measureAllRows();
            let diff = 0;
            for (let i = prevProps.data.size; i < this.props.data.size; i++) {
                diff += this.props.rowHeight({ index: i });
            }

            const listEl = ReactDOM.findDOMNode(this.listRef)!;
            requestAnimationFrame(() => {
                listEl.scrollTop += diff + this.clientHeight;
                this.adjustingScroll = false;
            });
        }
    }

    render() {
        const scrollToIndex = this.props.scrollToBottom ?
            this.props.data.size - 1 : undefined;
        return (
            <VirtualList
                key={this.props.data.hashCode()}
                ref={listRef => {
                    this.listRef = listRef!;
                }}
                width={this.props.width}
                height={this.props.height}
                rowHeight={params => this.rowHeight(params.index)}
                overscanRowCount={this.props.overscanRowCount || 0}
                rowCount={this.props.data.size}
                rowRenderer={params => this.renderRow(params)}
                scrollToIndex={scrollToIndex}
                onScroll={(params: any) => this.onScroll(params)}
                scrollTop={this.state.scrollTop}
                style={{
                    outline: "none"
                }}/>
        );
    }
}