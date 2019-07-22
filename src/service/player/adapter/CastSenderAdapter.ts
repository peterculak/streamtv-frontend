import AdapterException from "./AdapterException";
import AdapterInterface from "./AdapterInterface";
import PlaylistInterface from "../PlaylistInterface";
import PlayableItem from "../PlayableItem";

class CastSenderAdapter implements AdapterInterface {
    /**
     * Cast sender api (window.cast)
     * <script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
     */
    public cast: any;

    /**
     * Chrome browser (window.chrome)
     */
    public chrome: any;

    public remotePlayer: any;

    public remotePlayerController: any;

    private castQueueData: Array<any> = [];

    constructor(cast: any, chrome: any) {
        this.cast = cast;
        this.chrome = chrome;

        const options = {} as any;
        options.receiverApplicationId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
        options.autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;
        cast.framework.CastContext.getInstance().setOptions(options);

        this.remotePlayer = new cast.framework.RemotePlayer();
        this.remotePlayerController = new cast.framework.RemotePlayerController(this.remotePlayer);
    }

    isConnected(): boolean {
        return this.remotePlayer.isConnected;
    }

    addListener(type: string, listener: EventListenerOrEventListenerObject): void {
        this.remotePlayerController.addEventListener(type, listener);
    }

    removeListener(type: string, listener: EventListenerOrEventListenerObject): void {
        this.remotePlayerController.removeEventListener(type, listener);
    }

    get muted(): boolean {
        return this.remotePlayer.isMuted;
    }

    set muted(value: boolean) {
        this.remotePlayerController.muteOrUnmute();
    }

    currentStream(): string {
        return "";
    }

    getCurrentVideoTime(): number {
        if (this.remotePlayer.savedPlayerState) {
            return this.remotePlayer.savedPlayerState.currentTime;
        }

        return this.remotePlayer.currentTime;
    }

    getVideoDuration(): number {
        return this.remotePlayer.duration;
    }

    getVideoElementHeight(): string {
        return "";
    }

    getVideoElementWidth(): string {
        return "";
    }

    getVideoVolume(): number {
        return this.muted ? 0 : this.remotePlayer.volumeLevel;
    }

    hasVideoElement(): boolean {
        return false;
    }

    isFullScreenAvailable(): boolean {
        return false;
    }

    isPlaying(): boolean {
        return !this.remotePlayer.isPaused;
    }

    pause(): void {
        if (!this.remotePlayer.isPaused) {
            this.remotePlayerController.playOrPause();
        }
    }

    play(item?: string): Promise<any> {
        // console.log('play cast adapter', item);
        // const items = [{mp4: ['https://e2-vod.tmo.livebox.cz/TA3_VOD/_definst_/VideotekaEncoder/smil:20190717-DC74140B-9FE1-4528-AFB0-1A06B3FADD55_d.smil/playlist.m3u8?auth=_any_|1563478666|ebf79585f42d175e7c93990cf063e601367f170e']}];
        // console.log(this.castQueueData.length);
        const items = [];
        const queueSize = 50;

        let i = 0;
        let add = false;
        while (items.length < queueSize) {
            if (this.castQueueData[i] === undefined || items.length >= 50) {
                break;
            }
            if (this.castQueueData[i].mp4.indexOf(item) >= 0) {
                add = true;
            }
            if (add) {
                items.push(new this.chrome.cast.media.MediaInfo(this.castQueueData[i].mp4[0], 'video/mp4'));
            }
            i++;
        }

        const request = new this.chrome.cast.media.LoadRequest();
        request.queueData = new this.chrome.cast.media.QueueData(
            'id',
            'name',
            'desc',
            'OFF',
            items.map((mediaInfoItem: any) => {
                const queueItem = new this.chrome.cast.media.QueueItem(mediaInfoItem);
                queueItem.preloadTime = 20;
                return queueItem;
            })
        );

        return this.cast.framework.CastContext.getInstance().getCurrentSession().loadMedia(request);
    }

    requestFullScreen(): Promise<void> {
        return new Promise(() => {
        });
    }

    resume(): void {
        this.remotePlayerController.playOrPause();
    }

    setCurrentVideoTime(time: number): void {
        this.remotePlayer.currentTime = time;
        this.remotePlayerController.seek();
    }

    setPosterSource(src: string): void {
    }

    setVideoElement(ref: any): void {
    }

    setVideoSource(src: string): void {
    }

    setVideoVolume(volume: number): void {
        this.remotePlayer.volumeLevel = volume;
        this.remotePlayerController.setVolumeLevel(volume);
    }

    loadQueueData(items: Array<PlayableItem>): void {
        this.castQueueData = items;
    }
}

export default CastSenderAdapter;
