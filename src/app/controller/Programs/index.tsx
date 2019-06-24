import React, {useState, useEffect} from 'react';
import ArchiveItem from "../../../components/archiveItem";
import Grid from '@material-ui/core/Grid';

function ProgramController(props: any) {
    const [archive, setArchive] = useState<Array<any>>([]);

    props.programService.findAll(props.match.params.channelId).then((archive: Array<any>) => {
        setArchive(archive);
    });

    return (
        <div className="app-wrapper">
            {archive && archive.length ?
                (
                    <div>
                        <Grid container spacing={2}>
                            {archive.map(
                                (archiveItem: any) => <Grid key={archiveItem.title} item xs={12} sm={6} md={4}>
                                    <ArchiveItem
                                        {...props}
                                        programService={props.programService}
                                        key={archiveItem.title} archiveItem={archiveItem}/>
                                </Grid>)}

                        </Grid>
                    </div>)
                :
                (
                    <div className="d-flex justify-content-center">
                    </div>
                )

            }
        </div>
    );
}

export default ProgramController;