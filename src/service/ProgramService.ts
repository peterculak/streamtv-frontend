import {injectable} from "inversify";
import "reflect-metadata";
import ProgramServiceInterface from "./ProgramServiceInterface";
import * as crypto from "crypto-js";


@injectable()
class ProgramService implements ProgramServiceInterface {
    constructor(private readonly basename: string) {
    }

    findAll(channelId: string): Promise<Array<{}>> {
        const url = this.basename ? `${this.basename}/data/${channelId}/archive_enc.json` : `/data/${channelId}/archive_enc.json`;
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
