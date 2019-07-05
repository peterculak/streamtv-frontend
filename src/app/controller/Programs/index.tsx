import React, {useEffect} from 'react';
import {List, ListRowProps, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import {GridSpacing} from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ArchiveItem from "../../../components/archiveItem";
import ScrollManager from "../../../components/scrollManager";
import {useSelector, useDispatch} from 'react-redux';
import * as ITEM_ACTIONS from "../../../actions/archiveItem";
import {useAuth} from "../../../context/authContext";

function ProgramController(props: any) {
    const dispatch = useDispatch();
    const auth = useAuth();
    const {archives} = useSelector((state: any) => ({
        archives: state.channelArchives
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
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    if (isBetween) {
        spacing = 1;
    } else if (isMdUp) {
        spacing = 2;
    }

    const {classes, ...rest} = props;

    function Row(props: ListRowProps) {
        const {index, key, style, parent} = props;
        const archiveItem = archive[index];
        return (
            <CellMeasurer
                key={key}
                cache={cellMeasurerCache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <div style={style}>
                    <ArchiveItem
                        {...rest}
                        key={archiveItem.title}
                        archiveItem={archiveItem}
                    />
                </div>
            </CellMeasurer>
        );
    }

    const cellMeasurerCache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    });

    return (
        <Box height="100%">
            <ScrollManager scrollKey="program-list"/>
            {archive ?
                (
                    isMdUp ? (
                        <Grid container spacing={spacing as GridSpacing}>
                            {archive.map(
                                (archiveItem: any) => <Grid key={archiveItem.title} item xs={12} sm={6} md={4}>
                                    <ArchiveItem
                                        {...rest}
                                        programService={props.programService}
                                        key={archiveItem.title}
                                        archiveItem={archiveItem}
                                    />
                                </Grid>)}

                        </Grid>
                    ) : (
                        <AutoSizer>
                            {({height, width}) => (
                                <List
                                    width={width}
                                    height={height}
                                    deferredMeasurementCache={cellMeasurerCache}
                                    rowHeight={cellMeasurerCache.rowHeight}
                                    rowRenderer={Row}
                                    rowCount={archive.length}
                                    overscanRowCount={5}/>
                            )}
                        </AutoSizer>
                    )
                ) : ''}
        </Box>
    );
}

export default ProgramController;