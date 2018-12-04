import MarketplaceRepositoryInterface from "./MarketplaceRepositoryInterface";
import Provider from "../entity/Provider";

type config = {listByProvider: string};
class MarketplaceRepository implements MarketplaceRepositoryInterface {

    private readonly api: config;

    constructor(api: config) {
        this.api = api;
    }

    findManyBy(provider: Provider): Promise<any> {
        return fetch(
            this.api.listByProvider.replace('%id%', String(provider.id))).then(r => {
            if (!r.ok) {
                throw Error(r.statusText);
            }
            return r;
        }).then(r => r.json());
    }
}

export default MarketplaceRepository;
