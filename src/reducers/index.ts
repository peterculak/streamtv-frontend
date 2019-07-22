import getTheme from '../containers/themes/streamTv';
import {createMuiTheme} from '@material-ui/core/styles';
import CONSTANTS from "../app/config/constants/ioc";
import {container} from "../app/config/ioc_config";

import {
    PLAYER_NEXT,
    PLAYER_PAUSE,
    PLAYER_PLAY,
    PLAYER_PREVIOUS,
    PLAYER_SET_AUTOPLAY_ON_OFF,
    PLAYER_TOGGLE_PAUSE_PLAY,
    PLAYER_LOAD_PLAYLIST,
    PLAYER_LOAD_PLAYLIST_AND_START_PLAYING,
    PLAYER_SET_VIDEO_ELEMENT_AND_START_PLAYING,
    PLAYER_PLAY_PLAYLIST_ITEM,
    PLAYER_SORT_PLAYLIST_REVERSE_SORT,
    PLAYER_SORT_PLAYLIST_ASC,
    PLAYER_SORT_PLAYLIST_DESC,
    PLAYER_SHUFFLE_ON,
    PLAYER_SHUFFLE_OFF,
    PLAYER_LOOP_ON,
    PLAYER_LOOP_OFF,
    SELECT_TVSERIES_ARCHIVE,
    PLAYER_SET_HIGHEST_QUALITY,
    PLAYER_SET_LOWEST_QUALITY,
    SELECT_CHANNEL_ARCHIVE,
    PLAYER_UPDATE_NEXT_ITEM_DURATION,
    THEME_SELECT_MODE, THEME_TOGGLE_MODE,
} from "../app/config/constants/action_types";
import PlaylistFactory from "../service/player/PlaylistFactory";
import Player from "../service/player/Player";
import DomAdapter from "../service/player/adapter/DomAdapter";

const initialState = {
    player: container.get<Player>(CONSTANTS.PLAYER),
    selectedTVSeriesArchive: null,
    channelArchives: {} as any,
    theme: getTheme('dark'),
};

function rootReducer(state = initialState, action: any) {
    switch(action.type) {
        case PLAYER_PLAY:
            state.player.play();
            return state;
        case PLAYER_PAUSE:
            state.player.pause();
            return state;
        case PLAYER_NEXT:
            state.player.next();
            return state;
        case PLAYER_PREVIOUS:
            state.player.previous();
            return state;
        case PLAYER_SET_AUTOPLAY_ON_OFF:
            state.player.autoplay = action.payload;
            return state;
        case PLAYER_LOAD_PLAYLIST:
            state.player.load(action.payload);
            return state;
        case PLAYER_SET_HIGHEST_QUALITY:
            state.player.setHighestQuality();
            return state;
        case PLAYER_SET_LOWEST_QUALITY:
            state.player.setLowestVideoQuality();
            return state;
        case PLAYER_PLAY_PLAYLIST_ITEM:
            state.player.playPlaylistItem(action.payload);
            return state;
        case PLAYER_TOGGLE_PAUSE_PLAY:
            if (state.player.isPlaying()) {
                state.player.pause();
            } else {
                state.player.resume();
            }
            return state;
        case PLAYER_LOAD_PLAYLIST_AND_START_PLAYING:
            state.player.load(action.payload);
            if (state.player.isLoaded() && state.player.autoplay) {
                state.player.play();
            }
            return state;
        case PLAYER_SET_VIDEO_ELEMENT_AND_START_PLAYING:
            state.player.initializeHtmlPlayer(new DomAdapter(window, action.payload), action.callbacks);
            if (state.player.isLoaded() && state.player.autoplay) {
                state.player.play();
            }
            return state;
        case PLAYER_SORT_PLAYLIST_REVERSE_SORT:
            state.player.reversePlaylistSort();
            return state;
        case PLAYER_SORT_PLAYLIST_ASC:
            state.player.sortPlaylistAsc();
            return state;
        case PLAYER_SORT_PLAYLIST_DESC:
            state.player.sortPlaylistDesc();
            return state;
        case PLAYER_SHUFFLE_ON:
            state.player.enableShuffle();
            return state;
        case PLAYER_SHUFFLE_OFF:
            state.player.disableShuffle();
            return state;
        case PLAYER_LOOP_ON:
            state.player.enableLoop();
            return state;
        case PLAYER_LOOP_OFF:
            state.player.disableLoop();
            return state;
        case SELECT_CHANNEL_ARCHIVE:
            state.channelArchives[action.payload.channelId] = action.payload.archive;
            return state;
        case SELECT_TVSERIES_ARCHIVE:
            state.player.load(PlaylistFactory.createPlaylistForProgramSeason(action.payload.seasons[0]));
            state.selectedTVSeriesArchive = action.payload;
            return state;
        case PLAYER_UPDATE_NEXT_ITEM_DURATION:
            const next = state.player.willPlayNext();
            if (next) {
                next.duration = action.payload;
            }
            return state;
        case THEME_SELECT_MODE:
            state.theme = createMuiTheme({
                palette: {
                    type: action.payload,
                },
            });
            return state;
        case THEME_TOGGLE_MODE:
            state.theme = getTheme(state.theme.palette.type === 'light' ? 'dark' : 'light');
            return state;
        default:
            return state;
    }
}

export default rootReducer;