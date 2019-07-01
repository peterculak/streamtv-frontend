import {
    SELECT_CHANNEL_ARCHIVE,
    SELECT_TVSERIES_ARCHIVE
} from "../app/config/constants/action_types";

export function selectSeriesArchive(archive: any) {
    return {type: SELECT_TVSERIES_ARCHIVE, payload: archive};
}

export function selectTVChannelArchive(channelId: string, archive: any) {
    return {type: SELECT_CHANNEL_ARCHIVE, payload: {channelId: channelId, archive: archive}};
}
