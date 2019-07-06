import React, {useRef} from 'react';
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

const styles = (theme: Theme) => createStyles({
    card: {
        backgroundColor: 'transparent',
        //darktheme no color here below
        color: 'rgb(255, 255, 255)',
        [theme.breakpoints.down('sm')]: {
            padding: '12px',
            color: 'rgb(255, 255, 255)',
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
        [theme.breakpoints.down('sm')]: {
            opacity: .6,
        },
        fontSize: '13px',
    },
    dateAdded: {
        fontSize: '12px',
        // opacity: .6,//lighttheme
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
        // color: theme.palette.text.hint,//lighttheme
        color: 'rgb(62, 166, 255)'//darktheme
        //rgb(62, 166, 255)
    },
    playlistPositionNumber: {
        // color: theme.palette.text.secondary,//lighttheme
        color: 'hsl(0, 0%, 53.3%)'//darktheme
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
    const {classes, episode, itemClick} = props;

    const formatLength = (lengthInSeconds: number) => {
        let hours = 0;
        let minutes = Math.floor(lengthInSeconds / 60);

        if (minutes >=60) {
            hours = Math.floor(minutes / 60);
            minutes = minutes - hours * 60;
        }
        let seconds = lengthInSeconds - (hours * 60 * 60) - (minutes * 60);

        let secondsStr = String(seconds);
        if (seconds < 10) {
            secondsStr = '0' + secondsStr;
        }

        let minutesStr = String(minutes);
        if (hours) {
            if (minutes < 10) {
                minutesStr = '0' + minutesStr;
            }

            return `${hours}:${minutesStr}:${secondsStr}`;
        }

        return `${minutesStr}:${secondsStr}`;
    };

    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

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
                                        image={episode.image.replace(/[r]?[0-9]+x[0-9]+[n]?/, 'r640x480')}
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