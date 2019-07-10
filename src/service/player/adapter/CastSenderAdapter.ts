import AdapterException from "./AdapterException";
import AdapterInterface from "./AdapterInterface";

class CastSenderAdapter implements AdapterInterface {
    /**
     * Cast sender api (window.cast)
     * <script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
     */
    private cast: any;

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
        this.remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
            (e: any) => {
                console.log('IS_CONNECTED_CHANGED', e);
                const session = cast.framework.CastContext.getInstance().getCurrentSession();
                console.log(session);
            }
        );
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
        return 0;
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

    play(src?: string): void {
        if (src) {
            const mediaInfo = new this.chrome.cast.media.MediaInfo(src, 'video/mp4');
            const request = new this.chrome.cast.media.LoadRequest(mediaInfo);
            this.cast.framework.CastContext.getInstance().getCurrentSession().loadMedia(request);
        }
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
