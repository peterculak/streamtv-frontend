import {injectable} from "inversify";
import AuthInterface from "./AuthInterface";

@injectable()
class Auth implements AuthInterface {
    constructor(public _password: string|null = null) {
        this._password = _password;
    }

    isLoggedIn(): boolean {
        return this._password !== '' && this._password !== null;
    }

    login(password: string): void {
        this._password = password;
    }

    logout(): void {
        this._password = null;
    }

    get password(): string {
        return String(this._password);
    }
}

export default Auth;
