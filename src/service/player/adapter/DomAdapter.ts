import HtmlAdapterInterface from "./HtmlAdapterInterface";
import AdapterException from "./AdapterException";

class DomAdapter implements HtmlAdapterInterface {
    private readonly htmlVideoElement: HTMLVideoElement;

    constructor(private _window: Window = window, ref: HTMLVideoElement) {
        this._window = window;
        this.htmlVideoElement = ref;
    }

    getVideoElementHeight(): string {
        return String(this._window.getComputedStyle(this.htmlVideoElement).height);
    }

    getVideoElementWidth(): string {
        return String(this._window.getComputedStyle(this.htmlVideoElement).width);
    }

    hasVideoElement(): boolean {
        return this.htmlVideoElement !== undefined;
    }

    play(src?: string): Promise<any> {
        if (src) {
            this.setVideoSource(src);
            return this.htmlVideoElement.play();
        } else if (this.htmlVideoElement.src) {
            return this.htmlVideoElement.play();
        } else {
            throw AdapterException.emptyVideoSource();
        }
    }

    setPosterSource(src: string): void {
        this.htmlVideoElement.poster = src;
    }

    setVideoSource(src: string): void {
        this.htmlVideoElement.src = src;
    }

    pause(): void {
        this.htmlVideoElement.pause();
    }

    resume(): void {
        this.htmlVideoElement.play();
    }

    isPlaying(): boolean {
        return !this.htmlVideoElement.paused;
    }

    currentStream(): string {
        return this.htmlVideoElement.src;
    }

    addListener(type: string, listener: EventListenerOrEventListenerObject): void {
        this.htmlVideoElement.addEventListener(type, listener);
    }

    removeListener(type: string, listener: EventListenerOrEventListenerObject): void {
        this.htmlVideoElement.removeEventListener(type, listener);
    }

    getCurrentVideoTime(): number {
        return this.htmlVideoElement.currentTime;
    }

    setCurrentVideoTime(numberOfSeconds: number): void {
        if (!this.htmlVideoElement.src) {
            throw AdapterException.emptyVideoSource();
        }

        this.htmlVideoElement.currentTime = numberOfSeconds;
    }

    getVideoDuration(): number {
        return this.htmlVideoElement.duration;
    }

    getVideoVolume(): number {
        return this.muted ? 0 : this.htmlVideoElement.volume;
    }

    setVideoVolume(volume: number): void {
        if (volume < 0 || volume > 1) {
            throw AdapterException.volumeOutOfRange(volume, 0, 1);
        }

        if (volume === 0) {
            this.htmlVideoElement.muted = true;
        } else {
            if (this.htmlVideoElement.muted) {
                this.htmlVideoElement.muted = false;
            }
        }
        this.htmlVideoElement.volume = volume;
    }

    get muted(): boolean {
        return this.htmlVideoElement.muted;
    }

    set muted(value: boolean) {
        this.htmlVideoElement.muted = value;
    }

    isFullScreenAvailable(): boolean {
        return typeof this.htmlVideoElement.requestFullscreen === 'function';
    }

    requestFullScreen(): Promise<void> {
        return this.htmlVideoElement.requestFullscreen();
    }
}

export default DomAdapter;
