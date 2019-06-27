import PlaylistInterface from "./PlaylistInterface";
import PlayableItem from "./PlayableItem";

interface PlayerInterface {
    play(): void;
    pause(): void;
    load(playlist: PlaylistInterface): void;
    isLoaded(): boolean;

    /**
     * currently video which is loaded, can be playing or paused
     */
    current(): PlayableItem;

    /**
     * whether video is actually playing
     */
    isPlaying(): boolean;

    /**
     * Stream url which is currently playing
     */
    currentStream(): string;

    /**
     * Reverses order of items in playlist
     * Currently selected or playing item wont change
     */
    reversePlaylistSort(): void;

    getPlaylistSortOrder(): string;

    sortPlaylistAsc(): void;

    sortPlaylistDesc(): void;

    enableShuffle(): void;
    disableShuffle(): void;
    isShuffleEnabled(): boolean;

    enableLoop(): void;
    disableLoop(): void;
    isLoopEnabled(): boolean;

    /**
     * Returns list of available video quality eg ['low', 'hi', '4k']
     */
    availableQuality(): Array<string>;
    hasHiqhQualityAvailable(): boolean;
    isHighQualitySelected(): boolean;
    setLowestVideoQuality(): void;
    setHighestQuality(): void;
}

export default PlayerInterface;
