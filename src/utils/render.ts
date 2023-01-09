function render(idTag: string, content: string | Node) {
    const app = document.getElementById(idTag);
    if (app) {
        app.innerHTML = '';
        if (typeof content === 'string') {
            app.innerHTML = content;
        } else {
            app.append(content);
        }
    } else {
        throw new Error(`Not found ${idTag}`);
    }
}
export default render;
