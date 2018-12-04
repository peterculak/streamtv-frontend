import Provider from "../entity/Provider";

export default interface MarketplaceProviderRepositoryInterface {
    findOneByName(name: string): Provider;
}
