import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {List, ListRowProps, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {withStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PlaylistItem from "./playlistItem";
import {useSelector, useDispatch} from 'react-redux';
import * as ACTIONS from "../../actions/player";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PlayerInterface from "../../service/player/PlayerInterface";
import PlaylistHeader from "./header";
import Hidden from '@material-ui/core/Hidden';

const styles = (theme: Theme) => createStyles({
    playlist: {
        borderBottom: '1px solid rgba(136, 136, 136, 0.4)',
        [theme.breakpoints.up('md')]: {
            // padding: '0 8px 8px 0',
        },
        width: '100%',
    },
    playlistItems: {
        height: '100%',
        [theme.breakpoints.up('md')]: {
            backgroundColor: theme.palette.type === 'dark' ? 'rgba(136, 136, 136, 0.2)' : 'rgba(238, 238, 238, 0.6)',
        },
    },
});

function Playlist(props: any) {
    const locale = props.locale;
    const {classes} = props;
    const [playlistHeight, setPlaylistHeight] = useState<string>('600px');
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const {player} = useSelector<{ player: PlayerInterface }, { player: PlayerInterface }>((state) => ({
        player: state.player,
    }));

    useEffect(() => {
        if (player.isLoaded()) {
            setHeight();
        }
    }, [player && player.isLoaded(), player.isVideoDataLoaded]);

    function setHeight() {
        const videoHeight = parseInt(player.getVideoElementHeight());
        const playlistHeight = window.innerHeight - videoHeight;
        const bodyTopPadding = 16;
        if (mdUp) {
            const playlistHeaderHeight = 88;
            setPlaylistHeight(window.innerHeight - 2 * bodyTopPadding - playlistHeaderHeight + 'px');
        } else {
            const playlistHeaderHeight = 0;
            setPlaylistHeight( `${playlistHeight - playlistHeaderHeight}px`);
        }
    }

    const cellMeasurerCache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 300
    });

    function RowMdUp(props: ListRowProps) {
        const {index, key, style, parent} = props;
        const playlistItem = player.playlistItems[index];
        return (
            <CellMeasurer
                key={key}
                cache={cellMeasurerCache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <div style={style}>
                    <PlaylistItem
                        locale={locale}
                        isPlaying={player.currentlyPlayingItemOrder === index + 1}
                        playlistPosition={index + 1}
                        key={index}
                        episode={playlistItem}
                        itemClick={() => dispatch(ACTIONS.playPlaylistItem(playlistItem))}
                    />
                </div>
            </CellMeasurer>
        );
    }

    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState<number>(0);

    function rowSmDown(props: ListRowProps) {
        const {index, key, style, parent} = props;
        const playlistItem = player.playlistItems[index -1];
        return (
            <CellMeasurer
                key={key}
                cache={cellMeasurerCache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <div style={style}>
                    {mdUp || index > 0 ? (<PlaylistItem
                        locale={locale}
                        isPlaying={player.currentlyPlayingItemOrder === index}
                        playlistPosition={index}
                        key={index}
                        episode={playlistItem}
                        itemClick={() => dispatch(ACTIONS.playPlaylistItem(playlistItem))}
                    />) : (<PlaylistHeader selectedSeasonIndex={selectedSeasonIndex} setSelectedSeasonIndex={setSelectedSeasonIndex}/>)}
                </div>
            </CellMeasurer>
        );
    }

    RowMdUp.propTypes = {
        index: PropTypes.number,
        style: PropTypes.object,
    } as any;

    return (
        <div className={classes.playlist}>

            <Hidden smDown>
                <PlaylistHeader selectedSeasonIndex={selectedSeasonIndex} setSelectedSeasonIndex={setSelectedSeasonIndex}/>
            </Hidden>

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
                            <List
                                style={
                                    mdUp ? {outline: 'none', paddingBottom: '12px', paddingTop: '8px'} :
                                        {outline: 'none', paddingBottom: '12px'}
                                }
                                width={width}
                                height={parseInt(playlistHeight)}
                                deferredMeasurementCache={cellMeasurerCache}
                                rowHeight={cellMeasurerCache.rowHeight}
                                rowRenderer={mdUp ? RowMdUp : rowSmDown}
                                rowCount={smDown ? player.playlistItems.length + 1 : player.playlistItems.length}
                                overscanRowCount={10}/>
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