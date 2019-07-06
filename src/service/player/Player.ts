// import {injectable} from "inversify";
import PlayerInterface from "./PlayerInterface";
import PlaylistInterface from "./PlaylistInterface";
import AdapterInterface from "./adapter/AdapterInterface";
import Playlist from "./Playlist";
import PlayableItem from "./PlayableItem";
import DomAdapter from "./adapter/DomAdapter";

class Player implements PlayerInterface {
    private _autoplay: boolean = true;
    private _selectedQualityIndex: number = 0;
    private shuffleEnabled: boolean = false;
    private loopEnabled: boolean = false;
    private _isVideoDataLoaded: boolean = false;

    constructor(
        private playlist: PlaylistInterface = new Playlist([]),
        private adapter: AdapterInterface = new DomAdapter(),
    ) {
        this.playlist = playlist;
        this.adapter = adapter;
    }

    get autoplay(): boolean {
        return this._autoplay;
    }

    set autoplay(value: boolean) {
        this._autoplay = value;
    }

    setVideoElement(ref: HTMLVideoElement, callback?: any, dataLoadedCallback?: any ) {
        this.adapter.setVideoElement(ref);
        if (callback) {
            this.adapter.addListener('ended', () => this._autoplay && callback());//todo this is ugly
        } else {
            this.adapter.addListener('ended', () => this._autoplay && this.next());//todo this is ugly
        }

        if (dataLoadedCallback) {
            this.adapter.addListener('loadeddata', (event: any) => {
                this._isVideoDataLoaded = true;
                if (!this.current().duration) {
                    this.current().duration = Math.ceil(this.adapter.getVideoDuration());
                }
                dataLoadedCallback();
            });
        }

        // this.adapter.addListener('loadedmetadata', (a: any) => console.log(a));
    }

    get isVideoDataLoaded(): boolean {
        return this._isVideoDataLoaded;
    }

    load(playlist: PlaylistInterface): void {
        this.playlist = playlist;
    }

    isLoaded(): boolean {
        return this.adapter.hasVideoElement() && this.playlist && this.playlist.size() > 0;
    }

    pause(): void {
        this.adapter.pause();
    }

    play(): void {
        this._isVideoDataLoaded = false;
        // this.setPoster();
        this.adapter.play(this.playlist.current().mp4[this._selectedQualityIndex]);
    }

    playPlaylistItem(item: PlayableItem): void {
        this.playlist.moveIndexTo(item);
        this.play();
    }

    resume(): void {
        this.adapter.resume();
    }

    current(): PlayableItem {
        return this.playlist.current();
    };

    isPlaying(): boolean {
        return this.adapter.isPlaying();
    }

    currentStream(): string {
        return this.adapter.currentStream();
    }

    next(): void {
        if (this.hasNext()) {
            this.playlist.next();
            this.play();
        } else {
            if (this.loopEnabled) {
                this.playlist.rewind();
                this.play();
            }
        }
    }

    previous(): void {
        this.playlist.previous();
        this.play();
    }

    hasPrevious(): boolean {
        try {
            return this.playlist.previousItem() !== undefined;
        } catch (e) {
            return false;
        }
    }

    hasNext(): boolean {
        try {
            return this.playlist.nextItem() !== undefined;
        } catch (e) {
            return false;
        }
    }

    getPlaylistSortOrder(): string {
        return this.playlist.sortOrder;
    }

    reversePlaylistSort(): void {
        this.playlist.reverse();
    }

    sortPlaylistAsc(): void {
        const wasPlaying = this.isPlaying();
        this.playlist.sortAsc();
        // this.setPoster();
        this.adapter.setVideoSource(this.playlist.current().mp4[this._selectedQualityIndex]);
        if (wasPlaying) {
            this.adapter.play();
        }
    }

    sortPlaylistDesc(): void {
        const wasPlaying = this.isPlaying();
        this.playlist.sortDesc();
        // this.setPoster();
        this.adapter.setVideoSource(this.playlist.current().mp4[this._selectedQualityIndex]);
        if (wasPlaying) {
            this.adapter.play();
        }
    }

    get selectedQualityIndex(): number {
        return this._selectedQualityIndex;
    }

    set selectedQualityIndex(value: number) {
        this._selectedQualityIndex = value;
        const wasPlaying = this.adapter.isPlaying();
        const currentVideoTime = this.adapter.getCurrentVideoTime();
        this.adapter.setVideoSource(this.playlist.current().mp4[this._selectedQualityIndex]);
        this.adapter.setCurrentVideoTime(currentVideoTime);
        if (wasPlaying) {
            this.adapter.play();
        }
    }

    get currentlyPlayingItemOrder(): number {
        return this.playlist.currentIndex + 1;
    }

    get playlistItemsCount(): number {
        return this.playlist.size();
    }

    willPlayNext(): PlayableItem | null {
        try {
            return this.playlist.nextItem();
        } catch (e) {
            return null;
        }
    }

    willPlayAfterNext(): Array<PlayableItem> {
        return this.playlist.rest();
    }

    get playlistItems(): Array<PlayableItem> {
        return this.playlist.items;
    }

    disableShuffle(): void {
        this.shuffleEnabled = false;
    }

    enableShuffle(): void {
        this.shuffleEnabled = true;
    }

    isShuffleEnabled(): boolean {
        return this.shuffleEnabled;
    }

    disableLoop(): void {
        this.loopEnabled = false;
    }

    enableLoop(): void {
        this.loopEnabled = true;
    }

    isLoopEnabled(): boolean {
        return this.loopEnabled;
    }

    hasHiqhQualityAvailable(): boolean {
        return this.playlist.current().mp4.length > 1;
    }

    isHighQualitySelected(): boolean {
        return this.selectedQualityIndex > 0;
    }

    availableQuality(): Array<string> {
        return this.playlist.current().mp4.map((item: string, index: number) => this.qualityLabel(item));
    }

    setHighestQuality(): void {
        this.selectedQualityIndex = this.current().mp4.length -1;
    }

    setLowestVideoQuality(): void {
        this.selectedQualityIndex = 0;
    }

    getVideoElementHeight(): string {
        return this.adapter.getVideoElementHeight();
    }

    private qualityLabel(url: string): string  {
        const r = url.match(/-([^-]+[p]?)\.mp4/);
        return r && r[1] !== null ? r[1] : 'undefined';
    };

    private setPoster(): void {
        if (this.playlist.current().image) {
            this.adapter.setPosterSource(this.playlist.current().image.replace(/[r]?[0-9]+x[0-9]+[n]?/, 'r800x'));
        }
    }
}

export default Player;
