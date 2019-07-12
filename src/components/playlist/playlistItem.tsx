import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PlayArrow from '@material-ui/icons/PlayArrow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactTimeAgo from 'react-time-ago';
import PlayerInterface from "../../service/player/PlayerInterface";
import {useSelector, useDispatch} from 'react-redux';
import {formatLength} from '../../helpers/functions';

const styles = (theme: Theme) => createStyles({
    card: {
        backgroundColor: 'transparent',
        paddingBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            padding: '12px',
        },
    },
    notSelectedCard: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: '-12px',
        }
    },
    selectedCard: {
        [theme.breakpoints.down('sm')]: {
            backgroundColor: 'hsla(0,0%,53.3%,.8)',
        },
    },
    selectedCardMarginTop: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '12px',
        },
    },
    media: {
        [theme.breakpoints.down('sm')]: {
            height: '90px',
        },
        [theme.breakpoints.up('md')]: {
            height: '94px',
        },
        position: 'relative',
    },
    detail: {
        height: '90px',
        padding: '0 8px',
        '&:last-child': {
            paddingBottom: 0,
        }
    },
    text: {
        height: '100%',
    },
    headline: {
        fontSize: '14px',
        lineHeight: '16px',
        maxHeight: '32px',
        overflow: 'hidden',
        fontWeight: 'bold',
        marginBottom: '4px',
    },
    subhead: {
        fontSize: '13px',
    },
    dateAdded: {
        fontSize: '12px',
        opacity: .6,
    },
    playlistPosition: {
        position: 'absolute',
        left: '-24px',
        top: '42px',
        width: '24px',
        textAlign: 'center',
        fontSize: '12px',
    },
    playlistPositionNumberWidth: {
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0',
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: '24px',
        },
    },
    playlistPositionArrow: {
        fontSize: '16px',
        color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.text.hint
    },
    playlistPositionNumber: {
        color: theme.palette.type === 'dark' ? 'hsl(0, 0%, 53.3%)' : theme.palette.text.secondary
    },
    itemLength: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: '2px 4px',
        margin: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.80)',
        color: 'white',
        borderRadius: '2px',
        letterSpacing: '.5px',
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '12px',
    }
});

function PlaylistItem(props: any) {
    const {player} = useSelector<{ player: PlayerInterface }, { player: PlayerInterface }>((state) => ({
        player: state.player,
    }));
    const {classes, episode, itemClick} = props;

    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    let imageQuality = 'r320x240';
    if (player.isHighQualitySelected()) {
        imageQuality = 'r640x480';
    }
    return (
        <Box width="100%" className={props.isPlaying && props.playlistPosition > 1 ? classes.selectedCardMarginTop : ''} >
            <Box width="100%" className={props.isPlaying ? classes.selectedCard : classes.notSelectedCard}>
                <Card className={classes.card} onClick={itemClick} square elevation={0}>
                    <CardActionArea>
                        <Grid container
                              direction="row"
                              justify="space-between"
                              alignItems="flex-start">

                            <Grid item xs={6} sm={3} md={5}>
                                <Box className={classes.playlistPositionNumberWidth}>
                                    <CardMedia
                                        className={classes.media}
                                        image={episode.image.replace(/\/[r]?[0-9]+x?[0-9]?[n]?\/?/, `/${imageQuality}/`)}
                                        title={episode.title}

                                    >
                                        {mdUp && props.playlistPosition && (
                                            <Box className={classes.playlistPosition}>
                                                {props.isPlaying ? (
                                                    <PlayArrow className={classes.playlistPositionArrow}/>
                                                ) : (
                                                    <Box className={classes.playlistPositionNumber}>{props.playlistPosition}</Box>
                                                )}
                                            </Box>
                                        )}

                                        {episode.duration ? (
                                            <Typography variant={'caption'} component="span">
                                                <Box className={classes.itemLength}>
                                                    {formatLength(episode.duration)}
                                                </Box>
                                            </Typography>
                                        ) : ''}

                                    </CardMedia>
                                </Box>
                            </Grid>

                            <Grid item xs={6} sm={9} md={7} className={classes.media}>
                                <CardContent className={classes.detail}>
                                    <Grid
                                        className={classes.text}
                                        container
                                        direction="column"
                                    >
                                        <Grid item>
                                            <Typography className={classes.headline} variant="subtitle2" component="h4">
                                                {episode.title}
                                            </Typography>
                                        </Grid>

                                        {episode['@type'] === 'TVSeries' ? (
                                            <Grid item>
                                                <Typography className={classes.subhead} variant={'subtitle2'} component="p">
                                                    Epizóda: {episode.meta.episodeNumber}
                                                </Typography>
                                            </Grid>
                                        ) : ''}

                                        {episode.meta.dateAdded && (
                                            <Grid item>
                                                <Box mt={episode['@type'] === 'TVSeries' ? '-4px' : '0'}>
                                                    <Typography className={classes.dateAdded} variant={'subtitle2'} component="p">
                                                        <ReactTimeAgo locale={props.locale.lang()} date={episode.meta.dateAdded}/>
                                                    </Typography>
                                                </Box>
                                            </Grid>)}
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Box>
        </Box>
    );
}

PlaylistItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaylistItem);