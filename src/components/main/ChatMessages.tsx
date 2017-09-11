import { List } from "immutable";
import * as React from "react";
import { CSSProperties } from "react";
import {
    List as VirtualizedList,
    InfiniteLoader,
    AutoSizer,
    ListRowProps,
    IndexRange
} from "react-virtualized";
import { Message } from "../../tg/TG";
import { ChatMessagesItem } from "./ChatMessagesItem";

interface Props {

}

interface State {
    messages: List<Message>,
}

export class ChatMessages extends React.Component<Props, State> {
    private loadingMessages = false;
    private allMessagesLoaded = false;

    state: State = {
        messages: List(),
    };

    isRowLoaded(params: { index: number }): boolean {
        return this.allMessagesLoaded || params.index < this.state.messages.size;
    }

    loadMoreRows(params: IndexRange): Promise<any> {
        if (this.loadingMessages) return Promise.resolve();
        //
        // this.loadingChats = true;
        // tg.getChats(30, this.state.chats.get(params.startIndex - 1))
        //     .subscribe(chats => {
        //             if (chats.length === 0) {
        //                 this.allChatsLoaded = true;
        //             } else {
        //                 this.setState({
        //                     chats: this.state.chats.concat(chats).toList(),
        //                 });
        //             }
        //         },
        //         error => {
        //
        //         },
        //         () => {
        //             this.loadingChats = false;
        //         });

        return Promise.resolve();
    }

    rowCount(): number {
        return this.allMessagesLoaded ?
            this.state.messages.size :
            this.state.messages.size + 1;
    }

    rowHeight(params: { index: number }): number {
        return 0;
    }

    renderRow(params: ListRowProps): React.ReactNode {
        return (
            <div key={params.key} style={params.style}>
                <ChatMessagesItem
                    message={this.state.messages.get(params.index)}/>
            </div>
        );
    }

    render() {
        return (
            <div style={style}>
                <InfiniteLoader
                    isRowLoaded={params => this.isRowLoaded(params)}
                    loadMoreRows={params => this.loadMoreRows(params)}
                    rowCount={this.rowCount()}>
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer>
                            {({ width, height }) => (
                                <VirtualizedList
                                    ref={registerChild}
                                    width={width}
                                    height={height}
                                    rowHeight={params => this.rowHeight(params)}
                                    overscanRowCount={5}
                                    rowCount={this.state.messages.size}
                                    rowRenderer={params => this.renderRow(params)}
                                    onRowsRendered={onRowsRendered}
                                    style={{
                                        outline: "none"
                                    }}/>
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </div>
        );
    }
}

const style: CSSProperties = {
    flexGrow: 1,
};