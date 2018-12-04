import ReactAppKernel from '../../../Kernel';
import Kernel from '../../../framework/kernel/Kernel';
import Container from '../../../container';

describe('AppKernel', () => {
  it('it can be constructed without crashing', () => {
    document.body.innerHTML = '<div id="test"></div>';
    const element = document.getElementById('test')!;
    const kernel = new ReactAppKernel(element);
    expect(kernel instanceof Kernel).toEqual(true);
  });

  it('attachTo returns instance of AppKernel', () => {
    document.body.innerHTML = '<div id="test"></div>';
    const element = document.getElementById('test')!;
    const kernel = ReactAppKernel.attachTo(element);
    expect(kernel instanceof ReactAppKernel).toEqual(true);
  });

  it('boot builds DI container', () => {
    document.body.innerHTML = '<div id="test"></div>';
    const element = document.getElementById('test')!;
    const kernel = new ReactAppKernel(element);
    kernel.boot();
    expect(kernel.container instanceof Container).toEqual(true);
  });

  it('shutDown clears container', () => {
    document.body.innerHTML = '<div id="test"></div>';
    const element = document.getElementById('test')!;
    const kernel = new ReactAppKernel(element);
    kernel.boot();
    kernel.shutDown();
    expect(kernel.container).toEqual(undefined);
  });

  it('run starts react app', () => {
    document.body.innerHTML = '<div id="test"></div>';
    const element = document.getElementById('test')!;
    const kernel = new ReactAppKernel(element);
    kernel.run();
    expect(true).toEqual(true);
  });
});
