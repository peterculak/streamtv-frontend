import ReactAppKernel from './Kernel';

const element = document.getElementById('mkpid-app');
if (element) {
    ReactAppKernel.attachTo(element).run();
}
