import React, {useEffect, useState, useRef} from 'react';
import {withStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import SkipNext from '@material-ui/icons/SkipNext';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeMute from '@material-ui/icons/VolumeMute';
import VolumeOff from '@material-ui/icons/VolumeOff';
import * as ACTIONS from "../../actions/player";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {useSelector, useDispatch} from 'react-redux';

const styles = (theme: Theme) => createStyles({
        root: {
            position: 'relative',
            left: '12px',
            height: '36px',
            zIndex: 1000,
            margin: '-36px 0px 0px 0px',
            padding: '0px',
            // backgroundColor: 'rgba(0, 0, 0, 0.7)',
            // transition: 'opacity .1s cubic-bezier(0.4,0.0,1,1)',
            opacity: 0,
        },
        gradientBottom: {
            opacity: 0,
            height: '49px',
            margin: '-49px 0px 0px 0px',
            zIndex: 22,
            backgroundPosition: 'bottom',
            width: '100%',
            position: 'relative',
            backgroundRepeat: 'repeat-x',
            backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)',
            transition: 'opacity .25s cubic-bezier(0.0,0.0,0.2,1)',
            pointerEvents: 'none',
        },
        hover: {
            opacity: 1,
        },
        buttons: {
            width: '46px',
        },
        timeDisplay: {
            display: 'inline-block',
            verticalAlign: 'top',
            padding: '0 5px',
            lineHeight: '24px',
            fontSize: '13px',
        },
        timeCurrent: {},
        timeSeparator: {},
        timeDuration: {},
    },
);

function MediaControl(props: any, ref: any) {
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

        if (minutes >=60) {
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

    if (player && player.isLoaded()) {
        return (
            <React.Fragment>
                <div
                    className={showControls() ? `${classes.gradientBottom} ${classes.hover}` : classes.gradientBottom}></div>
                <div
                    style={{width: `${parseInt(player.getVideoElementWidth()) - 24}px`}}
                    className={showControls() ? `${classes.root} ${classes.hover}` : classes.root}
                >
                    {/*<Button*/}
                    {/*    size="small">*/}
                    {/*    <PlayArrow/>*/}
                    {/*</Button>*/}
                    {/*<IconButton*/}
                    {/*    size="small"*/}
                    {/*    title="Play"*/}
                    {/*    // color={player.getPlaylistSortOrder() === 'desc' ? 'primary' : undefined}*/}
                    {/*    // onClick={() => dispatch(ACTIONS.reversePlaylistSort())}*/}
                    {/*    // disabled={!player.playlistItemsCount}*/}
                    {/*>*/}
                    {/*</IconButton>*/}
                    {player.isPlaying() ? (
                        <Pause
                            className={classes.buttons}
                            onClick={() => dispatch(ACTIONS.toggle())}
                        />
                    ) : (
                        <PlayArrow
                            className={classes.buttons}
                            onClick={() => dispatch(ACTIONS.toggle())}
                        />
                    )
                    }

                    <SkipNext
                        className={classes.buttons}
                        onClick={() => dispatch(ACTIONS.next())}
                    />

                    <VolumeDown
                        className={classes.buttons}
                        // onClick={() => dispatch(ACTIONS.next())}//todo
                    />

                    <div className={classes.timeDisplay}>
                        <span className={classes.timeCurrent}>
                            {formatLength(player.getCurrentTime())}
                        </span>
                        <span className={classes.timeSeparator}>/</span>
                        <span className={classes.timeDuration}>
                            {formatLength(player.current().duration)}
                        </span>
                    </div>

                    {/*<div id="pause"></div>*/}
                    {/*<div id="audio_bg"></div>*/}
                    {/*<div id="audio_bg_track"></div>*/}
                    {/*<div id="audio_indicator"></div>*/}
                    {/*<div id="audio_bg_level"></div>*/}
                    {/*<div id="audio_on"></div>*/}
                    {/*<div id="audio_off"></div>*/}
                    {/*<div id="progress_bar_container">*/}
                    {/*    <div id="progress_bg"></div>*/}
                    {/*    <div id="seekable_window"></div>*/}
                    {/*    <div id="progress"></div>*/}
                    {/*    <div id="unseekable_overlay"></div>*/}
                    {/*    <div id="progress_indicator"></div>*/}
                    {/*</div>*/}
                    {/*<div id="fullscreen_expand"></div>*/}
                    {/*<div id="fullscreen_collapse"></div>*/}
                    {/*{*/}
                    {/*    //@ts-ignore*/}
                    {/*    <google-cast-launcher id="castbutton"></google-cast-launcher>*/}
                    {/*}*/}
                    {/*<div id="currentTime">00:00:00</div>*/}
                    {/*<div id="duration">00:00:00</div>*/}
                    {/*<img id="live_indicator" />*/}
                </div>
            </React.Fragment>
        );
    }

    return (<div></div>);
}

export default withStyles(styles)(MediaControl);
