import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Transition from "react-transition-group/Transition";

const fadeInUp = "fade-in";

const useStyles = makeStyles({
    root: {
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
        color: 'white',
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
        top: '50%',
        left: '50%',
        animation: `$${fadeInUp} .5s linear 1 normal forwards`,
        position: "absolute",
    },
    "fadeIn-exited": {
        display: "none",
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
});

function Index(props: any) {
    const classes = useStyles();
    const {animate, children, ...rest} = props;

    return (
        <Transition
            {...rest} in={animate} timeout={500}>
            {state => {
                return (<div className={classes[`fadeIn-${state}`] || ""}>
                    <div className={classes.root}>
                        <div className={classes.icon}>
                            {children}
                        </div>
                    </div>
                </div>);
            }}
        </Transition>
    );
}

export default Index;
