import Container from '../../../../container/index';
import NotFoundException from "../../../../container/NotFoundException";

describe('DI Container', () => {
    let container: Container;
    const config = {};

    beforeEach(() => {
        container = new Container(config);
    });

    it('it can be constructed without crashing', () => {
        expect(container instanceof Container).toEqual(true);
    });

    it('get config returns config', () => {
        expect(container.config).toEqual(config);
    });

    it('has returns false when doesn\'t have service', () => {
        expect(container.has('foo.service')).toEqual(false);
    });

    it('throws exception when get can not return service', () => {
        expect(() => container.get('foo.service')).toThrow(NotFoundException);
    });
});
