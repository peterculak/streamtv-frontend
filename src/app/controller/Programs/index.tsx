import * as React from 'react';
import ChannelServiceInterface from "../../../service/ChannelServiceInterface";
import ProgramServiceInterface from "../../../service/ProgramServiceInterface";
import {ChannelInterface} from "../../../entities/ChannelInterface";
import ArchiveItem from "../../../components/archiveItem";
import Grid from '@material-ui/core/Grid';

interface PropsInterface {
    channelService: ChannelServiceInterface,
    programService: ProgramServiceInterface,
    match: any,
    history: any,
}

class ProgramsController extends React.Component<PropsInterface, any> {
    componentDidMount() {
        const {match: {params}} = this.props;

        this.props.channelService.find(params.channelId).then((channel: ChannelInterface) => {
            this.setState({
                channel: channel,
            });
        });

        this.props.programService.findAll(params.channelId).then((archive: Array<any>) => {
            this.setState({
                archive: archive,
            });
        });
    }

    render() {
        const {history, match} = this.props;
        return (
            <div className="app-wrapper">
                {this.state && this.state.archive && this.state.archive.length ?
                    (
                        <div>
                            <Grid container spacing={2}>
                                {this.state.archive.map(
                                    (archiveItem: any) => <Grid key={archiveItem.title} item xs={12} sm={6} md={4}>
                                        <ArchiveItem
                                            itemClick={function () {
                                                history.push(`/${match.params.channelId}/${archiveItem.slug}`);
                                            }}
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
}

export default ProgramsController;
