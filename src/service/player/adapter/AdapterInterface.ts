import PlayableItem from '../PlayableItem';

interface AdapterInterface {
    muted: boolean;
    /**
     * Video stream source
     * @param src
     */
    setVideoSource(src: string): void;

    /**
     * Starts playing stream source
     */
    play(item?: string|PlayableItem): Promise<any>;

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
    addListener(eventName: string, callback: any): void;
    removeListener(eventName: string, callback: any): void;

    /**
     * Returns video duration from host environment
     */
    getVideoDuration(): number;

    /**
     * Html5 video element spec
     * Specifies the audio volume of the video. Must be a number between 0.0 to 1.0
     * * Example values:
     * 1.0 is highest volume (100%. This is default)
     * 0.5 is half volume (50%)
     * 0.0 is silent (same as mute)
     * default value 1
     */
    getVideoVolume(): number;

    /**
     * Should be number between 0 - 1
     */
    setVideoVolume(volume: number): void;

    unmount(): void;
}

export default AdapterInterface;
