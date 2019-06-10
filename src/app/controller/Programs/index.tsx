import * as React from 'react';
import Paper from '@material-ui/core/Paper/index';
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
        const {history} = this.props;
        return (
            <div className="app-wrapper">

                <div className="d-flex justify-content-center">
                    <h1>{this.state && this.state.channel ? this.state.channel.name : ''}</h1>
                </div>
                {this.state && this.state.archive && this.state.archive.length ?
                    (
                        <div>
                            <Grid container alignItems="stretch" spacing={4}>
                                {this.state.archive.map(
                                    (archiveItem: any) => <Grid key={archiveItem.title} item xs={6} sm={3}><Paper>
                                        <ArchiveItem
                                            itemClick={function () {
                                                history.push(`/joj.sk/${archiveItem.slug}`);
                                            }}
                                        key={archiveItem.title} archiveItem={archiveItem}/>
                                    </Paper></Grid>)}

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
