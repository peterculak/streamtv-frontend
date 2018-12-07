import * as React from 'react';
import {withStyles, Theme} from '@material-ui/core/styles';
import ContainerInterface from '../framework/container/ContainerInterface';
import Main from './Main';
import ResponsiveDrawer from "./ResponsiveDrawer";

interface LayoutPropsInterface {
    container: ContainerInterface,
    classes: {toolbar: string}
}

const styles = (theme: Theme) => ({
    toolbar: theme.mixins.toolbar,
});

class Layout extends React.Component<LayoutPropsInterface, any> {
    constructor(props: LayoutPropsInterface) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (<div className="app-main">
            <div className="app-container fixed-drawer">

                <ResponsiveDrawer />

                <div className="app-main-container">

                    <main className="app-main-content-wrapper">

                        <div className={classes.toolbar} />

                        <div className="app-main-content">
                            <Main container={this.props.container} {...this.props}/>
                        </div>
                    </main>
                </div>
            </div>
        </div>);
    }
}

export default withStyles(styles, {withTheme: true})(Layout);
