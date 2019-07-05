import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles, Theme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import {useAuth} from "../../../context/authContext";
import Box from '@material-ui/core/Box';
const styles = (theme: Theme) => ({
    form: {
        height: '100%',
    },
    container: {
        height: '100%',
    },
    gridItem: {
        width: '100%',
    }
});

interface State {
    password: string;
    showPassword: boolean;
}

function AuthController(props: any) {
    const auth = useAuth();

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleLogin = () => {
        auth.login(values.password);
    };

    const {classes} = props;

    return (
        <form onSubmit={handleLogin} className={classes.form}>
            <Grid
                className={classes.container}
                alignItems="center"
                justify="center"
                container
                direction="row"
            >
                <Grid item xs={8} md={3} lg={2}>
                    <Grid container
                          alignItems="center"
                          justify="center"
                          spacing={2}
                    >
                        <Grid item className={classes.gridItem}>
                            <Box textAlign="right">
                                <FormControl>
                                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                    <Input
                                        id="adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        autoFocus
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton aria-label="Toggle password visibility"
                                                            onClick={handleClickShowPassword}>
                                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item className={classes.gridItem}>
                            <Box textAlign="right">
                                <Button size="large" variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}

export default withStyles(styles, {withTheme: true})(AuthController);
