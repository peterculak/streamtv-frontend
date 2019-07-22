import PlayableItem from "../PlayableItem";
import CastSenderAdapterInterface from "./CastSenderAdapterInterface";

class CastSenderAdapter implements CastSenderAdapterInterface {
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
        const session = cast.framework.CastContext.getInstance().getCurrentSession();
        if (!session) {
            return '';
        }

        let mediaStatus = session.getMediaSession();
        if (!mediaStatus) {
            return '';
        }

        return mediaStatus.media.contentId;
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

    getVideoVolume(): number {
        return this.muted ? 0 : this.remotePlayer.volumeLevel;
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

    resume(): void {
        this.remotePlayerController.playOrPause();
    }

    setCurrentVideoTime(time: number): void {
        this.remotePlayer.currentTime = time;
        this.remotePlayerController.seek();
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
