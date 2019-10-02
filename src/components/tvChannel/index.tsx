import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Channel} from "../../entities/Channel";

const styles = {
    media: {
        height: 380,
    },
};

function TvChannel(props: {classes: any, channel: Channel, itemClick: any}) {
    const {classes, channel, itemClick} = props;
    const image = channel.image ? channel.image : `https://picsum.photos/380?random=${channel.name}`;

    return (
        <Card onClick={itemClick} square elevation={0}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={channel.name}
                    />
                </CardActionArea>
        </Card>
    );
}

TvChannel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TvChannel);