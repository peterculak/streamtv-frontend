import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import Layout from './Layout';
// import ContainerInterface from "../framework/container/ContainerInterface";
import streamTv from './themes/streamTv';

// interface LayoutPropsInterface {
//     container: ContainerInterface
// }

class App extends React.Component<any, any> {
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider theme={streamTv}>
                    <Layout {...this.props} />
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
