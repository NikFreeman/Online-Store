import page404 from '../pages/page404';
import r_testPage from '../pages/testPage';
// import r_testPageDetail from '../pages/testPage-details';
import render from '../utils/render';
import { start } from '../pages/products/products';
import pageCart from '../pages/cart';
import { pageDetails } from '../pages/details/details';

const mountedTag = 'App';
const routes = new Map();

routes.set('/', start);
routes.set('/product', r_testPage);
routes.set('/product-detail/:id', pageDetails);
routes.set('/cart', pageCart);

export function routerHandler(): void {
    const routePath = parsePathName(window.location.pathname);

    if (routePath) {
        const name = String(routes.get(routePath.routePath).name);
        if (name.substring(0, 2) === 'r_') {
            render(mountedTag, routes.get(routePath.routePath)(routePath.param));
        } else {
            routes.get(routePath.routePath)(routePath.param);
        }
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
        const tempTarget = <HTMLElement>e.target;
        const itemLink = tempTarget.closest('a');
        if (itemLink) {
            if (itemLink.hasAttribute('data-link')) {
                e.preventDefault();
                history.pushState('', '', window.location.origin + itemLink.getAttribute('href'));
                routerHandler();
            }
        }
    });
    window.addEventListener('popstate', routerHandler);
    window.addEventListener('DOMContentLoaded', routerHandler);
}

export default router;
