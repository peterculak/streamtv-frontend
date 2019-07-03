import React, {useState, useEffect} from 'react';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import {GridSpacing} from '@material-ui/core/Grid';
import ArchiveItem from "../../../components/archiveItem";
import ScrollManager from "../../../components/scrollManager";
import {useSelector, useDispatch} from 'react-redux';
import * as ITEM_ACTIONS from "../../../actions/archiveItem";
import {useAuth} from "../../../context/authContext";

function ProgramController(props: any) {
    const dispatch = useDispatch();
    const auth = useAuth() as any;
    const {archives} = useSelector((state: any) => ({
        archives: state.selectedTVChannelArchive
    }));

    const archive = archives[props.match.params.channelId];

    useEffect(() => {
        if (!archive || !archive.length) {
            props.programService.findAll(props.match.params.channelId).then((archive: Array<any>) => {
                dispatch(ITEM_ACTIONS.selectTVChannelArchive(props.match.params.channelId, archive));
            }).catch((e: Error) => {
                auth.logout();
            });
        }
    }, [archive]);

    const theme = useTheme();
    let spacing = 0;
    const isBetween = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    if (isBetween) {
        spacing = 1;
    } else if (isMd) {
        spacing = 2;
    }

    return (
        <div className="app-wrapper">
            <ScrollManager scrollKey="program-list" />
            {archive &&
            (<div>
                <Grid container spacing={spacing as GridSpacing}>
                    {archive.map(
                        (archiveItem: any) => <Grid key={archiveItem.title} item xs={12} sm={6} md={4}>
                            <ArchiveItem
                                {...props}
                                programService={props.programService}
                                key={archiveItem.title} archiveItem={archiveItem}/>
                        </Grid>)}

                </Grid>
            </div>)}
        </div>
    );
}

export default ProgramController;