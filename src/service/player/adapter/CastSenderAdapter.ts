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
    private chrome: any;

    private remotePlayer: any;

    private remotePlayerController: any;

    constructor(cast: any, chrome: any) {
        this.cast = cast;
        this.chrome = chrome;

        const options = {} as any;
        // Set the receiver application ID to your own (created in the
        // Google Cast Developer Console), or optionally
        // use the chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
        // options.receiverApplicationId = 'C0868879';
        options.receiverApplicationId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;

        // Auto join policy can be one of the following three:
        // ORIGIN_SCOPED - Auto connect from same appId and page origin
        // TAB_AND_ORIGIN_SCOPED - Auto connect from same appId, page origin, and tab
        // PAGE_SCOPED - No auto connect
        options.autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;

        cast.framework.CastContext.getInstance().setOptions(options);

        this.remotePlayer = new cast.framework.RemotePlayer();
        this.remotePlayerController = new cast.framework.RemotePlayerController(this.remotePlayer);

        this.init();
    }

    init(): void {
        this.remotePlayerController.addEventListener(
            this.cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED,
            (e: any) => console.log('MEDIA_INFO_CHANGED', e)
        );
    }

    isConnected(): boolean {
        return this.remotePlayer.isConnected;
    }

    addListener(type: string, listener: EventListenerOrEventListenerObject): void {
        this.remotePlayerController.addEventListener(type, listener);
    }

    muted: boolean = false;

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
        return 0;
    }

    getVideoElementHeight(): string {
        return "";
    }

    getVideoElementWidth(): string {
        return "";
    }

    getVideoVolume(): number {
        return 0;
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

    play(playlist: PlaylistInterface): void {
        // if (src) {
            const items = [];
            for (let i = 0; i<= 50; i++) {
                items.push(playlist.items[i]);
            }
            console.log(items);

        // const mediaInfo = new this.chrome.cast.media.MediaInfo(items[0].mp4[0], 'video/mp4');
            const request = new this.chrome.cast.media.LoadRequest(items[0].mp4[0], 'video/mp4');

            console.log(items);
            request.queueData = new this.chrome.cast.media.QueueData(
                'id',
                'name',
                'desc',
                'OFF',
                items.map((item: PlayableItem) => new this.chrome.cast.media.QueueItem(
                    new this.chrome.cast.media.MediaInfo(item.mp4[0], 'video/mp4'))
                )
            );

            this.cast.framework.CastContext.getInstance().getCurrentSession().loadMedia(request).then((r: any) => {
                console.log('loaded', r);
            });
        // }
    }

    requestFullScreen(): Promise<void> {
        return new Promise(() => {
        });
    }

    resume(): void {
        // if (!this.remotePlayer.isPaused) {
        this.remotePlayerController.playOrPause();
        // }
    }

    setCurrentVideoTime(time: number): void {
    }

    setPosterSource(src: string): void {
    }

    setVideoElement(ref: any): void {
    }

    setVideoSource(src: string): void {
    }

    setVideoVolume(volume: number): void {
    }
}

export default CastSenderAdapter;
