import AdapterInterface from "./AdapterInterface";

interface HtmlAdapterInterface extends AdapterInterface {
    /**
     * Poster source which will show before video starts playing
     * @param src
     */
    setPosterSource(src: string): void;
    hasVideoElement(): boolean;
    getVideoElementHeight(): string;
    getVideoElementWidth(): string;
    isFullScreenAvailable(): boolean;
    requestFullScreen(): Promise<void>;
}

export default HtmlAdapterInterface;
