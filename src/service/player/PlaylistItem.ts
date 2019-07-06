// import {injectable} from "inversify";
import PlayableItem from "./PlayableItem";
import Sortable from "./Sortable";

// @injectable()
class PlaylistItem implements PlayableItem, Sortable {
    private _sortPosition: number = 0;

    constructor(
        public title: string,
        public image: string,
        public mp4: Array<any>,
        public duration: number,
        public subtitle: string,
        public meta: {},
    ) {
        this.title = title;
        this.image = image;
        this.mp4 = mp4;
        this.duration = duration;
        this.subtitle = subtitle;
        this.meta = meta;
    }

    get sortPosition(): number {
        return this._sortPosition;
    }

    set sortPosition(value: number) {
        this._sortPosition = value;
    }
}

export default PlaylistItem;
