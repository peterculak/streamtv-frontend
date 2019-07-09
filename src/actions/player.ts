import {
    PLAYER_CHANGE_STREAM_QUALITY_INDEX,
    PLAYER_LOAD_PLAYLIST,
    PLAYER_LOAD_PLAYLIST_AND_START_PLAYING,
    PLAYER_PLAY,
    PLAYER_NEXT,
    PLAYER_PLAY_PLAYLIST_ITEM,
    PLAYER_PREVIOUS,
    PLAYER_SET_AUTOPLAY_ON_OFF,
    PLAYER_SET_VIDEO_ELEMENT_AND_START_PLAYING,
    PLAYER_TOGGLE_PAUSE_PLAY,
    PLAYER_SORT_PLAYLIST_REVERSE_SORT,
    PLAYER_SORT_PLAYLIST_ASC,
    PLAYER_SORT_PLAYLIST_DESC,
    PLAYER_SHUFFLE_ON,
    PLAYER_SHUFFLE_OFF,
    PLAYER_LOOP_ON,
    PLAYER_LOOP_OFF,
    PLAYER_SET_HIGHEST_QUALITY,
    PLAYER_SET_LOWEST_QUALITY,
    PLAYER_VIDEO_ELEMENT_DATA_LOADED,
    PLAYER_UPDATE_NEXT_ITEM_DURATION,
    PLAYER_VIDEO_TIME_UPDATE,
} from "../app/config/constants/action_types";
import PlaylistInterface from "../service/player/PlaylistInterface";
import PlaylistItem from "../service/player/PlaylistItem";
import PlayableItem from "../service/player/PlayableItem";

export function play() {
    return {type: PLAYER_PLAY};
}

export function next() {
    return {type: PLAYER_NEXT};
}

export function previous() {
    return {type: PLAYER_PREVIOUS};
}

export function togglePlay() {
    return {type: PLAYER_TOGGLE_PAUSE_PLAY};
}

export function loadPlaylist(playlist: PlaylistInterface) {
    return {type: PLAYER_LOAD_PLAYLIST, payload: playlist};
}

export function loadPlaylistAndStartPlaying(playlist: PlaylistInterface) {
    return {type: PLAYER_LOAD_PLAYLIST_AND_START_PLAYING, payload: playlist};
}

export function setAutoplayOnOff(autoplay: boolean) {
    return {type: PLAYER_SET_AUTOPLAY_ON_OFF, payload: autoplay};
}

export function setVideoElementAndStartPlaying(
    videoElement: HTMLVideoElement,
    callbacks?: {
        ended?: any,
        loadeddata?: any,
        timeupdate?: any,
    }
) {
    return {type: PLAYER_SET_VIDEO_ELEMENT_AND_START_PLAYING, payload: videoElement, callbacks: callbacks};
}

export function playPlaylistItem(item: PlayableItem) {
    return {type: PLAYER_PLAY_PLAYLIST_ITEM, payload: item};
}

export function reversePlaylistSort() {
    return {type: PLAYER_SORT_PLAYLIST_REVERSE_SORT};
}

export function sortPlaylistAsc() {
    return {type: PLAYER_SORT_PLAYLIST_ASC};
}

export function sortPlaylistDesc() {
    return {type: PLAYER_SORT_PLAYLIST_DESC};
}

export function enableShuffle() {
    return {type: PLAYER_SHUFFLE_ON};
}

export function disableShuffle() {
    return {type: PLAYER_SHUFFLE_OFF};
}

export function enableLoop() {
    return {type: PLAYER_LOOP_ON};
}

export function disableLoop() {
    return {type: PLAYER_LOOP_OFF};
}

export function setStreamQuality(index: number) {
    return {type: PLAYER_CHANGE_STREAM_QUALITY_INDEX, payload: index};
}

export function setVideoHighestQuality() {
    return {type: PLAYER_SET_HIGHEST_QUALITY};
}

export function setVideoLowestQuality() {
    return {type: PLAYER_SET_LOWEST_QUALITY};
}

export function videoElementDataLoaded() {
    return {type: PLAYER_VIDEO_ELEMENT_DATA_LOADED};
}

export function addNextItemDuration(duration: number) {
    return {type: PLAYER_UPDATE_NEXT_ITEM_DURATION, payload: duration};
}

export function videoElementTimeUpdate() {
    return {type: PLAYER_VIDEO_TIME_UPDATE};
}