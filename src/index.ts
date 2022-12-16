import './styles/index.css';
import 'normalize.css';
import router from './routes/router';

window.addEventListener('click', (e) => {
    const tempTarget = <HTMLElement>e.target;
    if (tempTarget.hasAttribute('data-link')) {
        history.pushState('', '', window.location.origin + tempTarget.getAttribute('href'));
        router();
    }
    e.preventDefault();
});
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);
