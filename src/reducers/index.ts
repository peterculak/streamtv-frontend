import Player from "../service/player/Player";
import {
    PLAYER_NEXT,
    PLAYER_PAUSE,
    PLAYER_PLAY,
    PLAYER_PREVIOUS,
    PLAYER_SET_AUTOPLAY_ON_OFF,
    PLAYER_TOGGLE_PAUSE_PLAY,
    PLAYER_LOAD_PLAYLIST,
    PLAYER_LOAD_PLAYLIST_AND_START_PLAYING,
    PLAYER_CHANGE_STREAM_QUALITY_INDEX,
    PLAYER_SET_VIDEO_ELEMENT_AND_START_PLAYING,
    PLAYER_PLAY_PLAYLIST_ITEM,
    PLAYER_SORT_PLAYLIST_REVERSE_SORT,
    PLAYER_SORT_PLAYLIST_ASC,
    PLAYER_SORT_PLAYLIST_DESC,
    PLAYER_SHUFFLE_ON,
    PLAYER_SHUFFLE_OFF,
    PLAYER_LOOP_ON,
    PLAYER_LOOP_OFF,
    SELECT_PROGRAM_ARCHIVE, PLAYER_SET_HIGHEST_QUALITY, PLAYER_SET_LOWEST_QUALITY,
} from "../app/config/constants/action_types";
import PlaylistFactory from "../service/player/PlaylistFactory";

const initialState = {
    player: new Player(),
    selectedProgramArchive: null,
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
        case PLAYER_CHANGE_STREAM_QUALITY_INDEX:
            state.player.selectedQualityIndex = action.payload;
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
            state.player.setVideoElement(action.payload, action.callback, action.dataLoadedCallback);
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
        case SELECT_PROGRAM_ARCHIVE:
            state.player.load(PlaylistFactory.createPlaylistForProgramSeason(action.payload.seasons[0]));
            state.selectedProgramArchive = action.payload;
            return state;
        default:
            return state;
    }
}

export default rootReducer;