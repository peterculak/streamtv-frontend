function isScalar(mixedVar: any): boolean {
    return (/boolean|number|string/).test(typeof mixedVar);
}

function ucWords(value: string): string {
    return value.toLowerCase().replace(/\b[a-z]/g, function (letter: string) {
        return letter.toUpperCase();
    });
}

export {isScalar, ucWords};
