import ReactAppKernel from './Kernel';

const element = document.getElementById('app');
if (element) {
    ReactAppKernel.attachTo(element).run();
}
