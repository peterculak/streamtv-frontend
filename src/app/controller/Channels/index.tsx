import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import ChannelServiceInterface from "../../../service/ChannelServiceInterface";
import {ChannelInterface} from "../../../entities/ChannelInterface";
const device = require('current-device').default;
import Grid from '@material-ui/core/Grid';
import TvChannel from "../../../components/tvChannel";
import * as crypto from "crypto-js";

interface PropsInterface {
    channelService: ChannelServiceInterface,
    match: any,
    history: any,
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

        this.setState({
            pressedKey: 'none',
            x: 0, y: 0,
        });

        document.addEventListener("keydown", (e: any) => {
            this.setState({
                pressedKey: e.key,
            });
        }, false);
    }

    _onMouseMove(e: any) {
        this.setState({ x: e.screenX, y: e.screenY });
    }

    render() {
        const { history } = this.props;

        return (
            <div className="app-wrapper" onMouseMove={this._onMouseMove.bind(this)}>

                <div className="d-flex justify-content-center">
                    {this.state && (
                        <div>
                            <h2>Mouse coordinates: { this.state.x } { this.state.y }</h2>
                            <h2>{this.state.pressedKey}</h2>
                            <h3>{device.television() ? 'TV' : 'browser'}</h3>
                        </div>
                    )}
                </div>

                {this.state && this.state.channels && this.state.channels.length ?
                    (
                        <Grid container spacing={2}>
                                {this.state.channels.map((channel: any) => (
                                    <Grid key={channel.id} item xs={12} sm={6} md={4}>
                                        <TvChannel itemClick={() => history.push(`/${channel.id}/`)} channel={channel}></TvChannel>
                                    </Grid>
                                ))}
                        </Grid>
                    )
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
