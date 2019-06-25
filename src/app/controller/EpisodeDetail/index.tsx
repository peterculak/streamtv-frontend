import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {withStyles, Theme} from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import * as ITEM_ACTIONS from "../../../actions/archiveItem";
import Player from "../../../components/player";
import Playlist from "../../../components/playlist";
import ErrorBoundary from "../../../components/errorBoundary";

const styles = (theme: Theme) => ({
    rhc: {
        padding: '8px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            padding: '16px'
        },
        [theme.breakpoints.up('md')]: {
            padding: '0 8px 0 16px'
        },
    },
    playlist: {
        height: '600px',
        maxHeight: '600px',
    },
});

function EpisodeDetailController(props: any) {
    const {player, archive} = useSelector((state: any) => ({
        player: state.player,
        archive: state.selectedProgramArchive
    }));

    const dispatch = useDispatch();
    const {classes, match} = props;

    //this happens when somebody loads url directly not coming from programs list view
    useEffect(() => {
        if (!archive) {
            props.programService.findOne(props.match.params.channelId, props.match.params.slug).then((newArchive: Array<any>) => {
                dispatch(ITEM_ACTIONS.selectProgramArchiveItem(newArchive));
            });
        }
    }, [archive]);

    if (player && archive) {
        return (
            <div className="app-wrapper">

                {/*<Grid container direction="row" alignItems="flex-start"><Box mb={1}>top row</Box></Grid>*/}

                <Grid container spacing={0}
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start">

                    <Grid item sm={12} md={8}>
                        <ErrorBoundary>
                            <Player/>
                        </ErrorBoundary>
                    </Grid>

                    {player && (
                        <Grid item sm={12} md={4}
                              container
                              direction="row"
                              className={classes.playlist}
                        >
                            <Box className={classes.rhc}>
                                <ErrorBoundary>
                                    <Playlist/>
                                </ErrorBoundary>
                            </Box>
                        </Grid>)}
                </Grid>
            </div>);
    } else {
        return (<div className="app-wrapper"></div>);
    }
}

export default withStyles(styles, {withTheme: true})(EpisodeDetailController);
