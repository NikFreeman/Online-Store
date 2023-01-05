import { ProductsController } from '../../components/controller/productsController';

const wrapper = document.createElement('div');
wrapper.className = 'wrapper details__wrapper';

const breadcrumbsBlock = document.createElement('div');
breadcrumbsBlock.className = 'details__breadcrumbs breadcrumbs';

const storeLink = document.createElement('a');
storeLink.className = 'breadcrumbs__store-link breadcrumbs__item';
storeLink.href = '/';
storeLink.textContent = 'store';
storeLink.setAttribute('data-link', '');

const breadcrumbCategory = document.createElement('span');
breadcrumbCategory.className = 'breadcrumbs__item';

const breadcrumbBrand = document.createElement('span');
breadcrumbBrand.className = 'breadcrumbs__item';

const breadcrumbTitle = document.createElement('span');
breadcrumbTitle.className = 'breadcrumbs__item';

breadcrumbsBlock.append(storeLink, '>', breadcrumbCategory, '>', breadcrumbBrand, '>', breadcrumbTitle);

const productBlock = document.createElement('div');
productBlock.className = 'details__product-block product';
wrapper.append(breadcrumbsBlock, productBlock);

const productTitle = document.createElement('div');
productTitle.className = 'details__title product__title';

const productDetails = document.createElement('div');
productDetails.className = 'details__details product__details';

const imagesBlock = document.createElement('div');
imagesBlock.className = 'details__images-block';

const imageLargeBlock = document.createElement('div');
imageLargeBlock.className = 'product__image-main';

const imageSmallBlock = document.createElement('div');
imageSmallBlock.className = 'product__images';

const imageLarge = document.createElement('img');
imageLarge.className = 'product__image image__large';
imageLarge.alt = 'product';

const descriptionsBlock = document.createElement('div');
descriptionsBlock.className = 'details__descriptions-block';

const description = document.createElement('div');
description.className = 'details__description';

const discount = document.createElement('div');
discount.className = 'details__description';

const rating = document.createElement('div');
rating.className = 'details__description';

const stock = document.createElement('div');
stock.className = 'details__description';

const brand = document.createElement('div');
brand.className = 'details__description';

const category = document.createElement('div');
category.className = 'details__description';

descriptionsBlock.append(description, discount, rating, stock, brand, category);

productBlock.append(productTitle, productDetails);
productDetails.append(imagesBlock, descriptionsBlock);
imagesBlock.append(imageLargeBlock, imageSmallBlock);
imageLargeBlock.append(imageLarge);

export function pageDetails() {
    const app = document.getElementById('App');
    if (app) {
        app.innerHTML = '';
        app.append(wrapper);
    }
    const productId = Number(window.location.href.split('/').pop());
    if (productId > 100 || productId < 1 || !productId) {
        breadcrumbsBlock.innerHTML = `Product id "${window.location.href.split('/').pop()}" not found`;
        productBlock.innerHTML = '';
        return;
    }
    const product = ProductsController.getProductDetails(productId);
    product.then(function (result) {
        breadcrumbCategory.textContent = result.category;
        breadcrumbBrand.textContent = result.brand;
        breadcrumbTitle.textContent = result.title;
        productTitle.textContent = result.title;
        imageLarge.src = result.thumbnail;
        let bigImageSize: string | null = '';
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', result.thumbnail, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.getResponseHeader('Content-Length')) {
                        bigImageSize = xhr.getResponseHeader('Content-Length');
                    }
                }
            }
        };
        xhr.send(null);
        const sizes: (string | null)[] = [];
        result.images.forEach((image) => {
            const imageSmall = document.createElement('img');
            imageSmall.className = 'product__image image__small';
            imageSmall.alt = 'product';
            imageSmall.src = image;
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', image, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        const smallImageSize = xhr.getResponseHeader('Content-Length');
                        if (smallImageSize && !sizes.includes(smallImageSize)) {
                            sizes.push(smallImageSize);
                            imageSmallBlock.append(imageSmall);
                            if (bigImageSize === smallImageSize) {
                                imageSmall.classList.add('image__active');
                            }
                        }
                    }
                }
            };
            xhr.send(null);
        });
        console.log(result);
    });
}
