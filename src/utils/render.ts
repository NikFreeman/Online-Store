function render(idTag: string, content: string) {
    const app = document.getElementById(idTag);
    if (app) {
        app.innerHTML = '';
        app.innerHTML = content;
    } else {
        throw new Error(`Not found ${idTag}`);
    }
}
export default render;
