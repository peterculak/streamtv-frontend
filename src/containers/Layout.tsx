import * as React from 'react';
import {withStyles, Theme} from '@material-ui/core/styles';
import Main from './Main';
import {Container} from "inversify";

interface PropsInterface {
    classes: any,
    container: Container,
}

const styles = (theme: Theme) => ({
    toolbar: theme.mixins.toolbar,
    app: {
        [theme.breakpoints.up('md')]: {
            padding: '16px'
        },
    }
});

class Layout extends React.Component<PropsInterface, any> {
    constructor(props: PropsInterface) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (<div className={classes.app}>
            <div className="app-container">

                <div className="app-main-container">

                    <main className="app-main-content-wrapper">

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
