import * as React from 'react';
import {withStyles, Theme} from '@material-ui/core/styles';
import Main from './Main';
import {Container} from "inversify";
import LocaleInterface from "../entities/LocaleInterface";

interface PropsInterface {
    classes: any,
    container: Container,
    locale: LocaleInterface,
}

const styles = (theme: Theme) => ({
    app: {
        height: '100%',
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
            <Main container={this.props.container} {...this.props}/>
        </div>);
    }
}

export default withStyles(styles, {withTheme: true})(Layout);
