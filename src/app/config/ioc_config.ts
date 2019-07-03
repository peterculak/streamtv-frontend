import "reflect-metadata";
import { Container } from "inversify";
import ChannelServiceInterface from "../../service/ChannelServiceInterface";
import ChannelService from "../../service/ChannelService";
import ProgramServiceInterface from "../../service/ProgramServiceInterface";
import ProgramService from "../../service/ProgramService";
import CONSTANTS from "./constants/ioc";
import AuthInterface from "../../service/auth/AuthInterface";
import Auth from "../../service/auth/index";

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

export { container };
