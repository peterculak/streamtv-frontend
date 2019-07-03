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

const styles = (theme: Theme) => ({
});

interface State {
    password: string;
    showPassword: boolean;
}

function AuthController(props: any) {
    const auth = useAuth() as any;

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

    return (
        <form onSubmit={handleLogin}>
            <Grid container direction="column">
                <Grid item>
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
                </Grid>

                <Grid item>
                    <Button onClick={handleLogin}>Login</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default withStyles(styles, {withTheme: true})(AuthController);
