import { header } from '../components/header/header';

function render(idTag: string, content: string) {
    const app = document.getElementById(idTag);
    if (app) {
        app.innerHTML = '';
        app.innerHTML = content;
        app.prepend(header);
    } else {
        throw new Error(`Not found ${idTag}`);
    }
}
export default render;
