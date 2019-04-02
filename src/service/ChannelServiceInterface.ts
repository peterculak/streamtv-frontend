import {ChannelInterface} from "../entities/ChannelInterface";

interface ChannelServiceInterface {
    find(id: string): Promise<ChannelInterface>;
    findAll(): Promise<Array<any>>;
}

export default ChannelServiceInterface;
