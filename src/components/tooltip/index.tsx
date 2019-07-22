import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, Theme, createStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme: Theme) => createStyles({
    tooltip: {
        padding: '5px 9px',
        backgroundColor: 'rgba(28,28,28,0.9)',
        borderRadius: '2px',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: '15px',
    },
});

function StyledTooltip(props: any) {
    const {classes, children, ...rest} = props;

    return (
        <Tooltip
            classes={classes}
            placement="top"
            {...rest}
        >
            {children}
        </Tooltip>
    );
}

StyledTooltip.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyledTooltip);