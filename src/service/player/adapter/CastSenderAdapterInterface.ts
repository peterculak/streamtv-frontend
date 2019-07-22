import PlayableItem from '../PlayableItem';
import AdapterInterface from "./AdapterInterface";

interface CastSenderAdapterInterface extends AdapterInterface {
    /**
     * Whether player is currently connected to remote screen (casting)
     */
    isConnected(): boolean;
    /**
     * Cast Adapter
     * @param items
     */
    loadQueueData(items: Array<PlayableItem>): void;
}

export default CastSenderAdapterInterface;
