import './styles/index.css';
import router from './routes/router';

window.addEventListener('click', (e) => {
    const tt = <HTMLElement>e.target;
    if (tt.hasAttribute('data-link')) {
        history.pushState('', '', window.location.origin + tt.getAttribute('href'));
        router();
    }
    e.preventDefault();
});
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);
