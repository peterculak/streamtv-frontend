import MarketplaceRepositoryInterface from "../repository/MarketplaceRepositoryInterface";
import Provider from "../entity/Provider";
import MarketplaceServiceInterface from "./MarketplaceServiceInterface";

class MarketplaceService implements MarketplaceServiceInterface {
  private readonly repository: MarketplaceRepositoryInterface;

  constructor(repository: MarketplaceRepositoryInterface) {
    this.repository = repository;
  }

  getMarketplacesByProvider(provider: Provider): Promise<any> {
    return this.repository.findManyBy(provider);
  }
}

export default MarketplaceService;
