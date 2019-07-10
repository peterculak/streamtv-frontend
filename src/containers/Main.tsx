import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Container} from "inversify";
import Error404 from '../app/controller/Error/Error404';
import AuthController from "../app/controller/Auth";
import EpisodeDetailController from "../app/controller/EpisodeDetail";
import ChannelsController from "../app/controller/Channels";
import ProgramController from "../app/controller/Programs";
import Animation from "../app/controller/Sandbox/animation";
import Slider from "../app/controller/Sandbox/slider";
import CONSTANTS from "../app/config/constants/ioc";
import ChannelServiceInterface from "../service/ChannelServiceInterface";
import ProgramServiceInterface from "../service/ProgramServiceInterface";
import {useAuth} from "../context/authContext";
import {withStyles, Theme} from '@material-ui/core/styles';
import LocaleInterface from "../entities/LocaleInterface";
import GoogleCastButton from "../app/controller/Sandbox/castButton";

interface PropsInterface {
    classes: any,
    container: Container,
    locale: LocaleInterface,
}

const styles = (theme: Theme) => ({
    main: {
        height: '100%',
    }
});

function Main(props: PropsInterface) {
    const channelService = props.container.get<ChannelServiceInterface>(CONSTANTS.CHANNELS);
    const programService = props.container.get<ProgramServiceInterface>(CONSTANTS.PROGRAMS);
    const auth = useAuth();
    const {classes} = props;

    return auth.isLoggedIn() ? (
        <main className={classes.main}>
            <Switch>
                <Route exact path='/'
                       render={(routeProps: any) => <ChannelsController
                           channelService={channelService}
                           locale={props.locale}
                           {...routeProps}
                       />}
                />
                <Route exact path='/sandbox/animate'
                       render={(routeProps: any) => <Animation
                           {...routeProps}
                       />}
                />
                <Route exact path='/sandbox/slider'
                       render={(routeProps: any) => <Slider
                           {...routeProps}
                       />}
                />
                <Route exact path='/sandbox/cast'
                       render={(routeProps: any) => <GoogleCastButton
                           {...routeProps}
                       />}
                />
                <Route exact path='/:channelId'
                       render={(routeProps: any) => <ProgramController
                           programService={programService}
                           locale={props.locale}
                           {...routeProps}
                       />}
                />
                <Route exact path='/:channelId/:slug'
                       render={(routeProps: any) => <EpisodeDetailController
                           channelService={channelService}
                           programService={programService}
                           locale={props.locale}
                           {...routeProps}
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
