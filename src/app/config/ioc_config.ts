import "reflect-metadata";
import { Container } from "inversify";
import ChannelServiceInterface from "../../service/ChannelServiceInterface";
import ChannelService from "../../service/ChannelService";
import ProgramServiceInterface from "../../service/ProgramServiceInterface";
import ProgramService from "../../service/ProgramService";
import CONSTANTS from "./constants/ioc";
import AuthInterface from "../../service/auth/AuthInterface";
import Auth from "../../service/auth/index";

import JavascriptTimeAgo from 'javascript-time-ago';
import sk from 'javascript-time-ago/locale/sk';
import en from 'javascript-time-ago/locale/en';
import PlayerInterface from "../../service/player/PlayerInterface";
import Player from "../../service/player/Player";
import CastSenderAdapter from "../../service/player/adapter/CastSenderAdapter";
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

container.bind<PlayerInterface>(CONSTANTS.PLAYER).to(Player).inSingletonScope();
(window as any)['__onGCastApiAvailable'] = function (isAvailable: boolean) {
    if (isAvailable) {
        const adapter = new CastSenderAdapter((window as any).cast, (window as any).chrome);
        container.get<PlayerInterface>(CONSTANTS.PLAYER).initializeCastPlayer(adapter);
    }
};

export { container };
