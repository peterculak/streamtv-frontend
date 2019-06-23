import {createMuiTheme} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const baseSettings = {
    palette: {
        primary: {
            light: red[500],
            main: '#065fd4',
            dark: indigo[700],
            contrastText: '#065fd4'
        },
        secondary: {
            light: '#eeeeee',
            main: '#eeeeee',
            dark: pink[700],
            contrastText: '#fff'
        },
        background: {
            default: '#fff'
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

console.log(theme);
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
        // MuiCardContent: {
        //     root: {
        //         padding: 8,//padding: '0 8px 0 8px',
        //         '&:last-child': {
        //             paddingBottom: 0,
        //         }
        //     }
        // },
    }
};

const streamTvTheme = createMuiTheme(Object.assign(baseSettings, overrides));
// const streamTvTheme = createMuiTheme({});

export default streamTvTheme;
