import './page404.scss';

export default function page404(): string {
    const fragment = `<div class="top">
                          <h1>404</h1>
                          <h3>page not found</h3>
                        </div>`;
    return fragment;
}
