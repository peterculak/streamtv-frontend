import Provider from "../entity/Provider";
import MarketplaceProviderRepositoryInterface from "../repository/MarketplaceProviderRepositoryInterface";
import MarketplaceProviderServiceInterface from "./MarketplaceProviderServiceInterface";

class MarketplaceProviderService implements MarketplaceProviderServiceInterface {
    private readonly repository: MarketplaceProviderRepositoryInterface;

    constructor(repository: MarketplaceProviderRepositoryInterface) {
        this.repository = repository;
    }

    getProviderByName(name: string): Provider {
        return this.repository.findOneByName(name);
    }
}

export default MarketplaceProviderService;
