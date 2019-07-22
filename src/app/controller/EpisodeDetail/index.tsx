import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {withStyles, Theme} from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import * as ITEM_ACTIONS from "../../../actions/archiveItem";
import Player from "../../../components/player";
import Playlist from "../../../components/playlist";
import ErrorBoundary from "../../../components/errorBoundary";
import Hidden from '@material-ui/core/Hidden';
import {useAuth} from "../../../context/authContext";

const styles = (theme: Theme) => ({
    videoPlayer: {
        backgroundColor: 'black',
    },
    rhc: {
        padding: '0',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 16px',
        },
        width: '100%',
    },
});

function EpisodeDetailController(props: any) {
    const {player, seriesArchive} = useSelector((state: any) => ({
        player: state.player,
        seriesArchive: state.selectedTVSeriesArchive
    }));

    const dispatch = useDispatch();
    const auth = useAuth();
    const {classes, ...rest} = props;

    //this happens when somebody loads url directly not coming from programs list view
    useEffect(() => {
        if (!seriesArchive) {
            props.programService.findOne(props.match.params.slug).then((newArchive: Array<any>) => {
                dispatch(ITEM_ACTIONS.selectSeriesArchive(newArchive));
            }).catch((e: Error) => auth.logout());
        }
    }, [seriesArchive]);

    const [videoElementHeight, setVideoElementHeight] = useState<string>('auto');
    useEffect(() => {
        if (player.isVideoDataLoaded) {
            const height = player.getVideoElementHeight();
            if (height) {
                const videoHeight = Math.ceil(parseFloat(height.replace('px', '')));
                setVideoElementHeight(videoHeight + 'px');
            }
        }
    }, [player && player.isLoaded(), player.isVideoDataLoaded]);

    if (player && seriesArchive) {
        return (
            <div className="app-wrapper">
                {/*<Grid container direction="row" alignItems="flex-start"><Box mb={1}>top row</Box></Grid>*/}
                <Hidden mdUp>
                    <Grid container spacing={0}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start">
                        <Grid container direction="column" className={classes.videoPlayer}
                              style={{height: videoElementHeight}}>
                            <ErrorBoundary>
                                <Player/>
                            </ErrorBoundary>
                        </Grid>
                        <Grid container direction="column">
                            <Box className={classes.rhc}>
                                <ErrorBoundary>
                                    <Playlist {...rest}/>
                                </ErrorBoundary>
                            </Box>
                        </Grid>
                    </Grid>
                </Hidden>

                <Hidden smDown>
                    <Grid container spacing={0}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start">
                        <Grid item sm={12} md={8} style={{height: videoElementHeight}}>
                            <ErrorBoundary>
                                <Player/>
                            </ErrorBoundary>
                        </Grid>

                        <Grid item sm={12} md={4}>
                            <Box className={classes.rhc}>
                                <ErrorBoundary>
                                    <Playlist {...rest}/>
                                </ErrorBoundary>
                            </Box>
                        </Grid>
                    </Grid>
                </Hidden>
            </div>);
    } else {
        return (<div className="app-wrapper"></div>);
    }
}

export default withStyles(styles, {withTheme: true})(EpisodeDetailController);
