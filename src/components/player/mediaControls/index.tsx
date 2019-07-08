import React, {useEffect, useState, useRef} from 'react';
import {withStyles, useTheme, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import SkipNext from '@material-ui/icons/SkipNext';
import Settings from '@material-ui/icons/Settings';
import Fullscreen from '@material-ui/icons/Fullscreen';
import * as ACTIONS from "../../../actions/player";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {useSelector, useDispatch} from 'react-redux';
import VideoProgressBar from "./videoProgressBar";
import VolumeControls from "./volumeControls";

const styles = (theme: Theme) => createStyles({
        root: {
            position: 'absolute',
            bottom: '-2px',
            left: '12px',
            height: '36px',
            zIndex: 1000,
            // margin: '-36px 0px 0px 0px',
            padding: '0px',
            // backgroundColor: 'rgba(0, 0, 0, 0.7)',
            // transition: 'opacity .1s cubic-bezier(0.4,0.0,1,1)',
            opacity: 0,
        },
        gradientBottom: {
            opacity: 0,
            height: '36px',
            margin: '-41px 0px 0px 0px',
            zIndex: 22,
            backgroundPosition: 'bottom',
            width: '100%',
            position: 'absolute',
            backgroundRepeat: 'repeat-x',
            backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)',
            transition: 'opacity .25s cubic-bezier(0.0,0.0,0.2,1)',
            pointerEvents: 'none',
        },
        hover: {
            opacity: 1,
        },
        buttons: {
            transition: 'opacity .1s cubic-bezier(0.4,0.0,1,1)',
            opacity: 0.9,
            minWidth: '20px',
            verticalAlign: 'initial',
            color: 'rgb(238, 238, 238)',
            '&:hover': {
                opacity: 1,
                color: "#fff",
            },
        },
        hdBadge: {
            '&::after': {
                backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTAwJSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTMgOSIgd2lkdGg9IjEwMCUiPjxwYXRoIGQ9Ik01LDcgTDYsNyBMNiw4IEw1LDggTDUsNyBaIE0xMCwzIEwxMCw0IEw4LDQgTDgsMyBMMTAsMyBaIE0zLDYgTDMsNSBMNSw1IEw1LDYgTDMsNiBaIE0yLDcgTDMsNyBMMyw4IEwyLDggTDIsNyBaIE03LDcgTDEwLDcgTDEwLDggTDcsOCBMNyw3IFogTTEwLDYgTDExLDYgTDExLDcgTDEwLDcgTDEwLDYgWiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjY0NzEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgLz48cGF0aCBkPSJNNSw3IEw1LDYgTDUsNSBMMyw1IEwzLDYgTDMsNyBMMiw3IEwyLDIgTDMsMiBMMyw0IEw1LDQgTDUsMiBMNiwyIEw2LDcgTDUsNyBaIE0xMSw2IEwxMCw2IEwxMCw3IEw3LDcgTDcsMiBMMTAsMiBMMTAsMyBMMTEsMyBMMTEsNiBaIE0xMCw0IEwxMCwzIEw4LDMgTDgsNCBMOCw2IEwxMCw2IEwxMCw0IFoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgLz48L3N2Zz4=)',
                content: "''",
                position: 'absolute',
                top: '7px',
                right: '5px',
                height: '9px',
                width: '13px',
                backgroundColor: 'red',
                borderRadius: '1px',
            }
        },
        timeDisplay: {
            position: 'absolute',
            top: '4px',
            display: 'inline-block',
            verticalAlign: 'middle',
            padding: '0 5px',
            lineHeight: '24px',
            fontSize: '13px',
            textShadow: '0 0 2px rgba(0,0,0,.5)',
        },
        leftControls: {
            height: '100%',
            float: 'left',
        },
        rightControls: {
            height: '100%',
            float: 'right',
        },
        timeCurrent: {},
        timeSeparator: {},
        timeDuration: {},
    }
);

function MediaControls(props: any, ref: any) {
    const dispatch = useDispatch();
    const {player} = useSelector((state: any) => ({
        player: state.player,
    }));

    const {classes} = props;

    function showControls(): boolean {
        return props.isHover || !player.isPlaying();
    }

    const formatLength = (lengthInSeconds: number) => {
        let hours = 0;
        let minutes = Math.floor(lengthInSeconds / 60);

        if (minutes >= 60) {
            hours = Math.floor(minutes / 60);
            minutes = minutes - hours * 60;
        }
        let seconds = Math.ceil(lengthInSeconds - (hours * 60 * 60) - (minutes * 60));

        let secondsStr = String(seconds);
        if (seconds < 10) {
            secondsStr = '0' + secondsStr;
        }

        let minutesStr = String(minutes);
        if (hours) {
            if (minutes < 10) {
                minutesStr = '0' + minutesStr;
            }

            return `${hours}:${minutesStr}:${secondsStr}`;
        }

        return `${minutesStr}:${secondsStr}`;
    };

    const requestFullScreenVideo = () => {
        player.requestFullScreen();
    };

    if (player && player.isLoaded()) {
        return (
            <React.Fragment>
                <div
                    className={showControls() ? `${classes.gradientBottom} ${classes.hover}` : classes.gradientBottom}></div>
                <div
                    style={{width: `${parseInt(player.getVideoElementWidth()) - 24}px`}}
                    className={showControls() ? `${classes.root} ${classes.hover}` : classes.root}
                >
                    <VideoProgressBar/>

                    <Button
                        size="small"
                        className={classes.buttons}
                        style={{backgroundColor: 'transparent'}}
                        onClick={() => dispatch(ACTIONS.toggle())}
                    >
                        {player.isPlaying() ? (
                            <Pause
                                className={classes.buttons}

                            />
                        ) : (
                            <PlayArrow
                                className={classes.buttons}
                            />
                        )}
                    </Button>
                    <Button
                        size="small"
                        className={classes.buttons}
                        style={{backgroundColor: 'transparent'}}
                        onClick={() => dispatch(ACTIONS.next())}
                    >
                        <SkipNext
                            className={classes.buttons}
                        />
                    </Button>

                    <VolumeControls />

                    <div className={classes.timeDisplay}>
                        <span className={classes.timeCurrent}>
                            {formatLength(player.getCurrentTime())}
                        </span>
                        <span className={classes.timeSeparator}>&nbsp;/&nbsp;</span>
                        <span className={classes.timeDuration}>
                            {formatLength(player.current().duration)}
                        </span>
                    </div>

                    <div className={classes.rightControls}>
                        <Button
                            size="small"
                            className={player.isHighQualitySelected() ? `${classes.buttons} ${classes.hdBadge}` : `${classes.buttons}`}
                            style={{backgroundColor: 'transparent'}}
                            onClick={() => dispatch(player.isHighQualitySelected() ? ACTIONS.setVideoLowestQuality() : ACTIONS.setVideoHighestQuality())}
                        >
                            <Settings
                                className={classes.buttons}
                            />
                        </Button>

                        <Button
                            onClick={() => requestFullScreenVideo()}
                            size="small"
                            className={classes.buttons}
                            style={{backgroundColor: 'transparent'}}
                        >
                            <Fullscreen
                                className={classes.buttons}
                            />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return (<div></div>);
}

export default withStyles(styles)(MediaControls);
