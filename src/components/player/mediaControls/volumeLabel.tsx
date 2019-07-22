import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Transition from "react-transition-group/Transition";

const fadeInUp = "fade-in";

const useStyles = makeStyles({
    root: {
        fontSize: '11px',//todo should be set in player root
        position: 'absolute',
        top: '10%',
        left: '0%',
        right: '0%',
        textAlign: 'center',
    },
    inner: {
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '175%',
        backgroundColor: 'rgba(0,0,0,.5)',
        pointerEvents: 'none',
        borderRadius: '3px',
    },
    transitionGroup: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    "fadeIn-entered": {
        display: "none",
    },
    "fadeIn-exited": {
        display: "none",
    },
    [`@keyframes ${fadeInUp}`]: {
    },
});

function VolumeLabel(props: any) {
    const classes = useStyles();
    const {animate, children, ...rest} = props;

    return (
        <Transition
            {...rest} in={animate} timeout={500}>
            {state => {
                return (<div className={classes[`fadeIn-${state}`] || ""}>
                    <div className={classes.root}>
                        <div className={classes.inner}>
                            {children}
                        </div>
                    </div>
                </div>);
            }}
        </Transition>
    );
}

export default VolumeLabel;
