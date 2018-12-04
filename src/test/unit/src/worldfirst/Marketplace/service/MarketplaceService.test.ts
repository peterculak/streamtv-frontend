import mockProvider from "../../../../../../worldfirst/Marketplace/entity/Provider";
import MarketplaceRepository from "../../../../../../worldfirst/Marketplace/repository/MarketplaceRepository";
import MarketplaceService from "../../../../../../worldfirst/Marketplace/service/MarketplaceService";

jest.mock("../../../../../../worldfirst/Marketplace/repository/MarketplaceRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            findManyByProvider(provider: mockProvider): Promise<any> {
                return new Promise<any>(function(resolve, reject){
                    resolve('[{"foo": "bar"}]');
                });
            }
        };
    });
});

describe('MarketplaceService', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        MarketplaceRepository.mockClear();
    });

    it('getMarketplacesByProvider returns promise', () => {
        const service = new MarketplaceService(
            new MarketplaceRepository({listByProvider: 'http://absolute-url.com/provider/%d%'})
        );
        const provider = mockProvider.fromObjectLiteral({id: 1, name: 'Amazon'});
        const marketplaces = service.getMarketplacesByProvider(provider);
        expect(marketplaces instanceof Promise).toEqual(true);
    });
});
