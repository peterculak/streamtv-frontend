import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

const worldFirst = {
    palette: {
        primary: {
            light: indigo[300],
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
    status: {
        danger: 'orange',
    },
    typography: {
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
    },
};

export default worldFirst;
