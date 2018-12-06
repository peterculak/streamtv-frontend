import Provider from "../entity/Provider";

export default interface MarketplaceRepositoryInterface {
    findManyByProvider(provider: Provider): Promise<[]>;
}
