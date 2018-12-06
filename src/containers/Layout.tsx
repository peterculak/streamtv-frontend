import * as React from 'react';
import Header from './Header/index';
import Sidebar from '../vendor/components/SideNav/index';
import ContainerInterface from '../framework/container/ContainerInterface';
import Main from './Main';
import {Theme} from '@material-ui/core/styles';

interface LayoutPropsInterface {
    container: ContainerInterface,
    theme: Theme,
}

class Layout extends React.Component<LayoutPropsInterface, any> {
    constructor(props: LayoutPropsInterface) {
        super(props);
    }

    render() {
        return (<div className="app-main">
            <div className="app-container fixed-drawer">
                <Sidebar/>
                <div className="app-main-container">
                    <div className="app-header">
                        <Header/>
                    </div>

                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            <Main container={this.props.container} {...this.props}/>
                        </div>
                        {/*<Footer/>*/}
                    </main>
                </div>
            </div>
        </div>);
    }
}

export default Layout;
