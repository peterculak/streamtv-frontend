import ReactAppKernel from '../../../Kernel';
import Kernel from '../../../framework/kernel/Kernel';
import Container from '../../../container';

describe('AppKernel', () => {
    let root: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = '<div id="test-app-root"></div>';
        root = document.getElementById('test-app-root')!;
        console.log(root.innerHTML);
    });

    it('it can be constructed without crashing', () => {
        const kernel = new ReactAppKernel(root);
        expect(kernel instanceof Kernel).toEqual(true);
    });

    it('attachTo returns instance of AppKernel', () => {
        const kernel = ReactAppKernel.attachTo(root);
        expect(kernel instanceof ReactAppKernel).toEqual(true);
    });

    it('boot builds DI container', () => {
        const kernel = new ReactAppKernel(root);
        kernel.boot();
        expect(kernel.container instanceof Container).toEqual(true);
    });

    it('shutDown clears container', () => {
        const kernel = new ReactAppKernel(root);
        kernel.boot();
        kernel.shutDown();
        expect(kernel.container).toEqual(undefined);
    });

    it('run starts react app', () => {
        const kernel = new ReactAppKernel(root);
        root = document.getElementById('test-app-root')!;
        expect(root.innerHTML.length).toBe(0);
        kernel.run();
        root = document.getElementById('test-app-root')!;
        expect(root.innerHTML.length).toBeGreaterThan(0);
    });
});
