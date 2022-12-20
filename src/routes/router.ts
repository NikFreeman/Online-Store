import page404 from '../pages/page404';
import testPage from '../pages/testPage';
import render from '../utils/render';

const routes = new Map();
routes.set('/', testPage);
routes.set('/product', testPage);
routes.set('/product-detail/:id', testPage);

function routerHandler() {
    const pathname = window.location.pathname;
    console.log(window.location);
    if (routes.has(pathname)) {
        render('App', routes.get(pathname)());
    } else {
        render('App', page404()); // not implementation
    }
}
function router() {
    window.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e);
        const tempTarget = <HTMLElement>e.target;
        if (tempTarget.hasAttribute('data-link')) {
            history.pushState('', '', window.location.origin + tempTarget.getAttribute('href'));
            routerHandler();
        }
    });
    window.addEventListener('popstate', routerHandler);
    window.addEventListener('DOMContentLoaded', routerHandler);
}

export default router;
