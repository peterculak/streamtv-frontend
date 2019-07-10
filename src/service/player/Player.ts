import {injectable} from "inversify";
import PlayerInterface from "./PlayerInterface";
import PlaylistInterface from "./PlaylistInterface";
import AdapterInterface from "./adapter/AdapterInterface";
import Playlist from "./Playlist";
import PlayableItem from "./PlayableItem";
import DomAdapter from "./adapter/DomAdapter";
import CastSenderAdapter from "./adapter/CastSenderAdapter";

@injectable()
class Player implements PlayerInterface {
    private _autoplay: boolean = true;
    private _selectedQualityIndex: number = 0;
    private shuffleEnabled: boolean = false;
    private loopEnabled: boolean = false;
    private _isVideoDataLoaded: boolean = false;
    private _isHighQualitySelected: boolean = false;
    private currentTime: number = 0;

    constructor(
        private playlist: PlaylistInterface = new Playlist([]),
        private _adapter: AdapterInterface = new DomAdapter(),
    ) {
        this.playlist = playlist;
        this._adapter = _adapter;
    }

    get autoplay(): boolean {
        return this._autoplay;
    }

    set autoplay(value: boolean) {
        this._autoplay = value;
    }

    setVideoElement(ref: HTMLVideoElement, callbacks?: any ) {
        this.adapter().setVideoElement(ref);
        if (callbacks.ended) {
            this.adapter().addListener('ended', () => this._autoplay && callbacks.ended());
        } else {
            this.adapter().addListener('ended', () => this._autoplay && this.next());
        }

        this.adapter().addListener('loadeddata', (event: any) => {
            this._isVideoDataLoaded = true;
            if (!this.current().duration) {
                this.current().duration = Math.ceil(this.adapter().getVideoDuration());
            }
            if (this._autoplay) {
                this.adapter().resume();
            }
            callbacks.loadeddata && callbacks.loadeddata();
        });

        this.adapter().addListener('timeupdate', (a: any) => {
            this.currentTime = this.adapter().getCurrentVideoTime();
            callbacks.timeupdate && callbacks.timeupdate();
        });
    }

    get isVideoDataLoaded(): boolean {
        return this._isVideoDataLoaded;
    }

    load(playlist: PlaylistInterface): void {
        this.playlist = playlist;
    }

    isLoaded(): boolean {
        return this.adapter().hasVideoElement() && this.playlist && this.playlist.size() > 0;
    }

    pause(): void {
        this.adapter().pause();
    }

    play(): void {
        this.currentTime = 0;
        this._isVideoDataLoaded = false;
        // this.setPoster();
        if (this._selectedQualityIndex + 1 === this.availableQuality().length) {
            this._isHighQualitySelected = true;
        }
        if (this._isHighQualitySelected) {
            this.setHighestQuality();
        } else {
            this.adapter().play(this.playlist.current().mp4[this._selectedQualityIndex]);
        }
    }

    playPlaylistItem(item: PlayableItem): void {
        this.playlist.moveIndexTo(item);
        this.play();
    }

    resume(): void {
        this.adapter().resume();
    }

    current(): PlayableItem {
        return this.playlist.current();
    };

    isPlaying(): boolean {
        return this.adapter().isPlaying();
    }

    currentStream(): string {
        return this.adapter().currentStream();
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
        this.adapter().setVideoSource(this.playlist.current().mp4[this._selectedQualityIndex]);
        if (wasPlaying) {
            this.adapter().play();
        }
    }

    sortPlaylistDesc(): void {
        const wasPlaying = this.isPlaying();
        this.playlist.sortDesc();
        // this.setPoster();
        this.adapter().setVideoSource(this.playlist.current().mp4[this._selectedQualityIndex]);
        if (wasPlaying) {
            this.adapter().play();
        }
    }

    get selectedQualityIndex(): number {
        return this._selectedQualityIndex;
    }

    set selectedQualityIndex(value: number) {
        this._selectedQualityIndex = value;
        if (this._selectedQualityIndex + 1 === this.availableQuality().length) {
            this._isHighQualitySelected = true;
        }
        const wasPlaying = this.adapter().isPlaying();
        this.adapter().setVideoSource(this.playlist.current().mp4[this._selectedQualityIndex]);
        this.adapter().setCurrentVideoTime(this.currentTime);
        if (wasPlaying) {
            this.adapter().play();
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
        return this._isHighQualitySelected;
    }

    availableQuality(): Array<string> {
        return this.playlist.current().mp4.map((item: string, index: number) => this.qualityLabel(item));
    }

    setHighestQuality(): void {
        this._isHighQualitySelected = true;
        this.selectedQualityIndex = this.current().mp4.length -1;
    }

    setLowestVideoQuality(): void {
        this._isHighQualitySelected = false;
        this.selectedQualityIndex = 0;
    }

    getVideoElementHeight(): string {
        return this.adapter().getVideoElementHeight();
    }

    getVideoElementWidth(): string {
        return this.adapter().getVideoElementWidth();
    }

    getCurrentTime(): number {
        return this.currentTime;
    }

    getVolume(): number {
        return this.adapter().getVideoVolume();
    }

    setVolume(volume: number): void {
        this.adapter().setVideoVolume(volume);
    }

    isMuted(): boolean {
        return this.adapter().muted;
    }

    mute(): void {
        this.adapter().muted = true;
    }

    unMute(): void {
        this.adapter().muted = false;
        //if unmuted and is still 0 set to 20%
        if (this.getVolume() === 0) {
            this.setVolume(0.2);
        }
    }

    setProgress(percentage: number): void {
        if (percentage < 0 || percentage > 100) {
            throw new Error(`Progress ${percentage} is out of range 0 - 100`);
        }

        const time = this.current().duration * (percentage/100);

        this.adapter().setCurrentVideoTime(time);
    }

    isFullScreenAvailable(): boolean {
        return this.adapter().isFullScreenAvailable();
    }

    requestFullScreen(): Promise<void> {
        return this.adapter().requestFullScreen();
    }

    private castSenderAdapter: CastSenderAdapter|undefined;//todo

    get canCast(): boolean {
        return this.castSenderAdapter !== undefined;
    }

    isCasting(): boolean {
        return this.castSenderAdapter !== undefined && this.castSenderAdapter.isConnected();
    }

    initializeCastPlayer(adapter: CastSenderAdapter): void {
        console.log('initialize cast player');
        this.castSenderAdapter = adapter;
    }

    switchPlayer(): void {
        // this.playerStateBeforeSwitch = this.playerState;

        // this.stopProgressTimer();
        // this.resetVolumeSlider();

        // Session is active
        // if (this.canCast && this.castSenderAdapter.isConnected()) {
            // this.isCasting = true;
            // Pause local playback
            // this.playerHandler.pause();
            // this.castSenderAdapter.init();
        // } else {
            // this.setupLocalPlayer();
            // this.isCasting = false;
        // }
    }

    private adapter(): AdapterInterface {
        if (this.castSenderAdapter && this.castSenderAdapter.isConnected()) {
            return this.castSenderAdapter;
        } else {
            return this._adapter;
        }
    }

    private qualityLabel(url: string): string  {
        const r = url.match(/-([^-]+[p]?)\.mp4/);
        return r && r[1] !== null ? r[1] : 'undefined';
    };

    private setPoster(): void {
        if (this.playlist.current().image) {
            this.adapter().setPosterSource(this.playlist.current().image.replace(/[r]?[0-9]+x[0-9]+[n]?/, 'r800x'));
        }
    }
}

export default Player;
