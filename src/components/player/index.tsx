import React, {useEffect, useRef, useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {useSelector, useDispatch} from 'react-redux';
import * as ACTIONS from "../../actions/player";
import Hidden from '@material-ui/core/Hidden';
import PlayerInterface from "../../service/player/PlayerInterface";
import MediaControls from "./mediaControls";
import Ripple from "../ripple";
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOff from '@material-ui/icons/VolumeOff';
import Forward5 from '@material-ui/icons/Forward5';
import Rewind5 from '@material-ui/icons/Replay5';
import VolumeLabel from "./mediaControls/volumeLabel";

function Player(props: any, ref: any) {
    const dispatch = useDispatch();
    let playerRef = useRef<HTMLVideoElement>(null);

    type stateInterface = {
        animateFastForward: boolean,
        animateRewind: boolean,
        animateMute: boolean,
        animatePausePlay: boolean,
        animateVolumeUp: boolean,
        animateVolumeDown: boolean,
        animateVolumeLabel: boolean,
        player: PlayerInterface
    };

    const {
        animateFastForward,
        animateRewind,
        animateMute,
        animatePausePlay,
        animateVolumeUp,
        animateVolumeDown,
        animateVolumeLabel,
        player,
    } = useSelector<stateInterface, stateInterface>((state) => ({
        player: state.player,
        animatePausePlay: state.animatePausePlay,
        animateMute: state.animateMute,
        animateFastForward: state.animateFastForward,
        animateRewind: state.animateRewind,
        animateVolumeUp: state.animateVolumeUp,
        animateVolumeDown: state.animateVolumeDown,
        animateVolumeLabel: state.animateVolumeLabel,
    }));

    const [isHover, setIsHover] = useState<boolean>(false);

    const playNextTrigger = () => {
        dispatch(ACTIONS.next());
    };

    const dataLoaded = () => {
        //this is not in store it just triggers react to rerender
        dispatch(ACTIONS.videoElementDataLoaded());
    };

    const timeupdate = () => {
        //this is not in store it just triggers react to rerender
        dispatch(ACTIONS.videoElementTimeUpdate());
    };

    const togglePlay = (event: any) => {
        dispatch(ACTIONS.togglePlayWithAnimation());
    };

    const toggleMute = (event: any) => {
        dispatch(ACTIONS.toggleMuteWithAnimation());
    };

    const fastForward = (event: any) => {
        dispatch(ACTIONS.fastForwardWithAnimation());
    };

    const rewind = (event: any) => {
        dispatch(ACTIONS.rewindWithAnimation());
    };

    const volumeUp = (event: any) => {
        dispatch(ACTIONS.volumeUpWithAnimation());
    };

    const volumeDown = (event: any) => {
        dispatch(ACTIONS.volumeDownWithAnimation());
    };

    useEffect(() => {
        if (player && player.current()) {
            document.title = player.current().subtitle;
        }
    }, [player && player.current()]);

    useEffect(() => {
        if (playerRef && playerRef.current) {
            dispatch(ACTIONS.setVideoElementAndStartPlaying(playerRef.current, {
                ended: playNextTrigger,
                loadeddata: dataLoaded,
                timeupdate: timeupdate,
                togglePlay: togglePlay,
                toggleMute: toggleMute,
                fastForward: fastForward,
                rewind: rewind,
                volumeUp: volumeUp,
                volumeDown: volumeDown,
            }));
        }
    }, [player]);

    return (
        <React.Fragment>
            <div
                style={{height: '100%', position: 'relative'}}
                onMouseOver={() => setIsHover(true)}
                onMouseOut={() => setIsHover(false)}
            >
                {player.isLoaded() ? (
                    <div
                        onClick={(event: any) => togglePlay(event)}
                        style={{width: '100%', height: 'calc(100% - 36px)', zIndex: 99, position: 'absolute'}}
                    >
                        <Ripple
                            animate={animatePausePlay}
                        >
                            {player.isPlaying() ? (<PlayArrow/>) : (<Pause/>)}
                        </Ripple>
                        <Ripple
                            animate={animateMute}
                        >
                            {player.isMuted() ? (<VolumeOff/>) : (<VolumeUp/>)}
                        </Ripple>
                        <Ripple
                            animate={animateFastForward}
                        >
                            <Forward5/>
                        </Ripple>
                        <Ripple
                            animate={animateRewind}
                        >
                            <Rewind5/>
                        </Ripple>

                        <Ripple
                            animate={animateVolumeUp}
                        >
                            <VolumeUp/>
                        </Ripple>

                        <Ripple
                            animate={animateVolumeDown}
                        >
                            <VolumeDown/>
                        </Ripple>

                        <VolumeLabel
                            animate={animateVolumeLabel}
                        >
                            {player.getVolume() * 100}%
                        </VolumeLabel>
                    </div>
                ) : ''}
                <video
                    ref={playerRef} width="100%" height="100%"/>
                <MediaControls isHover={isHover}/>
            </div>
            {player && player.current() && (
                <Hidden smDown>
                    <Box>
                        <Grid container spacing={2}
                              direction="row"
                              justify="space-between"
                              alignItems="flex-start">

                            <Grid item>
                                <Typography variant="h6" component="h1">{player.current().title}</Typography>
                                <Typography variant={'caption'} component="p">{player.current().subtitle}</Typography>
                            </Grid>

                        </Grid>
                        <Box mt={1} mb={1}>
                            <Divider variant="fullWidth"/>
                        </Box>
                    </Box>
                </Hidden>
            )}
        </React.Fragment>
    );
}

export default Player;
