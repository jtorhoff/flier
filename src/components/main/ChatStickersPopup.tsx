/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { List } from "immutable";
import { IconButton } from "material-ui";
import TouchRipple from "material-ui/internal/TouchRipple";
import { faintBlack } from "material-ui/styles/colors";
import { DeviceAccessTime } from "material-ui/svg-icons";
import * as React from "react";
import { ScrollParams, Grid, GridCellProps } from "react-virtualized";
import { Subscription } from "rxjs/Subscription";
import { measureMedia } from "../../misc/MediaMeasurer";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { Popover } from "../misc/Popover";
import { Sticker } from "../misc/Sticker";

interface Props {
    open: boolean,
    onClose: () => void,
    anchorEl?: Element,
    onClick?: (sticker: API.Document) => void,
}

interface State {
    stickers: List<StickerSet>,
    activeSet: number,
    scrollToSet: number | undefined,
}

export class ChatStickersPopup extends React.Component<Props, State> {
    private recentStickersSubscription: Subscription;
    private allStickersSubscription: Subscription;

    state: State = {
        stickers: List(),
        activeSet: 0,
        scrollToSet: undefined,
    };

    componentDidMount() {
        this.recentStickersSubscription = tg.getRecentStickers()
            .subscribe(stickers => {
                this.setState(state => {
                    return {
                        stickers: state.stickers.insert(0, {
                            thumbnail: <DeviceAccessTime
                                color={"rgba(0,0,0,0.4)"}/>,
                            title: "Recent stickers",
                            stickers: (stickers as Array<API.Document | undefined>)
                                .concat(dummyStickerData(stickers.length)),
                        })
                    }
                });
            });

        this.allStickersSubscription = tg.getAllStickers()
            .map(sets => sets.map(set => [
                set.set.title.string,
                set.documents.items.filter(doc => doc instanceof API.Document)
            ]))
            .map(sets => sets.map(set => {
                return {
                    title: set[0],
                    stickers: (set[1] as Array<API.Document | undefined>)
                        .concat(dummyStickerData(set[1].length)),
                }
            }))
            .subscribe(stickers => {
                this.setState(state => {
                    return {
                        stickers: state.stickers.concat(stickers).toList(),
                    }
                });
            })
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!nextProps.open) {
            this.setState(state => {
                return {
                    scrollToSet: state.activeSet,
                }
            });
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps.open !== this.props.open
            || nextProps.onClose !== this.props.onClose
            || nextProps.anchorEl !== this.props.anchorEl
            || nextProps.onClick !== this.props.onClick
            || !nextState.stickers.equals(this.state.stickers)
            || nextState.activeSet !== this.state.activeSet
            || nextState.scrollToSet !== this.state.scrollToSet;
    }

    componentWillUnmount() {
        this.recentStickersSubscription.unsubscribe();
        this.allStickersSubscription.unsubscribe();
    }

    renderCell(params: GridCellProps): React.ReactNode {
        const index = params.rowIndex * columnCount + params.columnIndex;

        let group = 0;
        let total = 0;
        const lengths = this.state.stickers
            .map(set => set!.stickers.length)
            .toArray();
        for (let length of lengths) {
            total += length;
            if (index < total) {
                total -= length;
                break;
            }
            group++;
        }
        let indexWithinGroup: number;
        if (total === 0) {
            indexWithinGroup = index;
        } else {
            indexWithinGroup = (index - total) % lengths[group];
        }

        const sticker = this.state.stickers.get(group).stickers[indexWithinGroup];
        let element: JSX.Element;
        if (sticker instanceof API.Document) {
            const size = measureMedia(stickerSize, stickerSize, sticker.thumb);
            element =
                <TouchRipple>
                    <Sticker width={size.width}
                             height={size.height}
                             sticker={sticker}
                             thumb={true}/>
                </TouchRipple>
        } else {
            element = dummySticker;
        }

        return (
            <div key={params.key}
                 onClick={() => {
                     if (this.props.onClick && sticker instanceof API.Document) {
                         this.props.onClick(sticker);
                     }
                 }}
                 style={{
                     ...params.style,
                     userSelect: "none",
                     cursor: element === dummySticker ? "default" : "pointer",
                     width: stickerSize,
                     height: stickerSize,
                     top: params.style.top + 8,
                     left: params.style.left + 8,
                 }}>
                {
                    element
                }
            </div>
        );
    }

    onScroll(params: ScrollParams) {
        const heights = this.state.stickers
            .map(set => set!.stickers.length *
                (stickerSize + gutterSize) / columnCount)
            .toArray();
        let set = 0;
        for (let total = 0; set < heights.length; set++) {
            total += heights[set];
            if (params.scrollTop < total) {
                break;
            }
        }

        if (this.state.activeSet !== set) {
            this.setState({
                activeSet: set,
                scrollToSet: undefined,
            });
        }
    }

