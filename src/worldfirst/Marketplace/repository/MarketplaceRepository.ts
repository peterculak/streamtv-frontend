import MarketplaceRepositoryInterface from "./MarketplaceRepositoryInterface";
import Provider from "../entity/Provider";

type config = {listByProvider: string};
class MarketplaceRepository implements MarketplaceRepositoryInterface {

    private readonly api: config;

    constructor(api: config) {
        this.api = api;
    }

    findManyByProvider(provider: Provider): Promise<[]> {
        return fetch(
            this.api.listByProvider.replace('%id%', String(provider.id))).then(r => {
            if (!r.ok) {
                return JSON.parse('[]');
            }
            return r;
        }).then(r => r.json());
    }
}

export default MarketplaceRepository;
