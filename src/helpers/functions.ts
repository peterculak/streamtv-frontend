function isScalar(mixedVar: any): boolean {
    return (/boolean|number|string/).test(typeof mixedVar);
}

function ucWords(value: string): string {
    return value.toLowerCase().replace(/\b[a-z]/g, (letter: string) => letter.toUpperCase());
}

export {isScalar, ucWords};
