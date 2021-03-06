import {isScalar, ucWords} from '../../../../helpers/functions';

describe('helper functions', () => {
    it('isScalar returns true when variable is scalar', () => {
        expect(isScalar(1)).toBe(true);
        expect(isScalar(1.2)).toBe(true);
        expect(isScalar('a')).toBe(true);
        expect(isScalar(true)).toBe(true);
        expect(isScalar(false)).toBe(true);
    });

    it('isScalar returns false when variable is not scalar', () => {
        expect(isScalar([])).toBe(false);
        expect(isScalar({})).toBe(false);
        expect(isScalar(Object)).toBe(false);
    });

    it('ucWords capitalizes first letter in every word', () => {
        expect(ucWords('aaa')).toBe('Aaa');
        expect(ucWords('aaa bbb')).toBe('Aaa Bbb');
    });
});
