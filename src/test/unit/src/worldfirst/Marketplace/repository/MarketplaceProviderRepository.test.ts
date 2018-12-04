import Provider from "../../../../../../worldfirst/Marketplace/entity/Provider";
import MarketplaceProviderRepository from "../../../../../../worldfirst/Marketplace/repository/MarketplaceProviderRepository";
import MarketplaceRepositoryException
    from "../../../../../../worldfirst/Marketplace/repository/MarketplaceRepositoryException";

describe('MarketplaceProviderRepository', () => {
    let repository: MarketplaceProviderRepository;

    beforeEach(() => {
        repository = new MarketplaceProviderRepository();
    });

    it('findOneByName returns provider when it finds one', () => {
        const provider = repository.findOneByName('Amazon');
        expect(provider instanceof Provider).toEqual(true);
    });

    it('throws exception when doesn\'t find provider by name', () => {
        expect(() => repository.findOneByName('NonExisting')).toThrow(MarketplaceRepositoryException);
    });
});
