import React, {useEffect, useState} from 'react';
import ChannelServiceInterface from "../../../service/ChannelServiceInterface";
import {ChannelInterface} from "../../../entities/ChannelInterface";

import Grid from '@material-ui/core/Grid';
import TvChannel from "../../../components/tvChannel";
import {useAuth} from "../../../context/authContext";

interface PropsInterface {
    channelService: ChannelServiceInterface,
    match: any,
    history: any,
}

function ChannelsController(props: PropsInterface) {
    const auth = useAuth() as any;
    const [channels, setChannels] = useState<any>([]);

    useEffect(() => {
        if (!channels.length) {
            props.channelService.findAll().then((channels: Array<ChannelInterface>) => {
                channels.sort((a: ChannelInterface, b: ChannelInterface) => {
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                    return 0;
                });
                setChannels(channels);
            }).catch((e: Error) => auth.logout());
        }
    }, [channels]);

    const {history} = props;

    return (
        <div className="app-wrapper">
            {channels && channels.length &&
                (
                    <Grid container spacing={2}>
                        {channels.map((channel: any) => (
                            <Grid key={channel.id} item xs={12} sm={6} md={4}>
                                <TvChannel itemClick={() => history.push(`/${channel.id}/`)}
                                           channel={channel}/>
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        </div>
    );
}

export default ChannelsController;
