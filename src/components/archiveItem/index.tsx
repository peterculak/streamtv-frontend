import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

function ArchiveItem(props: any) {
    const {classes, archiveItem, itemClick} = props;

    return (
        <Card className={classes.card} onClick={itemClick}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={archiveItem.img.replace('100x100', '345x140')}
                        title={archiveItem.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {archiveItem.title}
                        </Typography>
                        {/*<Typography variant="body2" color="textSecondary" component="p">*/}
                        {/*    {archiveItem.description}*/}
                        {/*</Typography>*/}
                    </CardContent>
                </CardActionArea>
        </Card>
    );
}

ArchiveItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArchiveItem);