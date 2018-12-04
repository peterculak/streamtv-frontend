import Provider from "../../../../../../worldfirst/Marketplace/entity/Provider";
import MarketplaceProviderRepository from "../../../../../../worldfirst/Marketplace/repository/MarketplaceProviderRepository";
import MarketplaceProviderService from "../../../../../../worldfirst/Marketplace/service/MarketplaceProviderService";
import MarketplaceProviderServiceException
    from "../../../../../../worldfirst/Marketplace/service/MarketplaceProviderServiceException";

const mockProvider = Provider.fromObjectLiteral({id: 1, name: 'FirstName'});
jest.mock("../../../../../../worldfirst/Marketplace/repository/MarketplaceProviderRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {findOneByName(name: string) {
            if (mockProvider.name === name) {
                return mockProvider;
            }

            throw new Error(`No provider found for '${name}'`);
        }};
    });
});

describe('MarketplaceProviderService', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        MarketplaceProviderRepository.mockClear();
    });

    it('getProviderByName returns provider when repository finds one', () => {
        const service = new MarketplaceProviderService(
            new MarketplaceProviderRepository()
        );
        const provider = service.getProviderByName(mockProvider.name);
        expect(provider instanceof Provider).toEqual(true);
    });

    it('getProviderByName throws exception when does not find provider', () => {
        const service = new MarketplaceProviderService(
            new MarketplaceProviderRepository()
        );
        expect(() => service.getProviderByName('non existing name')).toThrow(MarketplaceProviderServiceException);
    });
});
