import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { AutoSizer } from 'react-virtualized';
import {withStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
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
import Hd from '@material-ui/icons/Hd';
import GetApp from '@material-ui/icons/GetApp';
import PlaylistItem from "./playlistItem";
import {useSelector, useDispatch} from 'react-redux';
import * as ACTIONS from "../../actions/player";
import PlaylistFactory from "../../service/player/PlaylistFactory";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PlayerInterface from "../../service/player/PlayerInterface";
import ListItem from '@material-ui/core/ListItem';

const fileDownload = require('js-file-download');

const styles = (theme: Theme) => createStyles({
    playlist: {
        borderBottom: '1px solid rgba(136, 136, 136, 0.4)',
        backgroundColor: 'hsla(0,0%,6.7%,.8)',
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
            color: 'rgba(17, 17, 17, 0.6)',
        },
    },
    controlBar: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '48px',
            color: '#eee',
        },
        [theme.breakpoints.up('md')]: {
            color: 'rgb(144, 144, 144)',
        },
        paddingRight: '4px',
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
        height: '100%',
        [theme.breakpoints.up('md')]: {
            backgroundColor: 'rgba(238, 238, 238, 0.6)',
            // paddingTop: '8px',
            // overflowY: 'auto',
        },
        // paddingBottom: '12px',
    },
    firstButton: {
        marginLeft: '-10px',
    }
});

function Playlist(props: any) {
    const locale = props.locale;
    let hiddenVideoPlayerRef = useRef<HTMLVideoElement>(null);
    const dispatch = useDispatch();

    const {player, archive} = useSelector<{ player: PlayerInterface, selectedTVSeriesArchive: any }, { player: PlayerInterface, archive: any }>((state) => ({
        player: state.player,
        archive: state.selectedTVSeriesArchive
    }));

    const {classes} = props;

    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState<number>(0);

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

    const [playlistHeight, setPlaylistHeight] = useState<string>('600px');
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    function setHeight() {
        const videoHeight = parseInt(player.getVideoElementHeight());
        const playlistHeight = window.innerHeight - videoHeight;
        const bodyTopPadding = 16;
        if (mdUp) {
            const playlistHeaderHeight = 100;
            setPlaylistHeight(window.innerHeight - 2 * bodyTopPadding - playlistHeaderHeight + 'px');
        } else {
            const playlistHeaderHeight = 96;
            setPlaylistHeight( `${playlistHeight - playlistHeaderHeight}px`);
        }
    }

    useEffect(() => {
        if (player.isLoaded()) {
            setHeight();
        }
    }, [player && player.isLoaded(), player.isVideoDataLoaded]);

    //todo fix this whole thing
    function download(url: string): void {
        const m = url.match(/\.[0-9a-z]+$/i);
        if (m && m[0]) {
            const title = archive.name;
            let seriesNumber = String(selectedSeasonIndex + 1);
            if (selectedSeasonIndex + 1) {
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
            const quality = player.availableQuality();
            const filename = title + '_' + series + episode + '_' + quality[player.selectedQualityIndex] + ext;

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

    function Row(props: ListChildComponentProps) {
        const { data, index, style } = props;
        const playlistItem = data[index];
        return (
            <Grid item xs={12}>
                <ListItem style={style} key={index} disableGutters={true}>
                    <PlaylistItem
                        locale={locale}
                        isPlaying={player.currentlyPlayingItemOrder === index + 1}
                        playlistPosition={index + 1}
                        key={index}
                        episode={playlistItem}
                        itemClick={() => dispatch(ACTIONS.playPlaylistItem(playlistItem))}
                    />
                </ListItem>
            </Grid>
        );
    }

    Row.propTypes = {
        index: PropTypes.number,
        style: PropTypes.object,
    } as any;

    return (
        <div className={classes.playlist}>
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
                                        key={index}
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
                                title="Sort by episode number"
                                color={player.getPlaylistSortOrder() === 'desc' ? 'primary' : 'inherit'}
                                onClick={() => dispatch(ACTIONS.reversePlaylistSort())}
                                disabled={!player.playlistItemsCount}>
                                <SortByAlpha/>
                            </IconButton>

                            <IconButton
                                className={classes.playerControlsButtonCommon}
                                size="small"
                                color={player.isHighQualitySelected() ? 'primary' : 'inherit'}
                                disabled={!player.hasHiqhQualityAvailable()}
                                onClick={() => dispatch(player.isHighQualitySelected() ? ACTIONS.setVideoLowestQuality() : ACTIONS.setVideoHighestQuality())}
                                title="High quality">
                                <Hd/>
                            </IconButton>

                            <IconButton
                                className={classes.playerControlsButtonCommon}
                                size="small"
                                title="Download"
                                color='inherit'
                                onClick={() => download(player.currentStream())}
                            >
                                <GetApp/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
            </Box>

            <Box style={{height: playlistHeight}} className={classes.playlistItems}>
                <Grid item xs={12}
                      container
                      direction="row"
                      spacing={0}
                >
                    <AutoSizer
                        disableHeight={true}
                    >
                        {({ height, width }) => (
                            <FixedSizeList
                                height={parseInt(playlistHeight)}
                                width={width}
                                itemSize={102}
                                itemCount={player.playlistItemsCount}
                                itemData={player.playlistItems}
                                overscanCount={5}
                            >
                                {Row}
                            </FixedSizeList>
                        )}
                    </AutoSizer>
                </Grid>
            </Box>
        </div>
    );
}

Playlist.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Playlist);