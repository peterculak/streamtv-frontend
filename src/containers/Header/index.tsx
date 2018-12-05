import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import logo from './logo-horizontal.svg';

const Header = () => (
    <AppBar
        className="app-main-header">
        <Toolbar className="app-toolbar" disableGutters={false}>
            <Link className="app-logo mr-2 d-none d-sm-block" to="/">
                <img src={logo} alt="WorldFirst" title="WorldFirst"/>
            </Link>
        </Toolbar>
    </AppBar>
);

export default Header;
