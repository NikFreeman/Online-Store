import './testPage-detail.scss';

function r_testPageDetail(id: string) {
    const fragment = `<div class="top">
                          <h1>Product ${id}</h1>
                          <h3>Product is loaded</h3>
                        </div>`;
    return fragment;
}

export default r_testPageDetail;
