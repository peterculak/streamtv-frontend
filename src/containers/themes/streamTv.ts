import {createMuiTheme} from '@material-ui/core/styles';
import {PaletteType} from '@material-ui/core';

function getTheme(mode: PaletteType) {
    return createMuiTheme({
        palette: {
            type: mode,
            primary: {
                main: mode === 'dark' ? 'rgb(62, 166, 255)' : '#065fd4',
            },
            background: {
                default: mode === 'dark' ? 'rgb(18, 18, 18)' : 'default',
            },
            text: {
                primary: mode === 'light' ? 'rgb(13, 13, 13)' : '#fff',
            }
        },
    });
}

export default getTheme;