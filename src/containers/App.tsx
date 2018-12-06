import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import Layout from './Layout';
import '../vendor/styles/bootstrap.scss';
import '../vendor/styles/app.scss';
import ContainerInterface from "../framework/container/ContainerInterface";
import worldFirst from './themes/worldFirst';

interface LayoutPropsInterface {
    container: ContainerInterface
}

class App extends React.Component<LayoutPropsInterface, any> {
    constructor(props: LayoutPropsInterface) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider theme={worldFirst}>
                    <Layout {...this.props} />
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
