import Provider from "../entity/Provider";

export default interface ProviderRepositoryInterface {
    findOneByName(name: string): Provider;
    getMarketplaces(provider: Provider): Promise<[]>;
}
