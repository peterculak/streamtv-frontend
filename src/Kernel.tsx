import * as React from 'react';
import {render} from 'react-dom';
import Kernel from './framework/kernel/Kernel';
import config from './app/config/index';
import App from './containers/App';
import Container from './container/index';

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
        console.log(this.root);
        // render(<App container={this.container}/>, this.root);
    }

    protected initializeContainer(): void {
        this._container = new Container(this.config);
    }

    protected loadConfig(): void {
        this.config = config;
    }
}

export default ReactAppKernel;
