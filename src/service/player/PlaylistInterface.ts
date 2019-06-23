import PlayableItem from "./PlayableItem";

interface PlaylistInterface {
    items: Array<PlayableItem>;
    currentIndex: number;
    sortOrder: string;//todo enum
    add(item: PlayableItem): void;
    remove(item: PlayableItem): void;
    current(): PlayableItem;
    next(): PlayableItem;//also moves index
    previous(): PlayableItem;//also moves index
    nextItem(): PlayableItem;//doesnt move index
    previousItem(): PlayableItem;//doesnt move index
    rewind(): void;
    size(): number;
    rest(): Array<PlayableItem>;
    moveIndexTo(item: PlayableItem): void;
    sortAsc(): void;
    sortDesc(): void;
    reverse(): void;//reverse order of items in playlist
}

export default PlaylistInterface;
