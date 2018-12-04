import Provider from "../entity/Provider";

interface MarketplaceServiceInterface {
    getMarketplacesByProvider(provider: Provider): Promise<any>;
}

export default MarketplaceServiceInterface;
