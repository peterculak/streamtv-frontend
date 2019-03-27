import {createMuiTheme} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

const baseSettings = {
    palette: {
        primary: {
            light: '#673ab7',
            main: '#5600bb',
            dark: indigo[700],
            contrastText: '#fff'
        },
        secondary: {
            light: pink[300],
            main: '#6b01f4',
            dark: pink[700],
            contrastText: '#fff'
        },
    },
    typography: {
        useNextVariants: true,
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
    },
};

const theme = createMuiTheme(baseSettings);

const overrides = {
    overrides: {
        MuiTableCell: {
            root: {
                marginTop: theme.spacing.unit * 3,
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
