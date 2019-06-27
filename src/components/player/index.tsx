import React, {useEffect, useRef} from 'react';
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

function Index(props: any, ref: any) {
    const dispatch = useDispatch();
    let playerRef = useRef(null) as any;

    const {player} = useSelector((state: any) => ({
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
        <React.Fragment>
            <video ref={playerRef} width="100%" height="100%" controls/>
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
                                        {player && player.current() && player.current().mp4.map((url: any, index: number) =>
                                            <MenuItem
                                                key={index + url} value={index}>{qualityLabel(url)}</MenuItem>)}
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

export default Index;
