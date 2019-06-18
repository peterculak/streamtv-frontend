import { injectable } from "inversify";

import {ChannelInterface} from "./ChannelInterface";

@injectable()
export class Channel implements ChannelInterface {
    public id: string;
    public name: string;
    public image: string;

    public constructor(id: string, name: string, image: string) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}
