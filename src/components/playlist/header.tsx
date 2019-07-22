import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {withStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
import * as ACTIONS from "../../actions/player";
import * as THEME_ACTIONS from "../../actions/theme";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import Shuffle from '@material-ui/icons/Shuffle';
import Repeat from '@material-ui/icons/Repeat';
import List from '@material-ui/icons/List';
import Hd from '@material-ui/icons/Hd';
import GetApp from '@material-ui/icons/GetApp';
import SvgIcon from '@material-ui/core/SvgIcon';
import PlayerInterface from "../../service/player/PlayerInterface";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PlaylistFactory from "../../service/player/PlaylistFactory";
const fileDownload = require('js-file-download');

const styles = (theme: Theme) => createStyles({
    playlistHeader: {
        // transition: 'background-color 1s ease-out',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '0 0 0 12px',
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: theme.palette.type === 'dark' ? 'rgba(136, 136, 136, 0.4)' : 'rgba(238, 238, 238)',
            padding: '0 0 0 16px',
        },
    },
    playlistHeaderMetaData: {
        fontSize: '11px',
        height: '48px',
        lineHeight: '1.5',
        [theme.breakpoints.up('md')]: {
            padding: '12px 16px 0 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '8px 5px 0 0',
        },
    },
    playlistHeaderTitle: {
        fontSize: '14px',
        [theme.breakpoints.down('sm')]: {
            color: theme.palette.type === 'dark' ? 'rgb(238, 238, 238)' : 'inherit',
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: '4px',
        },
        fontWeight: 'bold',
        lineHeight: '16px',
    },
    playlistHeaderSubHead: {
        fontSize: '12px',
        lineHeight: '16.5px',
        [theme.breakpoints.up('md')]: {
            color: theme.palette.type === 'light' ? 'rgba(17, 17, 17, 0.6)' : 'inherit',
        },
    },
    controlBar: {
        height: '44px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '48px',
            color: theme.palette.type === 'dark' ? '#eee' : 'inherit',
        },
        [theme.breakpoints.up('md')]: {
            color: theme.palette.type === 'dark' ? 'rgb(144, 144, 144)' : 'inherit',
        },
        paddingRight: '4px',
    },
    playerControlsButton: {
        marginLeft: '10px',
    },
    playerControlsButtonCommon: {
        width: '40px',
        height: '40px',
        // color: theme.palette.type === 'light' ? 'rgb(144, 144, 144)' : 'inherit',
    },
    firstButton: {
        marginLeft: '-10px',
    }
});

