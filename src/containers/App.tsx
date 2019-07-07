import * as React from 'react';
import {HashRouter} from 'react-router-dom';
import {MuiThemeProvider, Theme} from '@material-ui/core/styles';
import Layout from './Layout';
import {Container} from "inversify";
import CssBaseline from '@material-ui/core/CssBaseline';
import {AuthProvider} from "../context/authContext";
import AuthInterface from "../service/auth/AuthInterface";
import CONSTANTS from "../app/config/constants/ioc";
import LocaleInterface from "../entities/LocaleInterface";
import {useSelector} from 'react-redux';

interface PropsInterface {
    container: Container,
    locale: LocaleInterface,
}

function App(props: PropsInterface) {
    const {container, ...rest} = props;
    const authService = props.container.get<AuthInterface>(CONSTANTS.AUTH);

    const {theme} = useSelector((state: {theme: Theme}) => ({
        theme: state.theme,
    }));

    return (
        <HashRouter>
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <AuthProvider authService={authService}>
                        <Layout container={props.container} {...rest} />
                    </AuthProvider>
                </CssBaseline>
            </MuiThemeProvider>
        </HashRouter>
    );
}

export default App;
