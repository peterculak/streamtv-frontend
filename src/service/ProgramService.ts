import {injectable} from "inversify";
import "reflect-metadata";
import * as crypto from "crypto-js";
import ProgramServiceInterface from "./ProgramServiceInterface";
import {ChannelInterface} from "../entities/ChannelInterface";
import ChannelServiceInterface from "./ChannelServiceInterface";

@injectable()
class ProgramService implements ProgramServiceInterface {
    constructor(
        private channelService: ChannelServiceInterface,
        private readonly basename: string,
        private readonly password: string) {
    }

    findAll(channelId: string): Promise<Array<{}>> {
        return this.channelService.find(channelId).then((channel: ChannelInterface) => {
            const url = this.basename ? `${this.basename}/data/${channel.datafile}` : `/data/${channel.datafile}`;
            return fetch(url).then((r: any) => r.text())
                .then((content: string) => JSON.parse(this.decrypt(content)));
        });
    }

    findOne(slug: string): Promise<Array<any>> {
        const url = this.basename ? `${this.basename}/data/${slug}` : `/data/${slug}`;
        return fetch(url)
            .then((r: Response) => r.text())
            .then((encrypted: string) => JSON.parse(this.decrypt(encrypted)))
            ;
    }

    private decrypt(content: string): string {
        const bytes = crypto.AES.decrypt(content, this.password);
        return bytes.toString(crypto.enc.Utf8);
    }
}

export default ProgramService;
