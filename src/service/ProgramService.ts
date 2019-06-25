import { injectable } from "inversify";
import "reflect-metadata";
import ProgramServiceInterface from "./ProgramServiceInterface";
import * as joj from "../data/joj.sk/archive.json";

@injectable()
class ProgramService implements ProgramServiceInterface {
    private basename: string = '/react-typescript';

    findAll(channelId: string): Promise<Array<{}>> {
        let data: Array<{}> = [];
        if (channelId === 'joj.sk') {
            data = (<any>joj).default;
        }
        return new Promise(function(resolve){
            resolve(data);
        });
    }

    findOne(channel: string, slug: string): Promise<Array<any>> {
        return fetch(`${this.basename}/data/${channel}/${slug}.json`)
            .then((r: Response) => r.text())
            .then((str: string) => JSON.parse(str));
    }
}

export default ProgramService;
