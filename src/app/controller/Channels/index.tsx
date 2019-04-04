import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ChannelServiceInterface from "../../../service/ChannelServiceInterface";
import {ChannelInterface} from "../../../entities/ChannelInterface";

interface PropsInterface {
    channelService: ChannelServiceInterface,
    match: any,
}

class ChannelsController extends React.Component<PropsInterface, any> {
    private channelService: ChannelServiceInterface;

    constructor(props: PropsInterface, context: any) {
        super(props, context);
        this.channelService = props.channelService;
    }

    componentDidMount() {
        this.channelService.findAll().then((channels: Array<ChannelInterface>) => {
            this.setState({
                channels: channels,
            });
        });
    }

    render() {
        return (
            <div className="app-wrapper">

                <div className="d-flex justify-content-center">
                    <h1>TV Channels</h1>
                </div>

                {this.state && this.state.channels.length ?
                    (<div>
                        {this.state.channels.map((channel: any) => (<div key={channel.id}><Link to={`/${channel.id}`}>
                            <Button>{channel.name}</Button>
                        </Link></div>))}
                    </div>)
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

export default ChannelsController;
