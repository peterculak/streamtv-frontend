import HtmlAdapterInterface from "./adapter/HtmlAdapterInterface";
import PlayerInterface from "./PlayerInterface";

interface HtmlPlayerInterface extends PlayerInterface {
    initializeHtmlPlayer(adapter: HtmlAdapterInterface, callbacks?: any): void;
    getVideoElementHeight(): string;
    getVideoElementWidth(): string;
    isFullScreenAvailable(): boolean;
    requestFullScreen(): Promise<void>|void;
}

export default HtmlPlayerInterface;
