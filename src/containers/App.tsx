import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Layout from './Layout';
// import 'react-big-calendar/lib/less/styles.less';
import '../styles/bootstrap.scss';
import '../styles/app.scss';
import defaultTheme from './themes/defaultTheme';
import ContainerInterface from "../framework/container/ContainerInterface";

interface LayoutPropsInterface {
    container: ContainerInterface
}

class App extends React.Component<LayoutPropsInterface, any> {
    constructor(props: LayoutPropsInterface) {
        super(props);
    }

    render() {
        const applyTheme = createMuiTheme(defaultTheme);
        document.body.classList.remove('rtl');
        applyTheme.direction = 'ltr';

        return (
            <BrowserRouter>
                <MuiThemeProvider theme={applyTheme}>
                    <Layout {...this.props} />
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
