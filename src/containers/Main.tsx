import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Container} from "inversify";
import Error404 from '../app/controller/Error/Error404';
import ChannelsController from "../app/controller/Channels";
import ProgramController from "../app/controller/Programs";
import CONSTANTS from "../app/config/constants/ioc";
import ChannelServiceInterface from "../service/ChannelServiceInterface";
import ProgramServiceInterface from "../service/ProgramServiceInterface";
import ProgramDetailController from "../app/controller/ProgramDetail";
import EpisodeDetailController from "../app/controller/EpisodeDetail";

interface PropsInterface {
    container: Container
}
class Main extends React.Component<PropsInterface, any> {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/'
                           render={(props: any) => <ChannelsController
                               channelService={this.props.container.get<ChannelServiceInterface>(CONSTANTS.CHANNELS)}
                               {...props}
                           />}
                    />
                    <Route exact path='/:channelId'
                           render={(props: any) => <ProgramController
                               channelService={this.props.container.get<ChannelServiceInterface>(CONSTANTS.CHANNELS)}
                               programService={this.props.container.get<ProgramServiceInterface>(CONSTANTS.PROGRAMS)}
                               {...props}
                           />}
                    />
                    <Route exact path='/:channelId/:slug'
                           render={(props: any) => <ProgramDetailController
                               channelService={this.props.container.get<ChannelServiceInterface>(CONSTANTS.CHANNELS)}
                               programService={this.props.container.get<ProgramServiceInterface>(CONSTANTS.PROGRAMS)}
                               {...props}
                           />}
                    />
                    <Route exact path='/:channelId/:slug/episode/:episodeNumber'
                           render={(props: any) => <EpisodeDetailController
                               channelService={this.props.container.get<ChannelServiceInterface>(CONSTANTS.CHANNELS)}
                               programService={this.props.container.get<ProgramServiceInterface>(CONSTANTS.PROGRAMS)}
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
