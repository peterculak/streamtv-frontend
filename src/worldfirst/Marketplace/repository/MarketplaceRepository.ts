import MarketplaceRepositoryInterface from "./MarketplaceRepositoryInterface";
import Provider from "../entity/Provider";

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

    findManyByProvider(provider: Provider): Promise<[]> {
        const url = `${this.baseUrl}/provider/${String(provider.id)}/marketplaces`;
        return fetch(url).then(r => {
            if (!r.ok) {
                return JSON.parse('[]');
            }
            return r;
        }).then(r => r.json());
    }
}

export default MarketplaceRepository;
