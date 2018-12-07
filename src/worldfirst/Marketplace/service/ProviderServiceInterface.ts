import Provider from "../entity/Provider";

interface ProviderServiceInterface {
    getProviderByName(name: string): Provider;

    getMarketplacesByProvider(provider: Provider): Promise<any>;
}

export default ProviderServiceInterface;
