import page404 from '../pages/page404';
import testPage from '../pages/testPage';
import testPageDetail from '../pages/testPage-details';
import render from '../utils/render';
import { start } from '../pages/products/products';

const mountedTag = 'App';
const routes = new Map();

routes.set('/', testPage);
routes.set('/product', testPage);
routes.set('/product-detail/:id', testPageDetail);

function routerHandler(): void {
    const routePath = parsePathName(window.location.pathname);
    if (routePath && routePath.routePath === '/') {
        start();
    } else if (routePath) {
        render(mountedTag, routes.get(routePath.routePath)(routePath.param));
    } else {
        render(mountedTag, page404());
    }
}

function parsePathName(pathname: string): false | { routePath: string; param: string | null } {
    const arr = pathname.split('/');
    for (const keyRoute of routes.keys()) {
        const tempKey = keyRoute.split('/');
        if (arr[1] === tempKey[1]) {
            if (tempKey.length === 3) {
                return { routePath: keyRoute, param: arr[2] };
            } else {
                return { routePath: keyRoute, param: null };
            }
        }
    }
    return false;
}

function router(): void {
    window.addEventListener('click', (e) => {
        // e.preventDefault();
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
