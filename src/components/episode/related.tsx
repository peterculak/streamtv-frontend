import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, Theme, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const styles = (theme: Theme) => createStyles({
    card: {
        // maxWidth: 345,
        backgroundColor: 'transparent',
    },
    media: {
        height: 94,
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
        fontWeight: 'bold',
        marginBottom: 0,
    },
    playlistPosition: {
        position: 'absolute',
        left: 0,
        top: '45px',
        width: '24px',
        textAlign: 'center',
        fontSize: '12px',
        color: theme.palette.text.secondary,
    }
});

function RelatedEpisode(props: any) {
    const {classes, episode, itemClick} = props;
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
                            />
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

RelatedEpisode.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RelatedEpisode);