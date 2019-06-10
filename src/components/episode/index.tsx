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
        height: 140,
    },
};

function Episode(props: any) {
    const {classes, episode} = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={episode.image.replace('400x300', '640x480')}
                    title={episode.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {episode.name}
                    </Typography>

                    <Typography component="p" dangerouslySetInnerHTML={{__html: episode.description}} />

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
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

Episode.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Episode);