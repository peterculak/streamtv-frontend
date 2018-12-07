import ProviderRepositoryInterface from "../repository/ProviderRepositoryInterface";
import Provider from "../entity/Provider";
import ProviderServiceInterface from "./ProviderServiceInterface";
import ProviderServiceException from "./ProviderServiceException";

class ProviderService implements ProviderServiceInterface {
    private readonly repository: ProviderRepositoryInterface;

    constructor(repository: ProviderRepositoryInterface) {
        this.repository = repository;
    }

    getMarketplacesByProvider(provider: Provider): Promise<[]> {
        return this.repository.getMarketplaces(provider);
    }

    getProviderByName(name: string): Provider {
        try {
            return this.repository.findOneByName(name);
        } catch (Error) {
            throw ProviderServiceException.notFoundWithName(name);
        }
    }
}

export default ProviderService;
