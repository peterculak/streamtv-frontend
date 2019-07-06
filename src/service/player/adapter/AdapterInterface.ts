interface AdapterInterface {
    /**
     * Video stream source
     * @param src
     */
    setVideoSource(src: string): void;

    /**
     * Poster source which will show before video starts playing
     * @param src
     */
    setPosterSource(src: string): void;

    /**
     * Starts playing stream source
     */
    play(src?: string): void;

    /**
     * Pause current stream
     */
    pause(): void;

    /**
     * Resume current stream
     */
    resume(): void;

    /**
     * Whether loaded stream is currently playing
     */
    isPlaying(): boolean;

    /**
     * Stream url which is currently playing
     */
    currentStream(): string;

    /**
     * Gets the current playback position, in seconds.
     */
    getCurrentVideoTime(): number;

    /**
     * Sets the current playback position, in seconds.
     */
    setCurrentVideoTime(time: number): void;

    /**
     * Video screen handle
     * e.g. in Dom environment it's HTMLElement
     * @param ref
     */
    setVideoElement(ref: any): void;

    hasVideoElement(): boolean;

    addListener(eventName: string, callback: any): void;

    getVideoElementHeight(): string;

    /**
     * Returns video duration from host environment
     */
    getVideoDuration(): number;
}

export default AdapterInterface;
