import page404 from '../pages/page404';
import testPage from '../pages/testPage';
import render from '../utils/render';

const routes = new Map();
routes.set('/', page404);
routes.set('/product', testPage);

function router() {
    const pathname = window.location.pathname;
    if (routes.has(pathname)) {
        render('App', routes.get(pathname)());
    } else {
        render('App', page404()); // not implementation
    }
}

export default router;
