import { injectable } from "inversify";
import "reflect-metadata";
import ProgramServiceInterface from "./ProgramServiceInterface";

@injectable()
class ProgramService implements ProgramServiceInterface {
    findAll(channelId: string): Promise<Array<any>> {
        return new Promise(function(resolve){
            resolve([]);
        });
    }
}

export default ProgramService;
