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
    public isCasting: boolean = false;

    private callbacks: any;

    private _adapter: AdapterInterface|undefined;
    private castSenderAdapter: CastSenderAdapter|undefined;//todo

    constructor(
        private playlist: PlaylistInterface = new Playlist([]),
    ) {
        this.playlist = playlist;
    }

    initializeHtmlPlayer(adapter: DomAdapter, callbacks?: any): void {
        // console.log('initializeHtmlPlayer', adapter);
        this._adapter = adapter;
        this.callbacks = callbacks;
        if (callbacks && callbacks.ended) {
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

    initializeCastPlayer(adapter: CastSenderAdapter): void {
        this.castSenderAdapter = adapter;
        this.castSenderAdapter.addListener(
            adapter.cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
            (e: any) => this.switchAdapter(e)
        );

        const handleMediaInfoChange = (e: any) => {
            // console.log('mediaInfoChanged', e);
            if (e.value) {
                const streamUrl = e.value.contentId;
                if (streamUrl) {
                    // console.log('media change', streamUrl);
                    // console.log(this.current());
                    if (!this.current().duration) {
                        this.current().duration = Math.ceil(this.castSenderAdapter!.getVideoDuration());
                    }
                    if (this.playlist.current().image) {
                        this._adapter!.setPosterSource(this.playlist.current().image.replace(/[r]?[0-9]+x[0-9]+[n]?/, 'r800x'));
                    }
                    this.playlist.moveIndexTo(streamUrl);
                    if (this.callbacks && this.callbacks.loadeddata) {
                        this.callbacks.loadeddata();
                    }
                }
            }
        };

        const handleCurrentTimeChange = (e: any) => {
            this.currentTime = e.value;
            this.callbacks.timeupdate && this.callbacks.timeupdate();
        };

        this.castSenderAdapter!.addListener(
            'mediaInfoChanged',
            handleMediaInfoChange,
        );
        this.castSenderAdapter!.addListener(
            'currentTimeChanged',
            handleCurrentTimeChange,
        );
    }

    get canCast(): boolean {
        return this.castSenderAdapter !== undefined;
    }

    get isVideoDataLoaded(): boolean {
        return this._isVideoDataLoaded;
    }

    get autoplay(): boolean {
        return this._autoplay;
    }

    set autoplay(value: boolean) {
        this._autoplay = value;
    }

    load(playlist: PlaylistInterface): void {
        this.playlist = playlist;
        if (this.canCast && this.castSenderAdapter!.isConnected()) {
            this.castSenderAdapter!.loadQueueData(this.playlist.items);
        }
    }

    isLoaded(): boolean {
        if (this._adapter !== undefined && this._adapter.hasVideoElement() && this.playlist && this.playlist.size() > 0) {
            return true;
        }

        if (this.castSenderAdapter !== undefined && this.castSenderAdapter.isConnected() && this.playlist && this.playlist.size() > 0) {
            return true;
        }

        return false;
    }

    pause(): void {
        this.adapter().pause();
    }

    play(): Promise<any> {
        this.currentTime = 0;
        this._isVideoDataLoaded = false;
        // this.setPoster();

        // console.log('playing', this.selectStream(this.playlist.current()));
        return this.adapter().play(this.selectStream(this.playlist.current()));
    }

    playPlaylistItem(item: PlayableItem): void {
        this.playlist.moveIndexTo(this.selectStream(item));
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
        this.adapter().setVideoSource(this.selectStream(this.playlist.current()));
        if (wasPlaying) {
            this.adapter().play();
        }
    }

    sortPlaylistDesc(): void {
        const wasPlaying = this.isPlaying();
        this.playlist.sortDesc();
        // this.setPoster();
        this.adapter().setVideoSource(this.selectStream(this.playlist.current()));
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
        if (this.isCasting) {
            this.castSenderAdapter!.loadQueueData(this.getCastQueueData());
            const time = this.currentTime;
            this.play().then(() => {
                if (time) {
                    this.castSenderAdapter!.setCurrentVideoTime(time)
                }
            });
        } else {
            this.adapter().setVideoSource(this.selectStream(this.playlist.current()));
            this.adapter().setCurrentVideoTime(this.currentTime);
        }
    }

    setLowestVideoQuality(): void {
        this._isHighQualitySelected = false;
        if (this.isCasting) {
            this.castSenderAdapter!.loadQueueData(this.getCastQueueData());
            const time = this.currentTime;
            this.play().then(() => {
                if (time) {
                    this.castSenderAdapter!.setCurrentVideoTime(time)
                }
            });
        } else {
            this.adapter().setVideoSource(this.selectStream(this.playlist.current()));
            this.adapter().setCurrentVideoTime(this.currentTime);
        }
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

    private selectStream(item: PlayableItem): string {
        if (this._isHighQualitySelected) {
            return item.mp4[item.mp4.length -1];
        }
        return item.mp4[0];
    }

    private adapter(): AdapterInterface {
        if (this._adapter === undefined && this.castSenderAdapter === undefined) {
            throw new Error('No adapter')
        }

        if (this.castSenderAdapter && this.castSenderAdapter.isConnected()) {
            return this.castSenderAdapter;
        } else {
            return this._adapter!;
        }
    }

    private switchAdapter(e: any): void {
        // console.log('switchAdapter');
        const castRequested = e.value;

        if (castRequested && this.canCast && this.castSenderAdapter!.isConnected()) {
            this.isCasting = true;
            this.castSenderAdapter!.loadQueueData(this.getCastQueueData());

            let time = 0;
            let volume = 1;
            if (this._adapter !== undefined) {
                this._adapter.pause();
                if (this.playlist.current().image) {
                    this._adapter.setPosterSource(this.playlist.current().image.replace(/[r]?[0-9]+x[0-9]+[n]?/, 'r800x'));
                }
                time = this._adapter.getCurrentVideoTime();
                volume = this._adapter.getVideoVolume();
                this._adapter.setVideoSource('');
            }
            this.play().then(() => {
                if (time) {
                    this.castSenderAdapter!.setCurrentVideoTime(time)
                }
                if (volume === 1) {
                    volume = 0.99;//to prevent popup showing about max volume when just connected
                }
                this.castSenderAdapter!.setVideoVolume(volume);
            });
        } else {
            if (this.isCasting) {
                this.isCasting = false;
                this.castSenderAdapter!.pause();
                if (this._adapter !== undefined) {
                    setTimeout(() => {
                        this._adapter!.setVideoSource(this.selectStream(this.playlist.current()));
                        this._adapter!.setCurrentVideoTime(this.castSenderAdapter!.getCurrentVideoTime());
                        this._adapter!.setVideoVolume(this.castSenderAdapter!.getVideoVolume());
                        this._adapter!.resume();
                    }, 500);
                }
            }
        }
    }

    private getCastQueueData(): Array<PlayableItem> {
        return this.playlist.items.map((item: PlayableItem, index: number) => {
            const newItem = Object.assign({}, item);
            if (this._isHighQualitySelected) {
                newItem.mp4 = [item.mp4[item.mp4.length - 1]];
            } else {
                newItem.mp4 = [item.mp4[0]];
            }
            return newItem;
        });
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
