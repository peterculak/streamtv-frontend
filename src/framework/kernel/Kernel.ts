import KernelInterface from "./KernelInterface";

abstract class Kernel implements KernelInterface {
    protected booted: boolean = false;
    protected _container: any;
    protected config: Object = {};

    get container(): any {
        return this._container;
    }

    public boot(): void {
        if (!this.booted) {
            this.loadConfig();
            this.initializeContainer();
            this.booted = true;
        }
    }

    public shutDown(): void {
        this.booted = false;
        this._container = undefined;
    }

    abstract run(): void;

    protected abstract loadConfig(): void;

    protected abstract initializeContainer(): void;
}

export default Kernel;
