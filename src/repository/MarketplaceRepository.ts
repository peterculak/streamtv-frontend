import MarketplaceRepositoryInterface from "../worldfirst/Marketplace/repository/MarketplaceRepositoryInterface";
import Provider from "../worldfirst/Marketplace/entity/Provider";

type config = {
    scheme: string,
    host: string,
    version: string
};

class MarketplaceRepository implements MarketplaceRepositoryInterface {
    private readonly api: config;
    private baseUrl: string;

    constructor(api: config) {
        this.api = api;
        this.baseUrl = `${this.api.scheme}://${this.api.host}/${this.api.version}`;
    }

    findManyByProvider(provider: Provider) {
        return new Promise(function(resolve, reject) {
            resolve(JSON.stringify([{id: 1, name: 'Amazon'}]));
        });
    }
}

export default MarketplaceRepository;
