import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {withStyles, useTheme, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import Shuffle from '@material-ui/icons/Shuffle';
import Repeat from '@material-ui/icons/Repeat';
import List from '@material-ui/icons/List';
import HighQuality from '@material-ui/icons/HighQuality';
import PlaylistItem from "./playlistItem";
import {useSelector, useDispatch} from 'react-redux';
import * as ACTIONS from "../../actions/player";
import PlaylistFactory from "../../service/player/PlaylistFactory";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = (theme: Theme) => ({
    playlist: {
        borderBottom: '1px solid rgba(136, 136, 136, 0.4)',
        backgroundColor: 'hsla(0,0%,6.7%,.8)',
        [theme.breakpoints.down('sm')]: {
            height: '600px',
            overflowY: 'auto' as any,
        },
        [theme.breakpoints.up('md')]: {
            padding: '0 8px 8px 0',
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        width: '100%',
    },
    playlistHeader: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            color: '#fff',
            backgroundColor: 'rgb(17, 17, 17)',
            padding: '0 0 0 12px',
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: 'rgba(238, 238, 238)',
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
            color: 'rgb(238, 238, 238)',
        },
        fontWeight: 400,
        lineHeight: '17.5px',
    },
    playlistHeaderSubHead: {
        fontSize: '12px',
        lineHeight: '16.5px',
    },
    controlBar: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '48px',
            color: '#eee',
        },
        [theme.breakpoints.up('md')]: {
            color: 'rgb(144, 144, 144)',
        }
    },
    playerControlsButton: {
        marginLeft: '10px',
    },
    playerControlsButtonCommon: {
        padding: '.7em .57em',
        width: '40px',
        height: '40px',
    },
    playlistItems: {
        [theme.breakpoints.up('md')]: {
            backgroundColor: 'rgba(238, 238, 238, 0.6)',
            paddingTop: '8px',
            overflowY: 'auto' as any,
        },
        paddingBottom: '12px',
    },
    firstButton: {
        marginLeft: '-10px',
    }
});

function Playlist(props: any) {
    const dispatch = useDispatch();

    const {player, archive} = useSelector((state: any) => ({
        player: state.player,
        archive: state.selectedProgramArchive
    }));

    const {classes} = props;

    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

    const handlePlaylistChange = (event: any) => {
        setSelectedSeasonIndex(parseInt(event.target.value));
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

    const [playlistHeight, setPlaylistHeight] = useState('600px');
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if (player.isLoaded()) {
            const playerHeight = parseInt(window.getComputedStyle(player.getVideoElement()).height as string);
            const playlistHeight = window.innerHeight - playerHeight;
            const topPadding = 16;
            const playlistHeaderHeight = 100;
            if (mdUp) {
                setPlaylistHeight(window.innerHeight - 2*topPadding - playlistHeaderHeight + 'px');
            } else {
                setPlaylistHeight(playlistHeight + 'px');
            }
        }
    }, [player && player.isLoaded()]);

    return (
        <div /*style={{height: playlistHeight}}*/ className={classes.playlist}>
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
                                {archive.seasons.length > 1 && (archive.seasons[selectedSeasonIndex].name + ' - ')}
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
                                color="inherit"
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
                                        disabled={index === selectedSeasonIndex}
                                        onClick={handlePlaylistChange}
                                        key={index + season.seasonNumber}
                                        value={index}>{season.name}</MenuItem>)}
                            </Menu>
                        </Grid>
                        <Grid item>
                            <IconButton
                                className={classes.playerControlsButtonCommon}
                                size="small"
                                title="Loop playlist"
                                color={player.isLoopEnabled() ? 'primary' : 'inherit'}
                                onClick={() => dispatch(player.isLoopEnabled() ? ACTIONS.disableLoop() : ACTIONS.enableLoop())}
                            >
                                <Repeat/>
                            </IconButton>

                            <IconButton
                                className={classes.playerControlsButtonCommon}
                                size="small"
                                title="Shuffle playlist"
                                color={player.isShuffleEnabled() ? 'primary' : 'inherit'}
                                onClick={() => dispatch(player.isShuffleEnabled() ? ACTIONS.disableShuffle() : ACTIONS.enableShuffle())}
                            >
                                <Shuffle/>
                            </IconButton>

                            <IconButton
                                className={classes.playerControlsButtonCommon}
                                size="small"
                                color={player.isHighQualitySelected() ? 'primary' : 'inherit'}
                                disabled={!player.hasHiqhQualityAvailable()}
                                onClick={() => dispatch(player.isHighQualitySelected() ? ACTIONS.setVideoLowestQuality() : ACTIONS.setVideoHighestQuality())}
                                title="High quality">
                                <HighQuality/>
                            </IconButton>

                            <IconButton
                                className={classes.playerControlsButtonCommon}
                                size="small"
                                title="Sort by episode number"
                                color={player.getPlaylistSortOrder() === 'desc' ? 'primary' : 'inherit'}
                                onClick={() => dispatch(ACTIONS.reversePlaylistSort())}
                                disabled={!player.playlist.size()}>
                                <SortByAlpha/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>

            </Box>

            <Box style={{height: playlistHeight}} className={classes.playlistItems}>
                <Grid item xs={12}
                      container
                      direction="row"
                      spacing={mdUp ? 1 : 0}
                >
                    {player.isLoaded() && player.playlistItems.map(
                        (playlistItem: any, index: number) =>
                            <Grid key={index + playlistItem.title} item xs={12}>
                                <PlaylistItem
                                    isPlaying={player.currentlyPlayingItemOrder === index + 1}
                                    playlistPosition={index + 1}
                                    key={index + playlistItem.title}
                                    episode={playlistItem}
                                    itemClick={() => dispatch(ACTIONS.playPlaylistItem(playlistItem))}
                                />
                            </Grid>
                    )}
                </Grid>
            </Box>
        </div>
    );
}

Playlist.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Playlist);