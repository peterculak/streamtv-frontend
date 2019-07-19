import AdapterInterface from "./AdapterInterface";
import AdapterException from "./AdapterException";
import PlayableItem from "../PlayableItem";

class DomAdapter implements AdapterInterface {
    private htmlVideoElement: HTMLVideoElement|undefined;

    constructor(private _window: Window = window) {
        this._window = window;
    }

    setVideoElement(ref: HTMLVideoElement): void {
        this.htmlVideoElement = ref;
    }

    getVideoElementHeight(): string {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement()
        }

        return String(this._window.getComputedStyle(this.htmlVideoElement).height);
    }

    getVideoElementWidth(): string {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement()
        }

        return String(this._window.getComputedStyle(this.htmlVideoElement).width);
    }

    hasVideoElement(): boolean {
        return this.htmlVideoElement !== undefined;
    }

    play(src?: string): Promise<any> {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement()
        }
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
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }
        this.htmlVideoElement.poster = src;
    }

    setVideoSource(src: string): void {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }
        this.htmlVideoElement.src = src;
    }

    pause(): void {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }
        this.htmlVideoElement.pause();
    }

    resume(): void {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }
        this.htmlVideoElement.play();
    }

    isPlaying(): boolean {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }
        return !this.htmlVideoElement.paused;
    }

    currentStream(): string {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }
        return this.htmlVideoElement.src;
    }

    addListener(type: string, listener: EventListenerOrEventListenerObject): void {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }
        this.htmlVideoElement.addEventListener(type, listener);
    }

    getCurrentVideoTime(): number {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }

        return this.htmlVideoElement.currentTime;
    }

    setCurrentVideoTime(numberOfSeconds: number): void {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }

        if (!this.htmlVideoElement.src) {
            throw AdapterException.emptyVideoSource();
        }

        this.htmlVideoElement.currentTime = numberOfSeconds;
    }

    getVideoDuration(): number {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }

        return this.htmlVideoElement.duration;
    }

    getVideoVolume(): number {
        if (!this.htmlVideoElement) {
            return 1;
        }

        return this.muted ? 0 : this.htmlVideoElement.volume;
    }

    setVideoVolume(volume: number): void {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }

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
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }

        return this.htmlVideoElement.muted;
    }

    set muted(value: boolean) {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }
        this.htmlVideoElement.muted = value;
    }

    isFullScreenAvailable(): boolean {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }

        return typeof this.htmlVideoElement.requestFullscreen === 'function';
    }

    requestFullScreen(): Promise<void> {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement();
        }

        return this.htmlVideoElement.requestFullscreen();
    }

    loadQueueData(items: Array<PlayableItem>): void {
    }
}

export default DomAdapter;