function PlaylistHeader(props: any) {
    const {player, archive} = useSelector<{ player: PlayerInterface, selectedTVSeriesArchive: any }, { player: PlayerInterface, archive: any }>((state) => ({
        player: state.player,
        archive: state.selectedTVSeriesArchive
    }));

    const dispatch = useDispatch();
    const {classes} = props;
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    const handlePlaylistChange = (event: any) => {
        props.setSelectedSeasonIndex(parseInt(event.target.value));
        dispatch(
            ACTIONS.loadPlaylistAndStartPlaying(
                PlaylistFactory.createPlaylistForProgramSeason(archive.seasons[parseInt(event.target.value)])
            )
        );
        handleMenuClose();
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleOpenMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    //todo fix this whole thing
    function download(url: string): void {
        const m = url.match(/\.[0-9a-z]+$/i);
        if (m && m[0]) {
            const title = archive.name;
            let seriesNumber = String(props.selectedSeasonIndex + 1);
            if (props.selectedSeasonIndex + 1) {
                seriesNumber = '0' + seriesNumber;
            }
            const series = `S${seriesNumber}`;
            const meta = player.current().meta as any;
            let episodeNumber = String(meta.episodeNumber);
            if (meta.episodeNumber < 9) {
                episodeNumber = '0' + episodeNumber;
            }
            const episode = `E${episodeNumber}`;
            const ext = m[0];
            const filename = title + '_' + series + episode + '_' + player.isHighQualitySelected() ? 'hd' : '' + ext;

            if (mdUp) {
                fileDownload(
                    url,
                    filename
                );
            } else {
                window.open(url, '_blank');
            }
        }
    }

    return (
        <Box className={classes.playlistHeader}>
            {player.current() && (
                <div className={classes.playlistHeaderMetaData}>
                    <Grid
                        container
                        direction="row"
                    >
                        <Typography className={classes.playlistHeaderTitle} component="h3">
                            {archive.name}
                        </Typography>

                    </Grid>

                    <Grid
                        container
                        direction="row"
                    >
                        <Typography className={classes.playlistHeaderSubHead} display="block">
                            {archive.seasons.length > 1 && (archive.seasons[props.selectedSeasonIndex].name + ' - ')}
                            {player.currentlyPlayingItemOrder} / {player.playlistItemsCount}
                        </Typography>
                    </Grid>
                </div>
            )}
            <div className={classes.controlBar}>
                <Grid item xs={12}
                      container
                      direction="row"
                      justify="space-between"
                >
                    <Grid item className={classes.firstButton}>
                        <IconButton
                            className={classes.playerControlsButtonCommon}
                            size="small"
                            // color="inherit"
                            disabled={archive.seasons.length < 2}
                            onClick={handleOpenMenuClick}
                            title="Select season">
                            <List/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {archive.seasons.map((season: any, index: number) =>
                                <MenuItem
                                    disabled={index === props.selectedSeasonIndex}
                                    onClick={handlePlaylistChange}
                                    key={index}
                                    value={index}>{season.name}</MenuItem>)}
                        </Menu>
                    </Grid>
                    <Grid item>
                        {/*<IconButton*/}
                        {/*    className={classes.playerControlsButtonCommon}*/}
                        {/*    size="small"*/}
                        {/*    title="Loop playlist"*/}
                        {/*    color={player.isLoopEnabled() ? 'primary' : 'inherit'}*/}
                        {/*    onClick={() => dispatch(player.isLoopEnabled() ? ACTIONS.disableLoop() : ACTIONS.enableLoop())}*/}
                        {/*>*/}
                        {/*    <Repeat/>*/}
                        {/*</IconButton>*/}

                        {/*<IconButton*/}
                        {/*    className={classes.playerControlsButtonCommon}*/}
                        {/*    size="small"*/}
                        {/*    title="Shuffle playlist"*/}
                        {/*    color={player.isShuffleEnabled() ? 'primary' : 'inherit'}*/}
                        {/*    onClick={() => dispatch(player.isShuffleEnabled() ? ACTIONS.disableShuffle() : ACTIONS.enableShuffle())}*/}
                        {/*>*/}
                        {/*    <Shuffle/>*/}
                        {/*</IconButton>*/}

                        <IconButton
                            className={classes.playerControlsButtonCommon}
                            size="small"
                            title="Sort by episode number"
                            color={player.getPlaylistSortOrder() === 'desc' ? 'primary' : undefined}
                            onClick={() => dispatch(ACTIONS.reversePlaylistSort())}
                            disabled={!player.playlistItemsCount}>
                            <SortByAlpha/>
                        </IconButton>

                        {/*<IconButton*/}
                        {/*    className={classes.playerControlsButtonCommon}*/}
                        {/*    size="small"*/}
                        {/*    color={player.isHighQualitySelected() ? 'primary' : undefined}*/}
                        {/*    disabled={!player.hasHiqhQualityAvailable()}*/}
                        {/*    onClick={() => dispatch(player.isHighQualitySelected() ? ACTIONS.setVideoLowestQuality() : ACTIONS.setVideoHighestQuality())}*/}
                        {/*    title="High quality">*/}
                        {/*    <Hd/>*/}
                        {/*</IconButton>*/}

                        <IconButton
                            className={classes.playerControlsButtonCommon}
                            size="small"
                            title="Download"
                            onClick={() => download(player.currentStream())}
                        >
                            <GetApp/>
                        </IconButton>


                        <IconButton
                            className={classes.playerControlsButtonCommon}
                            size="small"
                            title="Toggle light/dark theme"
                            onClick={() => dispatch(THEME_ACTIONS.toggleThemeMode())}
                        >
                            <SvgIcon>
                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
                            </SvgIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}

// Header.propTypes = {
//     classes: Header.object.isRequired,
// };

export default withStyles(styles)(PlaylistHeader);