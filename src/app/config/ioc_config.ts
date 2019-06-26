import "reflect-metadata";
import { Container } from "inversify";
import ChannelServiceInterface from "../../service/ChannelServiceInterface";
import ChannelService from "../../service/ChannelService";
import ProgramServiceInterface from "../../service/ProgramServiceInterface";
import ProgramService from "../../service/ProgramService";
import CONSTANTS from "./constants/ioc";

let container = new Container();
const programService = new ProgramService(process.env.REACT_APP_BASENAME as string);
container.bind<ChannelServiceInterface>(CONSTANTS.CHANNELS).to(ChannelService);
container.bind<ProgramServiceInterface>(CONSTANTS.PROGRAMS).toConstantValue(programService);

export { container };
