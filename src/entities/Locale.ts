import LocaleInterface from "./LocaleInterface";

export default class Locale implements LocaleInterface {
    constructor(
        private readonly _lang: string,
        private readonly _territory?: string
    ) {
    }

    static fromString(inputString: string): Locale {
        const bits = inputString.split('-');

        if (bits.length === 1) {
            return new Locale(inputString);
        }
        if (bits.length !== 2) {
            throw new Error(`Can not determinte locale from ${inputString}`);
        }

        return new Locale(bits[0], bits[1]);
    }

    lang(): string {
        return this._lang;
    }

    territory(): string {
        return this._territory ? this._territory: '';
    }

    toString(): string {
        return this._territory ? `${this._lang}_${this._territory}` : this._lang;
    }
}
