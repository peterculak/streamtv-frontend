import NotFoundException from "./NotFoundException";
import ContainerInterface from "../framework/container/ContainerInterface";
import GenericObject from "../framework/GenericObject";
import MarketplaceService from "../worldfirst/Marketplace/service/MarketplaceService";
import MarketplaceProviderService from "../worldfirst/Marketplace/service/MarketplaceProviderService";
import MarketplaceProviderRepository from "../worldfirst/Marketplace/repository/MarketplaceProviderRepository";
import MarketplaceRepository from "../worldfirst/Marketplace/repository/MarketplaceRepository";

class Container implements ContainerInterface {
    private readonly _config: GenericObject;
    private services: { [id: string]: any; } = [];

    constructor(config: GenericObject) {
        this._config = config;

        this.services['marketplace.service'] = new MarketplaceService(
            new MarketplaceRepository(this._config.marketplace.api)
        );
        this.services['marketplace.provider.service'] = new MarketplaceProviderService(
            new MarketplaceProviderRepository()
        );
    }

    get config(): GenericObject {
        return this._config;
    }

    get(id: string): Object {
        if (!this.has(id)) {
            throw NotFoundException.withId(id);
        }

        return this.services[id];
    }

    has(id: string): boolean {
        return typeof this.services[id] !== undefined;
    }
}

export default Container;
