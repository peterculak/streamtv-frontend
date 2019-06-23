import React, { useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from "../../actions/player";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';

function Index(props: any) {
    const dispatch = useDispatch();
    let playerRef = useRef(null) as any;

    const { player } = useSelector((state: any) => ({
        player: state.player,
    }));

    const playNextTrigger = () => {
      dispatch(ACTIONS.next());
    };
    
    useEffect(() => {
        if (player && player.current()) {
            document.title = player.current().subtitle;
        }
    }, [player && player.current()]);

    useEffect(() => {
        if (playerRef) {
            dispatch(ACTIONS.setVideoElementAndStartPlaying(playerRef.current, playNextTrigger));
        }
    }, [player]);

    const qualityLabel = (url: string) => {
        const r = url.match(/-([^-]+[p]?)\.mp4/);
        return r && r[1] !== null ? r[1] : 'undefined';
    };

    const changeVideoIndex = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
        dispatch(ACTIONS.setStreamQuality(event.target.value));
    };

    return (
        <div>
            <Box>
                <video ref={playerRef} width="100%" height="100%" controls/>
                {player && player.current() && (
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
                                        {player && player.current() && player.current().mp4.map((url: any, index: number) => <MenuItem
                                            key={index + url} value={index}>{qualityLabel(url)}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box mt={1} mb={1}>
                            <Divider variant="fullWidth" />
                        </Box>
                    </Box>
                )}
            </Box>

            {player && player.isLoaded() && (
                <div>
                    <button onClick={() => dispatch(ACTIONS.previous())} disabled={!player.hasPrevious()}>
                        <SkipPrevious/>
                    </button>

                    <button onClick={() => dispatch(ACTIONS.toggle())}>
                        {player.isPlaying() ? (<Pause/>) : (<PlayArrow/>)}
                    </button>

                    <button onClick={() => dispatch(ACTIONS.next())} disabled={!player.hasNext()}>
                        <SkipNext/>
                    </button>

                    <Typography variant="caption" display="block" gutterBottom>
                        autoplay: {player.autoplay ? 'true' : 'false'} <br/>
                        loop: {player.isLoopEnabled() ? 'true' : 'false'} <br/>
                        shuffle: {player.isShuffleEnabled() ? 'true' : 'false'} <br/>
                        isPlaying: {player.isPlaying() ? 'true' : 'false'} <br/>
                        currentStream: {player.currentStream()}
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default Index;
