import Provider from "../../../../../../worldfirst/Marketplace/entity/Provider";
import InvalidArgumentException from "../../../../../../worldfirst/Marketplace/Exception/InvalidArgumentException";

describe('entity Provider', () => {
    const objectLiteral = {
        id: 1,
        name: 'firstname',
    };

    it('can construct entity from object literal', () => {
        const provider = Provider.fromObjectLiteral(objectLiteral);
        expect(provider instanceof Provider).toEqual(true);
    });

    it('returns id', () => {
        const provider = Provider.fromObjectLiteral(objectLiteral);
        expect(provider.id).toEqual(objectLiteral.id);
    });

    it('returns name', () => {
        const provider = Provider.fromObjectLiteral(objectLiteral);
        expect(provider.name).toEqual(objectLiteral.name);
    });

    it('throws exception when name is empty during instantiation', () => {
        objectLiteral.name = '';
        expect(() => Provider.fromObjectLiteral(objectLiteral)).toThrow(InvalidArgumentException);
    });

    it('throws exception when id is not natural number', () => {
        objectLiteral.id = 0;
        expect(() => Provider.fromObjectLiteral(objectLiteral)).toThrow(InvalidArgumentException);
        objectLiteral.id = -1;
        expect(() => Provider.fromObjectLiteral(objectLiteral)).toThrow(InvalidArgumentException);
    });
});
