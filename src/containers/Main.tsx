import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Container} from "inversify";
import Error404 from '../app/controller/Error/Error404';
import AuthController from "../app/controller/Auth";
import EpisodeDetailController from "../app/controller/EpisodeDetail";
import ChannelsController from "../app/controller/Channels";
import ProgramController from "../app/controller/Programs";
import CONSTANTS from "../app/config/constants/ioc";
import ChannelServiceInterface from "../service/ChannelServiceInterface";
import ProgramServiceInterface from "../service/ProgramServiceInterface";
import {useAuth} from "../context/authContext";
import {withStyles, Theme} from '@material-ui/core/styles';

interface PropsInterface {
    classes: any,
    container: Container,
}

const styles = (theme: Theme) => ({
    main: {
        height: '100%',
    }
});

function Main(props: PropsInterface) {
    const channelService = props.container.get<ChannelServiceInterface>(CONSTANTS.CHANNELS);
    const programService = props.container.get<ProgramServiceInterface>(CONSTANTS.PROGRAMS);
    const auth = useAuth() as any;
    const {classes} = props;

    return auth.isLoggedIn() ? (
        <main className={classes.main}>
            <Switch>
                <Route exact path='/'
                       render={(props: any) => <ChannelsController
                           channelService={channelService}
                           {...props}
                       />}
                />
                <Route exact path='/:channelId'
                       render={(props: any) => <ProgramController
                           programService={programService}
                           {...props}
                       />}
                />
                <Route exact path='/:channelId/:slug'
                       render={(props: any) => <EpisodeDetailController
                           channelService={channelService}
                           programService={programService}
                           {...props}
                       />}
                />
                <Route
                    component={Error404}/>
            </Switch>
        </main>
    ) : (
        <main className={classes.main}>
            <Switch>
                <Route path='/'
                       render={(props: any) => <AuthController
                           {...props}
                       />}
                />
            </Switch>
        </main>
    );
}

export default withStyles(styles, {withTheme: true})(Main);
