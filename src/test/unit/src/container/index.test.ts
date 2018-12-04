import Container from '../../../../container/index';
import MarketplaceService from "../../../../worldfirst/Marketplace/service/MarketplaceService";
import MarketplaceProviderService from "../../../../worldfirst/Marketplace/service/MarketplaceProviderService";
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

    it('has marketplace.service', () => {
        expect(container.has('marketplace.service')).toEqual(true);
    });

    it('get marketplace.service returns service instance', () => {
        const service = container.get('marketplace.service');
        expect(service instanceof MarketplaceService).toEqual(true);
    });

    it('has marketplace.provider.service', () => {
        expect(container.has('marketplace.provider.service')).toEqual(true);
    });

    it('get marketplace.provider.service returns instance of service', () => {
        const service = container.get('marketplace.provider.service');
        expect(service instanceof MarketplaceProviderService).toEqual(true);
    });

    it('has returns false when doesn\'t have service', () => {
        expect(container.has('foo.service')).toEqual(false);
    });

    it('throws exception when get can not return service', () => {
        expect(() => container.get('foo.service')).toThrow(NotFoundException);
    });
});
