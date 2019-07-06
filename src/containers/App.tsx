import * as React from 'react';
import {HashRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import Layout from './Layout';
import streamTv from './themes/streamTv';
import {Container} from "inversify";
import CssBaseline from '@material-ui/core/CssBaseline';
import {AuthProvider} from "../context/authContext";
import AuthInterface from "../service/auth/AuthInterface";
import CONSTANTS from "../app/config/constants/ioc";
import LocaleInterface from "../entities/LocaleInterface";

interface PropsInterface {
    container: Container,
    locale: LocaleInterface,
}
class App extends React.Component<PropsInterface, any> {
    render() {
        const authService = this.props.container.get<AuthInterface>(CONSTANTS.AUTH);
        return (
            <HashRouter>
                <MuiThemeProvider theme={streamTv}>
                    <CssBaseline>
                        <AuthProvider authService={authService}>
                            <Layout container={this.props.container} {...this.props} />
                        </AuthProvider>
                    </CssBaseline>
                </MuiThemeProvider>
            </HashRouter>
        );
    }
}

export default App;
