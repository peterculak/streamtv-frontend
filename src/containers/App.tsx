import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import Layout from './Layout';
import streamTv from './themes/streamTv';
import {Container} from "inversify";

interface PropsInterface {
    container: Container
}
class App extends React.Component<PropsInterface, any> {
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider theme={streamTv}>
                    <Layout container={this.props.container} {...this.props} />
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
