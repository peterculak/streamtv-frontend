import {createMuiTheme} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const baseSettings = {
    palette: {
        primary: {
            light: red[500],
            // main: '#065fd4',//lighttheme
            main: 'rgb(62, 166, 255)',//darktheme
            dark: indigo[700],
            // contrastText: '#065fd4'
        },
        secondary: {
            light: '#eeeeee',
            main: '#eeeeee',
            dark: pink[700],
            contrastText: '#fff'
        },
        background: {
            // default: '#fff'//lighttheme
            default: 'hsl(0, 0%, 7%)',//darktheme
        }
    },
    typography: {
        useNextVariants: true,
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
    },
};

const theme = createMuiTheme({});

const overrides = {
    overrides: {
        MuiTableCell: {
            root: {
                overflowX: 'auto',
            },
            head: {
                color: theme.palette.primary.contrastText,
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        MuiTableRow: {
            root: {
                '&:nth-of-type(even)': {
                    backgroundColor: theme.palette.background.default,
                },
            },
            head: {
                backgroundColor: theme.palette.primary.light,
            }
        },
    }
};

const streamTvTheme = createMuiTheme(Object.assign(baseSettings, overrides));
export default streamTvTheme;
