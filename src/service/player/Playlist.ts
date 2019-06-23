// import {injectable} from "inversify";
import PlaylistInterface from "./PlaylistInterface";
import PlaylistItem from "./PlaylistItem";
import Sortable from "./Sortable";

// @injectable()
class Playlist implements PlaylistInterface {
    private _currentIndex = 0;
    private _sortOrder = 'asc';

    constructor(private _items: Array<PlaylistItem>) {
    }

    add(item: PlaylistItem): void {
        this._items.push(item);
    }

    current(): PlaylistItem {
        return this._items[this._currentIndex];
    }

    rest(): Array<PlaylistItem> {
        return this._items.filter((item: any, index: number) => index > this._currentIndex + 1);
    }

    next(): PlaylistItem {
        if (!this._items[this._currentIndex + 1]) {
            throw new Error('End of playlist reached');
        }
        this._currentIndex++;

        return this._items[this._currentIndex];
    }

    previous(): PlaylistItem {
        if (!this._items[this._currentIndex - 1]) {
            throw new Error('Start of playlist reached');
        }
        this._currentIndex--;

        return this._items[this._currentIndex];
    }

    nextItem(): PlaylistItem {
        if (!this._items[this._currentIndex + 1]) {
            throw new Error('End of playlist reached');
        }

        return this._items[this._currentIndex + 1];
    }

    previousItem(): PlaylistItem {
        if (!this._items[this._currentIndex - 1]) {
            throw new Error('Start of playlist reached');
        }

        return this._items[this._currentIndex - 1];
    }

    remove(item: PlaylistItem): void {
    }

    rewind(): void {
        this._currentIndex = 0;
    }

    size(): number {
        return this._items.length;
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    set currentIndex(value: number) {
        if (value > this._items.length - 1) {
            throw new Error(`Invalid index [${value}] provided`);
        }
        this._currentIndex = value;
    }

    moveIndexTo(moveTo: PlaylistItem): void {
        let moveToIndex = -1;
        this._items.forEach((item: PlaylistItem, index: number) => {
            if (moveTo.title === item.title && moveTo.subtitle === item.subtitle) {
                moveToIndex = index;
            }
        });

        if (moveToIndex === -1) {
            throw new Error(`Can not play selected video index ${moveToIndex}`);
        }

        this.currentIndex = moveToIndex;
    }

    reverse(): void {
        if (this._sortOrder === 'asc') {
            this._sortOrder = 'desc';
        } else {
            this._sortOrder = 'asc';
        }
        this._items.reverse();
        this.currentIndex = this._items.length - this.currentIndex -1;
    }

    sortAsc(): void {
        this._sortOrder = 'asc';
        this.items.sort((a: Sortable, b: Sortable) => (a.sortPosition > b.sortPosition) ? 1 : ((b.sortPosition > a.sortPosition) ? -1 : 0));
    }

    sortDesc(): void {
        this._sortOrder = 'desc';
        this.items.sort((a: Sortable, b: Sortable) => (a.sortPosition < b.sortPosition) ? 1 : ((b.sortPosition < a.sortPosition) ? -1 : 0));
    }

    get sortOrder(): string {
        return this._sortOrder;
    }

    get items(): Array<PlaylistItem> {
        return this._items;
    }
}

export default Playlist;
