import React from 'react';
import {withRouter} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import SidenavContent from './SidenavContent';

class SideNav extends React.PureComponent {

  componentDidMount() {
    window.addEventListener('resize', () => {
      // this.props.updateWindowWidth(window.innerWidth);
    });
  }

  render() {
    const {navCollapsed} = this.props;
    let drawerStyle = 'd-xl-flex';
    let type = 'permanent';
    return (
        <div className={`app-sidebar d-none ${drawerStyle}`}>
          <Drawer className="app-sidebar-content"
                  variant={type}
                  open={type.includes('temporary') ? navCollapsed : true}
                  classes={{
                    paper: 'side-nav',
                  }}
          >
            {/*<UserInfo/>*/}
            <SidenavContent/>
          </Drawer>
        </div>
    );
  }
}

export default withRouter(SideNav);

