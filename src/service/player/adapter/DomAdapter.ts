import AdapterInterface from "./AdapterInterface";
import AdapterException from "./AdapterException";

class DomAdapter implements AdapterInterface {
    private htmlVideoElement: HTMLVideoElement|undefined;

    setVideoElement(ref: HTMLVideoElement): void {
        this.htmlVideoElement = ref;
    }

    getVideoElement(): HTMLVideoElement|undefined {
        return this.htmlVideoElement;
    }

    hasVideoElement(): boolean {
        return this.htmlVideoElement !== undefined;
    }

    play(src?: string): void {
        if (!this.htmlVideoElement) {
            throw AdapterException.noVideoElement()
        }
        if (src) {
            this.setVideoSource(src);
            this.htmlVideoElement.play();
        } else if (this.htmlVideoElement.src) {
            this.htmlVideoElement.play();
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
}

export default DomAdapter;