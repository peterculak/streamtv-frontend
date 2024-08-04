import {injectable} from "inversify";
import * as crypto from "crypto-js";
import {ChannelInterface} from "../entities/ChannelInterface";
import {Channel} from "../entities/Channel";
import ChannelServiceInterface from "./ChannelServiceInterface";

interface ChannelJson {
    datafile: string;
    image: string;
}

interface AllChannelsJson {
    [key: string]: ChannelJson
}

@injectable()
class ChannelService implements ChannelServiceInterface {
    private readonly channels: Array<ChannelInterface> = [];

    constructor(private readonly basename: string, private readonly password: string) {
    }

    findAll(): Promise<Array<ChannelInterface>> {
        const channelsUrl = this.basename ? `${this.basename}/data/channels.json` : '/data/channels.json';

        return fetch(channelsUrl).then((r: Response) => r.text())
            .then((encrypted: string) => this.decrypt(encrypted))
            .then((jsonString: string) => JSON.parse(jsonString))
            .then((channels: AllChannelsJson) => {
                Object.keys(channels).forEach((channelId: string) => {
                    const channelData = channels[channelId];
                    this.channels.push(new Channel(channelId, channelData.datafile, channelId, channelData.image));
                });
                return this.channels;
            });
    }

    //todo fix this
    find(id: string): Promise<ChannelInterface> {
        if (!this.channels.length) {
            return this.findAll().then((channels: Array<ChannelInterface>) => {
                const channel = channels.find((channel: ChannelInterface) => channel.id === id);
                if (!channel) {
                    throw new Error('Channel not found');
                }
                return channel;
            });
        } else {
            return new Promise(resolve => resolve(this.channels.find((channel: ChannelInterface) => {
                return channel.id === id
            })));
        }
    }

    private decrypt(content: string): string {
        const bytes = crypto.AES.decrypt(content, this.password);
        return bytes.toString(crypto.enc.Utf8);
    }
}

export default ChannelService;
