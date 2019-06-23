import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    media: {
        height: 240,
    },
};

function ArchiveItem(props: {classes: any, archiveItem: {img: string, title: string}, itemClick: any}) {
    const {classes, archiveItem, itemClick} = props;

    return (
        <Card className={classes.card} onClick={itemClick} square elevation={0}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={archiveItem.img.replace(/[r]?[0-9]+x[0-9]+[n]?/, 'r600x400')}
                        title={archiveItem.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {archiveItem.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
        </Card>
    );
}

ArchiveItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArchiveItem);