import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Theme} from '@material-ui/core/styles';
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
import PlaylistItem from "./playlistItem";
import {useSelector, useDispatch} from 'react-redux';
import * as ACTIONS from "../../actions/player";
import PlaylistFactory from "../../service/player/PlaylistFactory";

const styles = (theme: Theme) => ({
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

    return (
        <div>
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
                                    <PlaylistItem
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
        </div>
    );
}

Playlist.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Playlist);