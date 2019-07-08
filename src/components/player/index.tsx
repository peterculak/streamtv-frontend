import React, {useEffect, useRef, useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import {useSelector, useDispatch} from 'react-redux';
import * as ACTIONS from "../../actions/player";
import Hidden from '@material-ui/core/Hidden';
import PlayerInterface from "../../service/player/PlayerInterface";
import MediaControl from "./mediaControl";

function Player(props: any, ref: any) {
    const dispatch = useDispatch();
    let playerRef = useRef<HTMLVideoElement>(null);

    const {player} = useSelector<{player: PlayerInterface}, {player: PlayerInterface}>((state) => ({
        player: state.player,
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
            }));
        }
    }, [player]);

    const changeVideoIndex = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
        dispatch(ACTIONS.setStreamQuality(event.target.value));
    };

    const {classes} = props;
    return (
        <React.Fragment>
            <div
                style={{height: '100%'}}
                onMouseOver={() => setIsHover(true)}
                onMouseOut={() => setIsHover(false)}
                onClick={() => dispatch(ACTIONS.toggle())}
            >
                <video ref={playerRef} width="100%" height="100%"/>
                <MediaControl isHover={isHover}/>
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

                            <Grid item>
                                <FormControl>
                                    <Select
                                        value={player ? player.selectedQualityIndex : 0}
                                        onChange={changeVideoIndex}
                                        name='selectedQualityIndex'
                                    >
                                        {player && player.current() && player.availableQuality().map((label: string, index: number) =>
                                            <MenuItem
                                                key={index + label} value={index}>{label}</MenuItem>)}
                                    </Select>
                                </FormControl>
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
