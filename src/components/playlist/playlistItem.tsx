import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, useTheme, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PlayArrow from '@material-ui/icons/PlayArrow';

const styles = (theme: Theme) => ({
    card: {
        // maxWidth: 345,
        backgroundColor: 'transparent',
    },
    media: {
        height: 94,
        position: 'relative' as any,
    },
    detail: {
        height: 94,
        padding: 8,
        '&:last-child': {
            paddingBottom: 0,
        }
    },
    text: {
        height: '100%',
    },
    title: {
        fontWeight: 'bold' as any,
        fontSize: '14px',
        lineHeight: '16px',
        maxHeight: '32px',
        overflow: 'hidden',
        marginBottom: '4px',
    },
    playlistPosition: {
        position: 'absolute' as any,
        left: '-24px',
        top: '42px',
        width: '24px',
        textAlign: 'center' as any,
        fontSize: '12px',
    },
    playlistPositionArrow: {
        fontSize: '16px',
        color: theme.palette.text.hint,
    },
    playlistPositionNumber: {
        color: theme.palette.text.secondary,
    },
    itemLength: {
        position: 'absolute' as any,
        bottom: 0,
        right: 0,
        padding: '2px 4px',
        margin: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.80)',
        color: 'white',
        borderRadius: '2px',
        letterSpacing: '.5px',
        fontSize: '12px',
        fontWeight: 'bold' as any,
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

    return (
        <Card className={classes.card} onClick={itemClick} square elevation={0}>
            <CardActionArea>
                <Grid container
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start">

                    <Grid item xs={5} sm={3} md={5}>
                        <Box pl="24px">
                            <CardMedia
                                className={classes.media}
                                image={episode.image.replace(/[r]?[0-9]+x[0-9]+[n]?/, 'r640x480')}
                                title={episode.title}
                            >
                                {props.playlistPosition ? (
                                    <Box className={classes.playlistPosition}>
                                        {props.isPlaying ? (
                                            <PlayArrow className={classes.playlistPositionArrow}/>
                                            ) : (
                                            <Box className={classes.playlistPositionNumber}>{props.playlistPosition}</Box>
                                        )}
                                    </Box>
                                ) : ''}

                                    <Typography variant={'caption'} component="span">
                                        <Box className={classes.itemLength}>
                                            {formatLength(episode.length)}
                                        </Box>
                                    </Typography>

                            </CardMedia>
                        </Box>
                    </Grid>

                    <Grid item xs={7} sm={9} md={7} className={classes.media}>
                        <CardContent className={classes.detail}>
                            <Grid
                                className={classes.text}
                                container
                                direction="column"
                            >
                                <Grid item>
                                    <Typography className={classes.title} gutterBottom variant="subtitle2" component="h2">
                                        {episode.title}
                                    </Typography>
                                </Grid>
                                <Grid container
                                      justify="space-between"
                                      alignItems="flex-start"
                                >
                                    <Grid item>
                                        <Typography variant={'caption'} component="p">
                                            {episode.subtitle}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
}

PlaylistItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaylistItem);