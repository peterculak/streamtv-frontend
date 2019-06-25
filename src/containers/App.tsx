import * as React from 'react';
import {HashRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import Layout from './Layout';
import streamTv from './themes/streamTv';
import {Container} from "inversify";
import CssBaseline from '@material-ui/core/CssBaseline';

interface PropsInterface {
    container: Container
}
class App extends React.Component<PropsInterface, any> {
    render() {

        return (
            <HashRouter>
                <MuiThemeProvider theme={streamTv}>
                    <CssBaseline>
                        <Layout container={this.props.container} {...this.props} />
                    </CssBaseline>
                </MuiThemeProvider>
            </HashRouter>
        );
    }
}

export default App;
