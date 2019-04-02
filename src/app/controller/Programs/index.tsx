import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import Paper from '@material-ui/core/Paper/index';
import ChannelServiceInterface from "../../../service/ChannelServiceInterface";
import ProgramServiceInterface from "../../../service/ProgramServiceInterface";
import {ChannelInterface} from "../../../entities/ChannelInterface";

interface PropsInterface {
    channelService: ChannelServiceInterface,
    programService: ProgramServiceInterface,
    match: any,
}

class ProgramsController extends React.Component<PropsInterface, any> {
    componentDidMount() {
        const { match: { params } } = this.props;

        this.props.channelService.find(params.channelId).then((channel: ChannelInterface) => {
            this.setState({
                channel: channel,
            });
        });
    }

    render() {
        return (
            <div className="app-wrapper">

                <div className="d-flex justify-content-center">
                    <h1>{this.state && this.state.channel ? this.state.channel.name : ''}</h1>
                </div>

                {this.state && this.state.channel ?
                    (<Paper>
                        <div className="table-responsive-material">
                            TV SHOWS
                        </div>
                    </Paper>)
                    :
                    (
                        <div className="d-flex justify-content-center">
                            <div className="loader">
                                <CircularProgress/>
                            </div>
                        </div>
                    )

                }
            </div>
        );
    }
}

export default ProgramsController;
