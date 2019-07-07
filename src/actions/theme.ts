import {
    THEME_SELECT_MODE,
    THEME_TOGGLE_MODE,
} from "../app/config/constants/action_types";

export function selectThemeMode(mode: "dark"|"light") {
    return {type: THEME_SELECT_MODE, payload: mode};
}

export function toggleThemeMode() {
    return {type: THEME_TOGGLE_MODE};
}
