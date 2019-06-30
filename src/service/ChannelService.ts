import {injectable} from "inversify";
import ChannelServiceInterface from "./ChannelServiceInterface";
import {ChannelInterface} from "../entities/ChannelInterface";
import {Channel} from "../entities/Channel";

@injectable()
class ChannelService implements ChannelServiceInterface {
    private readonly channels: Array<ChannelInterface>;

    constructor() {
        this.channels = [
            new Channel('joj.sk', 'Joj', 'https://img.joj.sk/rx/logojoj.png'),
            new Channel('plus.joj.sk', 'Plus', 'https://img.joj.sk/rx/78c61f2d0cdbde28c9ebe3af34299a98.png')
        ];
    }

    findAll(): Promise<Array<ChannelInterface>> {
        return new Promise(resolve => resolve(this.channels));
    }

    find(id: string): Promise<ChannelInterface> {
        return new Promise(resolve => resolve(this.channels.find((channel: ChannelInterface) => {
            return channel.id === id
        })));
    }
}

export default ChannelService;
