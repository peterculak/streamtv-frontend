import NotFoundException from "./NotFoundException";
import ContainerInterface from "../framework/container/ContainerInterface";
import GenericObject from "../framework/GenericObject";

class Container implements ContainerInterface {
    private readonly _config: GenericObject;
    private services: { [id: string]: any; } = [];

    constructor(config: GenericObject) {
        this._config = config;

        //this.services['provider.service'] =
    }

    get config(): GenericObject {
        return this._config;
    }

    get(id: string): any {
        if (!this.has(id)) {
            throw NotFoundException.withId(id);
        }

        return this.services[id];
    }

    has(id: string): boolean {
        return this.services[id] !== undefined;
    }
}

export default Container;
