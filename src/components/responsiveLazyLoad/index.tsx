import React, {useState} from 'react';
import {withStyles, Theme, createStyles} from '@material-ui/core/styles';
import LazyLoad from "react-lazy-load";

const styles = (theme: Theme) => createStyles({
    loading: {
        opacity: 0,
    },
    loaded: {
        transition: theme.transitions.create(
            ['opacity'],
            { duration: theme.transitions.duration.enteringScreen }
        ),
    }
});

/**
 * It's not responsive yet :(
 * @param props
 * @constructor
 */
function ResponsiveLazyLoad(props: any) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const {classes, children, ...rest} = props;

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (
        <LazyLoad
            className={isLoaded ? classes.loaded : classes.loading}
            onContentVisible={handleLoad}
            {...rest}
        >
            {children}
        </LazyLoad>
    );
}

export default withStyles(styles)(ResponsiveLazyLoad);