    renderStripCell(params: GridCellProps): React.ReactNode {
        const item = this.state.stickers.get(params.columnIndex);
        let element: JSX.Element;
        if (item.thumbnail) {
            element = item.thumbnail;
        } else {
            const sticker = item.stickers[0]!;
            const size = measureMedia(26, 26, sticker.thumb);

            element = <Sticker key={params.key}
                               width={size.width}
                               height={size.height}
                               sticker={sticker}
                               thumb={true}/>
        }

        return (
            <div key={params.key} style={{
                ...params.style,
                left: params.style.left + 8,
            }}>
                <IconButton
                    style={{
                        width: 32,
                        height: 32,
                        padding: 0,
                        background: this.state.activeSet === params.columnIndex ?
                            "rgba(0, 0, 0, 0.08)" : "transparent",
                        transition: "background 200ms ease",
                        borderRadius: 4,
                        marginTop: 6,
                    }}
                    iconStyle={{ width: 24, height: 24 }}
                    onClick={() => this.setState({
                        scrollToSet: params.columnIndex,
                    })}>
                    {
                        element
                    }
                </IconButton>
            </div>
        );
    }

    render() {
        const stickersCount = this.state.stickers
            .map(set => set!.stickers.length)
            .reduce((acc, val) => acc! + val!, 0);
        let scrollTop: number | undefined = undefined;
        if (this.state.scrollToSet !== undefined) {
            const scrollToCell = this.state.stickers.slice(0, this.state.scrollToSet)
                .reduce((acc, set) => set!.stickers.length + acc!, 0);
            scrollTop = scrollToCell * (stickerSize + gutterSize) / columnCount;
        }

        return (
            <Popover open={this.props.open}
                     anchorEl={this.props.anchorEl}
                     origin={["right", "bottom"]}
                     onRequestClose={this.props.onClose}>
                <div onMouseLeave={this.props.onClose}
                     style={{
                         overflow: "hidden",
                         display: "block",
                         width: popupWidth,
                         height: popupHeight,
                     }}>
                    <Grid width={popupWidth}
                          height={popupHeight - stickerSetsStripHeight}
                          rowCount={Math.ceil(stickersCount / columnCount)}
                          columnCount={columnCount}
                          rowHeight={stickerSize + gutterSize}
                          columnWidth={stickerSize + gutterSize}
                          cellRenderer={params => this.renderCell(params)}
                          overscanRowCount={0}
                          overscanColumnCount={0}
                          scrolltoalignment={"start"}
                          scrollTop={scrollTop}
                          onScroll={params => this.onScroll(params)}
                          scrollingResetTimeInterval={0}
                          style={{
                              outline: "none",
                              paddingBottom: gutterSize,
                              overflowX: "hidden",
                          }}/>
                    <style type="text/css">{stickerSetStripNoScrollbar}</style>
                    <Grid width={popupWidth}
                          height={stickerSetsStripHeight}
                          rowCount={1}
                          columnCount={this.state.stickers.size}
                          rowHeight={stickerSetsStripHeight}
                          columnWidth={params => {
                              if (params.index === this.state.stickers.size - 1) {
                                  return 32 + gutterSize * 2;
                              }
                              return 32 + gutterSize;
                          }}
                          cellRenderer={params => this.renderStripCell(params)}
                          overscanRowCount={0}
                          overscanColumnCount={1}
                          scrollToAlignment={"center"}
                          scrollToColumn={this.state.activeSet}
                          scrollLeft={
                              /* set left offset to 0, since scrollToCell
                                 only shows the element without the left padding;
                                 aesthetic first... */
                              this.state.activeSet === 0 ? 0 : undefined
                          }
                          scrollingResetTimeInterval={0}
                          style={{
                              outline: "none",
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              borderTop: `1px solid ${faintBlack}`,
                          }}
                          className={"sticker-sets-strip"}/>
                </div>
            </Popover>
        );
    }
}

interface StickerSet {
    readonly thumbnail?: JSX.Element,
    readonly title: string,
    readonly stickers: Array<API.Document | undefined>,
}

const dummySticker: JSX.Element = <span/>;

const dummyStickerData = (setLength: number) => {
    return Array.from(Array(padding(setLength, columnCount)), () => undefined);
};

const padding = (num: number, multiple: number) => {
    return ((num + (multiple - 1)) & ~(multiple - 1)) - num;
};

const stickerSetsStripHeight = 46;
const stickerSetStripNoScrollbar = `
.sticker-sets-strip::-webkit-scrollbar {
    display: none;
}
`;

const popupWidth = 360;
const popupHeight = 318;
const columnCount = 4;
const stickerSize = 80;
const gutterSize = 8;