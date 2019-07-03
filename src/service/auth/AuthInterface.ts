interface AuthInterface {
    password: string;
    isLoggedIn(): boolean;
    login(password: string): void;
    logout(): void;
}

export default AuthInterface;
