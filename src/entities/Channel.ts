import { injectable } from "inversify";

import {ChannelInterface} from "./ChannelInterface";

@injectable()
export class Channel implements ChannelInterface {
    public id: string;
    public datafile: string;
    public name?: string;
    public image?: string;

    public constructor(id: string, datafile: string, name: string = '', image: string = '') {
        this.id = id;
        this.datafile = datafile;
        this.name = name;
        this.image = image;
    }
}
