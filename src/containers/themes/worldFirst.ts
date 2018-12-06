import {createMuiTheme} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
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
        }
    },
    typography: {
        useNextVariants: true,
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
    },
});

const worldFirst = createMuiTheme({
        overrides: {
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
            MuiTableCell: {
                head: {
                    color: theme.palette.primary.contrastText,
                    fontSize: 14,
                    fontWeight: "normal"
                }
            }
        }
    })
;
export default worldFirst;
