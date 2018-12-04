import Provider from "../entity/Provider";

interface MarketplaceProviderServiceInterface {
    getProviderByName(name: string): Provider;
}

export default MarketplaceProviderServiceInterface;
