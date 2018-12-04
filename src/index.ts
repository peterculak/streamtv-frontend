import ReactAppKernel from './Kernel';
import dotenv from 'dotenv';
dotenv.load();

const element = document.getElementById('mkpid-app');
if (element) {
    ReactAppKernel.attachTo(element).run();
}
