import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as moment from "moment";

const styles = {
    card: {
        // maxWidth: 345,
    },
    media: {
        height: 94,
    },
    text: {
        height: '100%',
    },
    title: {
        fontWeight: 'bold' as any,
    }
};

function RelatedEpisode(props: any) {
    const {classes, episode, itemClick, showDescription} = props;
    return (
        <Card className={classes.card} onClick={itemClick} square elevation={0}>
            <CardActionArea>
                <Grid container
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start">

                    <Grid item xs={5} sm={3} md={5}>
                        <CardMedia
                            className={classes.media}
                            image={episode.image.replace('400x300', '640x480')}
                            title={episode.name}
                        />
                    </Grid>

                    <Grid item xs={7} sm={9} md={7} className={classes.media}>
                        <CardContent className={classes.media}>
                            <Grid
                                className={classes.text}
                                container
                                direction="column"
                                justify="space-between"
                                alignItems="stretch"
                            >
                                <Grid item>
                                    <Typography className={classes.title} gutterBottom variant="subtitle2" component="h2">
                                        {episode.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container
                                          direction="row"
                                          justify="space-between"
                                          alignItems="center"
                                    >
                                        <Typography variant={'caption'} component="p">
                                            Episode: {episode.episodeNumber}
                                        </Typography>
                                        <Typography variant={'caption'} component="p">
                                            {moment.duration(parseInt(episode.timeRequired.replace(/PT|S/g, ''))*1000).humanize()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/*{showDescription ? (<Typography component="p" dangerouslySetInnerHTML={{__html: episode.description}} />) : ('')}*/}


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