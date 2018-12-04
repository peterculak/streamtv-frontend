import Provider from "../entity/Provider";
import ProviderObjectLiteral from "../DataStructures/Provider";
import MarketplaceProviderRepositoryInterface from "./MarketplaceProviderRepositoryInterface";

class MarketplaceProviderRepository implements MarketplaceProviderRepositoryInterface {

    private readonly providers: Array<ProviderObjectLiteral> = [
        {id: 1, name: 'Amazon'}
    ];

    findOneByName(name: string): Provider {
        const providerData = this.providers.find(item => {
            return item.name.toLowerCase() == name.toLowerCase();
        });

        if (!providerData) {
            throw new Error(`No provider found for '${name}'`);
        }

        return Provider.fromObjectLiteral(providerData);
    }
}

export default MarketplaceProviderRepository;
