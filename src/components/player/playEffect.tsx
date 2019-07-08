import React, {useState} from 'react';
import {withStyles, useTheme, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SvgIcon from '@material-ui/core/SvgIcon';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transition from "react-transition-group/Transition";

const fadeInUp = "fade-in";
const fadeOutLeft = "fade-out";

const useStyles = makeStyles({
    root: {},
    bezel: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '52px',
        height: '52px',
        marginLeft: '-26px',
        marginTop: '-26px',
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: '26px',
    },
    icon: {
        width: '36px',
        height: '36px',
        margin: '14px',
        display: 'block',
    },
    transitionGroup: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    "fadeIn-entered": {
        display: "none",
    },
    "fadeIn-entering": {
        top: '50%',
        left: '50%',
        animation: `$${fadeInUp} .5s linear 1 normal forwards`,
        position: "absolute",
    },
    "fadeIn-exiting": {
        display: "none",
        animation: `$${fadeInUp} .5s linear 1 normal forwards`,
    },

    [`@keyframes ${fadeInUp}`]: {
        from: {
            opacity: 1,
            transform: 'translateY(-50%)'
        },
        to: {
            opacity: 0,
            transform: 'scale(2)'
        }
    },
    [`@keyframes ${fadeOutLeft}`]: {
        from: {
            opacity: 1
        },
        to: {
            opacity: 0,
            transform: 'translateY(-50%)'
        }
    }
});

function Fade(props: any) {
    const classes = useStyles();
    return (
        <Transition in={props.in} timeout={500} mountOnEnter unmountOnExit>
            {state => (
                <div className={classes[`fadeIn-${state}`] || ""}>{props.children}</div>
            )}
        </Transition>
    );
}

function PlayEffect(props: any) {
    const classes = useStyles();
    const {play, ...rest} = props;
    return (
        <React.Fragment>
            <TransitionGroup {...rest} component="div" className={classes.transitionGroup}>
                {play ? (
                    <Fade key={0}>
                        <div className={classes.root}>
                            <div className={classes.bezel}>
                                <div className={classes.icon}>
                                    <PlayArrow/>
                                </div>
                            </div>
                        </div>
                    </Fade>
                ) : (
                    <Fade key={1}>
                        <div className={classes.root}>
                            <div className={classes.bezel}>
                                <div className={classes.icon}>
                                    <Pause/>
                                </div>
                            </div>
                        </div>
                    </Fade>
                )}
            </TransitionGroup>
        </React.Fragment>
    );
}

export default PlayEffect;