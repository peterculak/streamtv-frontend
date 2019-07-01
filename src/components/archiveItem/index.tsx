import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {useDispatch} from 'react-redux';
import * as ACTIONS from "../../actions/archiveItem";
import ProgramServiceInterface from "../../service/ProgramServiceInterface";

const styles = {
    media: {
        height: 240,
    },
};

function ArchiveItem(props: {history: any, match: any, programService: ProgramServiceInterface, classes: any, archiveItem: {slug: string, img: string, title: string}, itemClick?: any}) {
    const {classes, archiveItem, itemClick} = props;

    const defaultClickHandler = () => {
        props.programService.findOne(props.match.params.channelId, archiveItem.slug).then((programArchive: any) => {
            dispatch(ACTIONS.selectSeriesArchive(programArchive));
            props.history.push(`/${props.match.params.channelId}/${archiveItem.slug}`);
        });

    };

    const onClickHandler = itemClick ? itemClick : defaultClickHandler;

    const dispatch = useDispatch();

    return (
        <Card className={classes.card} onClick={onClickHandler} square elevation={0}>
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