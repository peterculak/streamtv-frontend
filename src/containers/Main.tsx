import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Error404 from '../app/controller/Error/Error404';
import ChannelsController from "../app/controller/Channels";
import ProgramController from "../app/controller/Programs";
import CONSTANTS from "../app/config/constants";
import ChannelServiceInterface from "../service/ChannelServiceInterface";
import ProgramServiceInterface from "../service/ProgramServiceInterface";
import {container} from "../app/config/ioc_config";

class Main extends React.Component<any, any> {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/'
                           render={(props: any) => <ChannelsController
                               channelService={container.get<ChannelServiceInterface>(CONSTANTS.CHANNELS)}
                               {...props}
                           />}
                    />
                    <Route exact path='/:channelId'
                           render={(props: any) => <ProgramController
                               channelService={container.get<ChannelServiceInterface>(CONSTANTS.CHANNELS)}
                               programService={container.get<ProgramServiceInterface>(CONSTANTS.PROGRAMS)}
                               {...props}
                           />}
                    />
                    <Route
                        component={Error404}/>
                </Switch>
            </main>
        );
    }
}

export default Main;
