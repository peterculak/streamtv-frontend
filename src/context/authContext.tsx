import React from 'react';
import AuthInterface from "../service/auth/AuthInterface";
const AuthContext = React.createContext({});

function AuthProvider(props: {authService: AuthInterface}) {
    const [password, setPassword] = React.useState('');

    const login = (password: string) => {
        props.authService.login(password);
        setPassword(password);
    };

    const logout = () => {
        props.authService.logout();
        setPassword('');
    };

    const isLoggedIn = () => props.authService.isLoggedIn();

    return (
        <AuthContext.Provider value={{login, isLoggedIn, logout}} {...props} />
    )
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}

export {AuthProvider, useAuth};
