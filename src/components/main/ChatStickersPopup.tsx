import { List } from "immutable";
import { Popover, IconButton } from "material-ui";
import TouchRipple from "material-ui/internal/TouchRipple";
import { faintBlack } from "material-ui/styles/colors";
import { DeviceAccessTime } from "material-ui/svg-icons";
import * as React from "react";
import { CSSProperties } from "react";
import {
    Collection,
    CollectionCellRendererParams,
    CollectionCellSizeAndPosition,
    ScrollParams
} from "react-virtualized";
import { Subscription } from "rxjs/Subscription";
import { API } from "../../tg/Codegen/API/APISchema";
import { tg } from "../App";
import { Sticker } from "../misc/Sticker";

interface Props {
    open: boolean,
    onClose: () => void,
    anchorEl?: React.ReactInstance,
}

interface State {
    stickers: List<StickerSet>,
    activeSet: number,
    scrollToSet: number | undefined,
}

export class ChatStickersPopup extends React.Component<Props, State> {
    // private stickerSetsStripOnScroll: any;
    private stickerSetsStrip: Collection;

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
            || !nextState.stickers.equals(this.state.stickers)
            || nextState.activeSet !== this.state.activeSet
            || nextState.scrollToSet !== this.state.scrollToSet;
    }

    componentWillUnmount() {
        this.recentStickersSubscription.unsubscribe();
        this.allStickersSubscription.unsubscribe();
    }

    renderCell(params: CollectionCellRendererParams): React.ReactNode {
        let group = 0;
        let total = 0;
        const lengths = this.state.stickers
            .map(set => set!.stickers.length)
            .toArray();
        for (let length of lengths) {
            total += length;
            if (params.index < total) {
                total -= length;
                break;
            }
            group++;
        }
        let index: number;
        if (total === 0) {
            index = params.index;
        } else {
            index = (params.index - total) % lengths[group];
        }

        const sticker = this.state.stickers.get(group).stickers[index];
        let element: JSX.Element;
        if (sticker instanceof API.Document) {
            element =
                <TouchRipple>
                    <Sticker width={stickerSize}
                             height={stickerSize}
                             sticker={sticker}
                             thumb={true}/>
                </TouchRipple>
        } else {
            element = dummySticker;
        }

        return (
            <div key={params.key} style={{
                userSelect: "none",
                cursor: element === dummySticker ? "default" : "pointer",
                ...params.style
            }}>
                {
                    element
                }
            </div>
        );
    }

    getCellSizeAndPosition(params: { index: number }): CollectionCellSizeAndPosition {
        const column = params.index % columnCount;
        const row = (params.index / columnCount) | 0;

        return {
            x: column * (stickerSize + gutterSize) + gutterSize,
            y: row * (stickerSize + gutterSize) + gutterSize,
            width: stickerSize,
            height: stickerSize,
        }
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

    renderStripCell(params: CollectionCellRendererParams): React.ReactNode {
        const item = this.state.stickers.get(params.index);
        let element: JSX.Element;
        if (item.thumbnail) {
            element = item.thumbnail;
        } else {
            const sticker = item.stickers[0]!;
            element =
                <Sticker width={26} height={26} sticker={sticker} thumb={true}/>
        }

        return (
            <div key={params.key} style={params.style}>
                <IconButton
                    style={{
                        width: 32,
                        height: 32,
                        padding: 0,
                        background: this.state.activeSet === params.index ? "rgba(0, 0, 0, 0.08)" : "transparent",
                        transition: "background 200ms ease",
                        borderRadius: 4,
                        marginTop: 7,
                    }}
                    iconStyle={{ width: 24, height: 24 }}
                    onClick={() => this.setState({
                        scrollToSet: params.index,
                    })}>
                    {
                        element
                    }
                </IconButton>
            </div>
        );
    }

    getStripCellSizeAndPosition(params: { index: number }): CollectionCellSizeAndPosition {
        let width: number;
        if (params.index === this.state.stickers.size - 1) {
            width = 40;
        } else {
            width = 32;
        }

        return {
            x: params.index * (32 + 8) + 8,
            y: 0,
            width: width,
            height: stickerSetsStripHeight,
        };
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
            <Popover
                open={this.props.open}
                anchorEl={this.props.anchorEl}
                anchorOrigin={{
                    "horizontal": "right",
                    "vertical": "bottom"
                }}
                targetOrigin={{
                    "horizontal": "right",
                    "vertical": "bottom"
                }}
                onRequestClose={this.props.onClose}
                canAutoPosition={false}
                useLayerForClickAway={false}
                style={{
                    overflow: "hidden",
                    width: popupWidth,
                    height: popupHeight,
                }}>
                <div style={{
                    display: "block",
                    width: popupWidth,
                    height: popupHeight,
                }}
                     onMouseLeave={this.props.onClose}>
                    <div style={{
                        overflow: "hidden",
                        height: popupHeight - stickerSetsStripHeight - 1,
                    }}>
                        <Collection
                            width={popupWidth}
                            height={popupHeight - stickerSetsStripHeight - 1}
                            cellCount={stickersCount}
                            cellRenderer={params => this.renderCell(params)}
                            cellSizeAndPositionGetter={params => this.getCellSizeAndPosition(params)}
                            horizontalOverscanSize={0}
                            verticalOverscanSize={0}
                            scrollToAlignment={"start"}
                            onScroll={params => this.onScroll(params)}
                            scrollTop={scrollTop}
                            style={{
                                outline: "none",
                                paddingBottom: gutterSize,
                                overflowX: "hidden",
                            }}/>
                    </div>
                    <style type="text/css">{stickerSetStripNoScrollbar}</style>
                    <div style={stickerSetsStripStyle}>
                        <Collection
                            ref={ref => this.stickerSetsStrip = ref!}
                            width={popupWidth}
                            height={stickerSetsStripHeight}
                            cellCount={this.state.stickers.size}
                            cellRenderer={params => this.renderStripCell(params)}
                            cellSizeAndPositionGetter={params => this.getStripCellSizeAndPosition(params)}
                            horizontalOverscanSize={10}
                            verticalOverscanSize={0}
                            scrollToAlignment={"center"}
                            scrollToCell={this.state.activeSet}
                            scrollLeft={
                                /* set left offset to 0, since scrollToCell
                                only shows the element without the left padding;
                                aesthetic first... */
                                this.state.activeSet === 0 ? 0 : undefined
                            }
                            style={{
                                outline: "none",
                            }}
                            className={"sticker-sets-strip"}/>
                    </div>
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

const stickerSetsStripHeight = 45;
const stickerSetsStripStyle: CSSProperties = {
    height: stickerSetsStripHeight,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: `1px solid ${faintBlack}`,
    overflow: "hidden",
};
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