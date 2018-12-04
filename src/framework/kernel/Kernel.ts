import KernelInterface from "./KernelInterface";
import ContainerInterface from "../container/ContainerInterface";

abstract class Kernel implements KernelInterface {
    protected booted: boolean = false;
    protected _container!: ContainerInterface | undefined;
    protected config: Object = {};

    get container(): ContainerInterface {
        return this._container!;
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
