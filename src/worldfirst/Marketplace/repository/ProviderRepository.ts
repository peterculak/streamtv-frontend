import ProviderRepositoryInterface from "./ProviderRepositoryInterface";
import Provider from "../entity/Provider";
import ProviderObjectLiteral from "../DataStructures/Provider";
import ProviderRepositoryException from "./ProviderRepositoryException";

type config = {
    scheme: string,
    host: string,
    version: string
};

class ProviderRepository implements ProviderRepositoryInterface {
    private readonly api: config;
    private baseUrl: string;

    private readonly providers: Array<ProviderObjectLiteral> = [
        {id: 1, name: 'Amazon'}
    ];

    constructor(api: config) {
        this.api = api;
        this.baseUrl = `${this.api.scheme}://${this.api.host}/${this.api.version}`;
    }

    getMarketplaces(provider: Provider): Promise<[]> {
        const url = `${this.baseUrl}/provider/${String(provider.id)}/marketplaces`;
        return fetch(url).then(r => {
            if (!r.ok) {
                return JSON.parse('[]');
            }
            return r;
        }).then(r => r.json());
    }

    findOneByName(name: string): Provider {
        const providerData = this.providers.find(item => {
            return item.name.toLowerCase() == name.toLowerCase();
        });

        if (!providerData) {
            throw ProviderRepositoryException.notFoundWithName(name);
        }

        return Provider.fromObjectLiteral(providerData);
    }
}

export default ProviderRepository;
