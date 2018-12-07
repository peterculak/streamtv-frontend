import mockProviderType from "../../../../../../worldfirst/Marketplace/entity/Provider";
import Provider from "../../../../../../worldfirst/Marketplace/entity/Provider";
import ProviderRepository from "../../../../../../worldfirst/Marketplace/repository/ProviderRepository";
import ProviderService from "../../../../../../worldfirst/Marketplace/service/ProviderService";
import ProviderServiceException
    from "../../../../../../worldfirst/Marketplace/service/ProviderServiceException";

const mockProvider = Provider.fromObjectLiteral({id: 1, name: 'FirstName'});
jest.mock("../../../../../../worldfirst/Marketplace/repository/ProviderRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            getMarketplaces(provider: mockProviderType): Promise<any> {
                return new Promise<any>(function(resolve, reject){
                    resolve('[{"foo": "bar"}]');
                });
            },
            findOneByName(name: string) {
                if (mockProvider.name === name) {
                    return mockProvider;
                }
                throw new Error(`No provider found for '${name}'`);
            }
        };
    });
});

describe('ProviderService', () => {
    let providerRepository: ProviderRepository;
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        ProviderRepository.mockClear();
        providerRepository = new ProviderRepository({
            scheme: 'http',
            host: '0.0.0.0',
            version: 'v1',
        });
    });

    it('getMarketplacesByProvider returns promise', () => {
        const service = new ProviderService(
            providerRepository
        );

        const marketplaces = service.getMarketplacesByProvider(mockProvider);
        expect(marketplaces instanceof Promise).toEqual(true);
    });

    it('getProviderByName returns provider when repository finds one', () => {
        const service = new ProviderService(
            providerRepository
        );
        const provider = service.getProviderByName(mockProvider.name);
        expect(provider instanceof Provider).toEqual(true);
    });

    it('getProviderByName throws exception when does not find provider', () => {
        const service = new ProviderService(
            providerRepository
        );
        expect(() => service.getProviderByName('non existing name')).toThrow(ProviderServiceException);
    });
});
