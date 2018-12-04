import Provider from "../entity/Provider";

export default interface MarketplaceRepositoryInterface {
    findManyBy(provider: Provider): Promise<any>;
}
