import {injectable} from "inversify";
import "reflect-metadata";
import ProgramServiceInterface from "./ProgramServiceInterface";
import * as crypto from "crypto-js";

@injectable()
class ProgramService implements ProgramServiceInterface {
    private channels: any = {};

    constructor(private readonly basename: string) {
    }

    findAll(channelId: string): Promise<Array<{}>> {
        const channelsUrl = this.basename ? `${this.basename}/data/channels.json` : '/data/channels.json';
        const filename = this.channels[channelId];

        if (!this.channels.length) {
            return fetch(channelsUrl).then((r: any) => r.text())
                .then((channels: any) => {
                    this.channels = JSON.parse(channels);
                    const filename = this.channels[channelId];
                    return this.fetchChannel(channelId, filename);
                });
        } else {
            return this.fetchChannel(channelId, filename);
        }
    }

    private fetchChannel(channelId: string, filename: string) {
        const url = this.basename ? `${this.basename}/data/${channelId}/${filename}` : `/data/${channelId}/${filename}`;
        return fetch(url).then((r: any) => r.text())
            .then((content: string) => JSON.parse(this.decrypt(content)));
    }

    private decrypt(content: string): string {
        const bytes = crypto.AES.decrypt(content, process.env.REACT_APP_PASSWORD as string);
        return bytes.toString(crypto.enc.Utf8);
    }

    findOne(channel: string, slug: string): Promise<Array<any>> {
        const url = this.basename ? `${this.basename}/data/${channel}/${slug}` : `/data/${channel}/${slug}`;
        return fetch(url)
            .then((r: Response) => r.text())
            .then((encrypted: string) => JSON.parse(this.decrypt(encrypted)))
            ;
    }
}

export default ProgramService;
