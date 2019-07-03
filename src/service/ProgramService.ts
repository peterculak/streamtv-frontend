import {injectable} from "inversify";
import "reflect-metadata";
import ProgramServiceInterface from "./ProgramServiceInterface";
import * as crypto from "crypto-js";

@injectable()
class ProgramService implements ProgramServiceInterface {
    private channels: any = {};

    constructor(private readonly basename: string, private readonly password: string) {
    }

    findAll(channelId: string): Promise<Array<{}>> {
        const channelsUrl = this.basename ? `${this.basename}/data/channels.json` : '/data/channels.json';
        const filename = this.channels[channelId];

        if (!this.channels.length) {
            return fetch(channelsUrl).then((r: any) => r.text())
                .then((channels: any) => {
                    this.channels = JSON.parse(channels);
                    const filename = this.channels[channelId];
                    return this.fetchChannel(filename);
                });
        } else {
            return this.fetchChannel(filename);
        }
    }

    findOne(slug: string): Promise<Array<any>> {
        const url = this.basename ? `${this.basename}/data/${slug}` : `/data/${slug}`;
        return fetch(url)
            .then((r: Response) => r.text())
            .then((encrypted: string) => JSON.parse(this.decrypt(encrypted)))
            ;
    }

    private fetchChannel(filename: string) {
        const url = this.basename ? `${this.basename}/data/${filename}` : `/data/${filename}`;
        return fetch(url).then((r: any) => r.text())
            .then((content: string) => JSON.parse(this.decrypt(content)));
    }

    private decrypt(content: string): string {
        const bytes = crypto.AES.decrypt(content, this.password);
        return bytes.toString(crypto.enc.Utf8);
    }
}

export default ProgramService;
