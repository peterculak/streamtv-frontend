import PlaylistInterface from "./PlaylistInterface";
import PlayableItem from "./PlayableItem";
import AdapterInterface from "./adapter/AdapterInterface";
import DomAdapter from "./adapter/DomAdapter";

interface PlayerInterface {
    autoplay: boolean;
    isVideoDataLoaded: boolean;
    currentlyPlayingItemOrder: number;
    playlistItemsCount: number;
    playlistItems: Array<PlayableItem>;

    play(): Promise<any>;
    pause(): void;
    resume(): void;
    next(): void;
    previous(): void;
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

    playPlaylistItem(item: PlayableItem): void;

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

    willPlayNext(): PlayableItem | null;

    getCurrentTime(): number;
    getVolume(): number;
    setVolume(volume: number): void;

    mute(): void;
    unMute(): void;
    isMuted(): boolean;

    /**
     * number between 0 - 100
     * @param percentage
     */
    setProgress(percentage: number): void;
}
export default PlayerInterface;
