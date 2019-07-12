function isScalar(mixedVar: any): boolean {
    return (/boolean|number|string/).test(typeof mixedVar);
}

function ucWords(value: string): string {
    return value.toLowerCase().replace(/\b[a-z]/g, (letter: string) => letter.toUpperCase());
}

function formatLength(lengthInSeconds: number, index?: number): string {
    let hours = 0;
    let minutes = Math.floor(lengthInSeconds / 60);

    if (minutes >=60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes - hours * 60;
    }
    let seconds = Math.floor(lengthInSeconds - (hours * 60 * 60) - (minutes * 60));

    let secondsStr = String(seconds);
    if (seconds < 10) {
        secondsStr = '0' + secondsStr;
    }

    let minutesStr = String(minutes);
    if (hours) {
        if (minutes < 10) {
            minutesStr = '0' + minutesStr;
        }

        return `${hours}:${minutesStr}:${secondsStr}`;
    }

    return `${minutesStr}:${secondsStr}`;
}

export {isScalar, ucWords, formatLength};
