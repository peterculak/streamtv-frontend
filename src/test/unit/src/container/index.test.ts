import Container from '../../../../container/index';
import ProviderService from "../../../../worldfirst/Marketplace/service/ProviderService";
import NotFoundException from "../../../../container/NotFoundException";

describe('DI Container', () => {
    let container: Container;
    const config = {
        marketplace: {
            api: {}
        }
    };

    beforeEach(() => {
        container = new Container(config);
    });

    it('it can be constructed without crashing', () => {
        expect(container instanceof Container).toEqual(true);
    });

    it('get config returns config', () => {
        expect(container.config).toEqual(config);
    });

    it('has provider.service', () => {
        expect(container.has('provider.service')).toEqual(true);
    });

    it('get provider.service returns service instance', () => {
        const service = container.get('provider.service');
        expect(service instanceof ProviderService).toEqual(true);
    });

    it('has returns false when doesn\'t have service', () => {
        expect(container.has('foo.service')).toEqual(false);
    });

    it('throws exception when get can not return service', () => {
        expect(() => container.get('foo.service')).toThrow(NotFoundException);
    });
});
