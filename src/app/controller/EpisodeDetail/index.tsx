import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Player from "../../../components/player";
import PlaylistItemTemplate from "../../../components/playlist/playlistItem";
import Paper from '@material-ui/core/Paper';
import PlaylistItem from "../../../service/player/PlaylistItem";
import Playlist from "../../../service/player/Playlist";
import {withStyles, useTheme, Theme} from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import * as ACTIONS from "../../../actions/player";
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import Shuffle from '@material-ui/icons/Shuffle';
import Repeat from '@material-ui/icons/Repeat';
import List from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';

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
    playlistItems: {
        height: '600px',
        overflowY: 'auto' as any,
        padding: '8px 8px 8px 0',
        backgroundColor: 'rgba(238, 238, 238, 0.6)',
    },
    firstButton: {
        marginLeft: '-12px',
    }
});

function EpisodeDetailController(props: any) {
    const {player} = useSelector((state: any) => ({
        player: state.player,
    }));
    const dispatch = useDispatch();
    const {classes, match} = props;
    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

    const [archive, setArchive] = useState<{ seasons: Array<any>, name: string }>({name: '', seasons: []});

    useEffect(() => {
        const fetchArchiveForProgram = async () => {
            const result = await props.programService.findOne(match.params.channelId, match.params.slug);
            setArchive(result);
        };

        if (archive.seasons.length === 0) {
            fetchArchiveForProgram();
        }
    }, [archive && archive.seasons.length]);

    useEffect(() => {
        if (archive.seasons.length) {
            dispatch(ACTIONS.loadPlaylistAndStartPlaying(createPlaylistForSeason(archive.seasons[0])));
        }
    }, [archive && archive.seasons.length]);

    function createPlaylistForSeason(selectedSeason: any): Playlist {
        const playlist = new Playlist([]);
        selectedSeason.episodes.forEach((item: any) => {
            const playlistItem = createPlaylistItem(item);
            playlistItem.sortPosition = item.episodeNumber;
            playlist.add(playlistItem);
        });
        playlist.sortAsc();

        return playlist;
    }

    function createPlaylistItem(item: any): PlaylistItem {
        return new PlaylistItem(
            item.name,
            item.thumbnailUrl,
            item.mp4,
            parseInt(item.timeRequired.replace(/PT|S/g, '')),
            `Episode: ${item.episodeNumber}`,
            {episodeNumber: item.episodeNumber}
        )
    }

    const handlePlaylistChange = (event: any) => {
        setSelectedSeasonIndex(parseInt(event.target.value));
        dispatch(ACTIONS.loadPlaylistAndStartPlaying(createPlaylistForSeason(archive.seasons[parseInt(event.target.value)])));
        handleMenuClose();
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleOpenMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    return (
        <div className="app-wrapper">

            {/*<Grid container direction="row" alignItems="flex-start"><Box mb={1}>top row</Box></Grid>*/}

            <Grid container spacing={0}
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start">

                <Grid item sm={12} md={8}>
                    <Paper elevation={0} className={classes.paper}>
                        <Player/>
                    </Paper>
                </Grid>

                {archive && player && (
                    <Grid item sm={12} md={4}
                          container
                          direction="row"
                          className={classes.playlist}
                    >
                        <Box className={classes.rhc}>

                            <Box bgcolor="secondary.main" pt={2} pb={0} pl={3} pr={1}>
                                {player.current() && (
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Typography variant="subtitle1" component="h3">
                                            {archive.name}
                                        </Typography>

                                    </Grid>
                                )}

                                {player.current() && (
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Box ml="1px">
                                            <Typography color="textSecondary" variant="caption" display="block"
                                                        gutterBottom>
                                                {archive.seasons.length > 1 && (archive.seasons[selectedSeasonIndex].name + ' - ')}
                                                {player.currentlyPlayingItemOrder} / {player.playlistItemsCount}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}

                                <Grid item xs={12}
                                      container
                                      direction="row"
                                      justify="space-between"
                                >
                                    <Grid item className={classes.firstButton}>
                                        <IconButton
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
                                            title="Loop playlist"
                                            color={player.isLoopEnabled() ? 'primary' : 'default'}
                                            onClick={() => dispatch(player.isLoopEnabled() ? ACTIONS.disableLoop() : ACTIONS.enableLoop())}
                                        >
                                            <Repeat/>
                                        </IconButton>

                                        <IconButton
                                            title="Shuffle playlist"
                                            color={player.isShuffleEnabled() ? 'primary' : 'default'}
                                            onClick={() => dispatch(player.isShuffleEnabled() ? ACTIONS.disableShuffle() : ACTIONS.enableShuffle())}
                                        >
                                            <Shuffle/>
                                        </IconButton>

                                        <IconButton
                                            title="Sort by episode number"
                                            color={player.getPlaylistSortOrder() === 'desc' ? 'primary' : 'default'}
                                            onClick={() => dispatch(ACTIONS.reversePlaylistSort())}
                                            disabled={!player.playlist.size()}>
                                            <SortByAlpha/>
                                        </IconButton>
                                    </Grid>

                                </Grid>
                            </Box>

                            <Box className={classes.playlistItems}>
                                <Grid item xs={12}
                                      container
                                      direction="row"
                                >
                                    {player.isLoaded() && player.playlistItems.map(
                                        (playlistItem: any, index: number) =>
                                            <Grid key={index + playlistItem.title} item xs={12}>
                                                <Box mb={1}>
                                                    <PlaylistItemTemplate
                                                        isPlaying={player.currentlyPlayingItemOrder === index + 1}
                                                        playlistPosition={index + 1}
                                                        key={index + playlistItem.title}
                                                        episode={playlistItem}
                                                        itemClick={() => dispatch(ACTIONS.playPlaylistItem(playlistItem))}
                                                    />
                                                </Box>
                                            </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>)}
            </Grid>
        </div>);
}

export default withStyles(styles, {withTheme: true})(EpisodeDetailController);
