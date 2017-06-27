import { List, makeSelectable, Divider } from "material-ui";
import * as React from "react";
import { CSSProperties } from "react";
import * as V from "react-virtualized";
import { IndexRange } from "react-virtualized";
import { Chat } from "../../tg/TG";
import { tg } from "../App";
import { ChatsListItem } from "./ChatsListItem";

interface Props {

}

interface State {
    chats: Chat[],
}

export class ChatsList extends React.Component<Props, State> {
    loadingChats = false;
    allChatsLoaded = false;

    state: State = {
        chats: [],
    };

    componentWillMount() {
        this.loadingChats = true;
        tg.getChats(30).subscribe(chats => {
                this.setState({
                    chats: this.state.chats.concat(chats),
                });
            },
            error => {

            },
            () => {
                this.loadingChats = false;
            });
    }

    isRowLoaded(params: { index: number }): boolean {
        return this.allChatsLoaded || params.index < this.state.chats.length;
    }

    loadMoreRows(params: IndexRange): Promise<any> {
        this.loadingChats = true;
        tg.getChats(30, this.state.chats[params.startIndex - 1]).subscribe(chats => {
                if (chats.length === 0) {
                    this.allChatsLoaded = true;
                } else {
                    this.setState({
                        chats: this.state.chats.concat(chats),
                    });
                }
            },
            error => {

            },
            () => {
                this.loadingChats = false;
            });

        return Promise.resolve();
    }

    rowCount(): number {
        return this.allChatsLoaded ?
            this.state.chats.length :
            this.state.chats.length + 1;
    }

    renderRow(params: V.ListRowProps): React.ReactNode {
        return (
            <div key={params.key} style={params.style}>
                <ChatsListItem chat={this.state.chats[params.index]}/>
                {
                    params.index < this.state.chats.length - 1 &&
                    <Divider inset={true}/>
                }
            </div>
        );
    }

    render() {
        return (
            <SelectableList style={style}>
                <V.InfiniteLoader
                    isRowLoaded={(params) => this.isRowLoaded(params)}
                    loadMoreRows={(params) => this.loadMoreRows(params)}
                    rowCount={this.rowCount()}>
                    {({ onRowsRendered, registerChild }) => (
                        <V.AutoSizer>
                            {({ width, height }) => (
                                <V.List ref={registerChild}
                                        width={width}
                                        height={height}
                                        rowHeight={90}
                                        overscanRowCount={5}
                                        rowCount={this.state.chats.length}
                                        rowRenderer={(params) => this.renderRow(params)}
                                        onRowsRendered={onRowsRendered}/>
                            )}
                        </V.AutoSizer>
                    )}
                </V.InfiniteLoader>
            </SelectableList>
        );
    }
}

const SelectableList = makeSelectable(List);

const style: CSSProperties = {
    height: "100%",
    width: 320,
    flexGrow: 0,
    flexShrink: 0,
    overflow: "auto",
    padding: 0,
};