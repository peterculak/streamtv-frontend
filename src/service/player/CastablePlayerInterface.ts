import CastSenderAdapterInterface from "./adapter/CastSenderAdapterInterface";
import PlayerInterface from "./PlayerInterface";

interface CastablePlayerInterface extends PlayerInterface {
    isCasting: boolean;
    canCast: boolean;
    initializeCastPlayer(adapter: CastSenderAdapterInterface): void;
}

export default CastablePlayerInterface;
