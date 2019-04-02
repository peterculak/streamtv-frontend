import * as React from 'react';
import {render} from 'react-dom';
import Kernel from './framework/kernel/Kernel';
import config from './app/config/index';
import App from './containers/App';
// import {container} from "./app/config/ioc_config";
// import CONSTANTS from "./app/config/constants";
// import ChannelServiceInterface from "./service/ChannelServiceInterface";

class ReactAppKernel extends Kernel {
    protected readonly root: HTMLElement;

    constructor(root: HTMLElement) {
        super();
        this.root = root;
    }

    static attachTo(root: HTMLElement): ReactAppKernel {
        return new this(root);
    }

    run(): void {
        this.boot();
        render(<App />, this.root);
    }

    protected initializeContainer(): void {
        // this._container = container;
    }

    protected loadConfig(): void {
        this.config = config;
    }
}

export default ReactAppKernel;
