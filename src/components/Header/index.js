import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            searchBox: false,
            searchText: '',
            mailNotification: false,
            userInfo: false,
            langSwitcher: false,
            appNotification: false,
        }
    }

    render() {
        return (
            <AppBar
                className="app-main-header">
                <Toolbar className="app-toolbar" disableGutters={false}>
                    <Link className="app-logo mr-2 d-none d-sm-block" to="/">
                        <img src="http://via.placeholder.com/177x65" alt="Jambo" title="Jambo"/>
                    </Link>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(Header);
