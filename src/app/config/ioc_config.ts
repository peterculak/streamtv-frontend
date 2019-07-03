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
container.bind<ChannelServiceInterface>(CONSTANTS.CHANNELS).to(ChannelService);

const auth = container.get<AuthInterface>(CONSTANTS.AUTH);
container.bind<ProgramServiceInterface>(CONSTANTS.PROGRAMS).toDynamicValue( () => new ProgramService(
    process.env.REACT_APP_BASENAME as string,
    auth.password
));

export { container };
