import Provider from "../entity/Provider";
import MarketplaceProviderRepositoryInterface from "../repository/MarketplaceProviderRepositoryInterface";
import MarketplaceProviderServiceInterface from "./MarketplaceProviderServiceInterface";
import MarketplaceProviderServiceException from "./MarketplaceProviderServiceException";

class MarketplaceProviderService implements MarketplaceProviderServiceInterface {
    private readonly repository: MarketplaceProviderRepositoryInterface;

    constructor(repository: MarketplaceProviderRepositoryInterface) {
        this.repository = repository;
    }

    getProviderByName(name: string): Provider {
        try {
            return this.repository.findOneByName(name);
        } catch (Error) {
            throw MarketplaceProviderServiceException.notFoundWithName(name);
        }
    }
}

export default MarketplaceProviderService;
