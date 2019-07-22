import "reflect-metadata";
import { Container } from "inversify";
import ChannelServiceInterface from "../../service/ChannelServiceInterface";
import ChannelService from "../../service/ChannelService";
import ProgramServiceInterface from "../../service/ProgramServiceInterface";
import ProgramService from "../../service/ProgramService";
import CONSTANTS from "./constants/ioc";
import AuthInterface from "../../service/auth/AuthInterface";
import Auth from "../../service/auth/index";
import Player from "../../service/player/Player";
import CastSenderAdapter from "../../service/player/adapter/CastSenderAdapter";

import JavascriptTimeAgo from 'javascript-time-ago';
import sk from 'javascript-time-ago/locale/sk';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.locale(en);
JavascriptTimeAgo.locale(sk);

let container = new Container();
container.bind<AuthInterface>(CONSTANTS.AUTH).to(Auth).inSingletonScope();
const auth = container.get<AuthInterface>(CONSTANTS.AUTH);

const channelService = () => new ChannelService(
    process.env.REACT_APP_BASENAME as string,
    auth.password
);
container.bind<ChannelServiceInterface>(CONSTANTS.CHANNELS).toDynamicValue(channelService);
container.bind<ProgramServiceInterface>(CONSTANTS.PROGRAMS).toDynamicValue( () => new ProgramService(
    channelService(),
    process.env.REACT_APP_BASENAME as string,
    auth.password
));

container.bind<Player>(CONSTANTS.PLAYER).to(Player).inSingletonScope();
(window as any)['__onGCastApiAvailable'] = function (isAvailable: boolean) {
    if (isAvailable) {
        const cast = window.cast;
        const chrome = (window as any).chrome;
        if (cast !== undefined && chrome !== undefined) {
            container.get<Player>(CONSTANTS.PLAYER).initializeCastPlayer(
                new CastSenderAdapter(cast, chrome)
            );
        }
    }
};

export { container };
