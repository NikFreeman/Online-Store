import { ProductsController } from '../../components/controller/productsController';
import { Product } from '../../models/types';
import { logo } from '../products/cards';
import { cart } from '../cart/index';

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

const productTitle = document.createElement('h3');
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

const mask = document.createElement('div');
mask.className = 'details__mask loader';

const descriptionsBlock = document.createElement('div');
descriptionsBlock.className = 'details__descriptions-block';

const description = document.createElement('div');

const discount = document.createElement('div');

const rating = document.createElement('div');

const stock = document.createElement('div');

const brand = document.createElement('div');

const category = document.createElement('div');

const price = document.createElement('div');

enum Descriptions {
    description,
    discount,
    rating,
    stock,
    brand,
    category,
    price,
}

descriptionsBlock.append(description, discount, rating, stock, brand, category, price);
let i = 0;
for (const element of descriptionsBlock.children) {
    element.className = `details__description description-${Descriptions[i]}`;
    const firstChild = document.createElement('div');
    firstChild.className = `description-title title-of-${Descriptions[i]}`;
    firstChild.textContent = `${Descriptions[i]}:`;
    if (firstChild.textContent === 'discount') {
        firstChild.textContent = 'discount percentage:';
    }
    const secondChild = document.createElement('div');
    secondChild.className = `description-text text-of-${Descriptions[i]}`;
    element.append(firstChild, secondChild);
    i++;
}

const bottomBlock = document.createElement('div');
bottomBlock.className = 'details__bottom';

const addBtn = document.createElement('button');
addBtn.className = 'card__add-btn details__btn';

const iconContainer = document.createElement('div');
iconContainer.className = 'card__icon-cont';

const cartIcon = document.createElement('img');
cartIcon.src = logo;
cartIcon.alt = 'cart';
cartIcon.className = 'card__cart-icon';

const cartText = document.createElement('span');
cartText.className = 'add-to-cart';

const buyBtn = document.createElement('a');
buyBtn.className = 'card__detail-btn details__btn';
buyBtn.href = '/cart';
buyBtn.textContent = 'buy now';

iconContainer.append(cartIcon);
addBtn.append(iconContainer, cartText);
bottomBlock.append(addBtn, buyBtn);

productBlock.append(productTitle, productDetails, imageSmallBlock, bottomBlock);
productDetails.append(imagesBlock, descriptionsBlock);
imagesBlock.append(imageLargeBlock);
imageLargeBlock.append(mask);
let currentProduct: Product;

export function pageDetails() {
    const app = document.getElementById('App');
    if (app) {
        app.innerHTML = '';
        app.append(wrapper);
    }
    imageLarge.remove();
    const productId = Number(window.location.href.split('/').pop());
    if (productId > 100 || productId < 1 || !productId) {
        breadcrumbsBlock.innerHTML = `Product id "${window.location.href.split('/').pop()}" not found`;
        productBlock.innerHTML = '';
        return;
    }
    const product = ProductsController.getProductDetails(productId);
    product.then(function (result) {
        currentProduct = result;
        breadcrumbCategory.textContent = result.category;
        breadcrumbBrand.textContent = result.brand;
        breadcrumbTitle.textContent = result.title;
        productTitle.textContent = result.title;
        imageLarge.src = result.thumbnail;
        imageLarge.onload = function () {
            mask.remove();
            imageLargeBlock.append(imageLarge);
        };
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
        imageSmallBlock.innerHTML = '';
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
        (description.lastElementChild as HTMLDivElement).textContent = result.description;
        (discount.lastElementChild as HTMLDivElement).textContent = result.discountPercentage.toString();
        (rating.lastElementChild as HTMLDivElement).textContent = result.rating.toString();
        (stock.lastElementChild as HTMLDivElement).textContent = result.stock.toString();
        (brand.lastElementChild as HTMLDivElement).textContent = result.brand;
        (category.lastElementChild as HTMLDivElement).textContent = result.category;
        (price.lastElementChild as HTMLDivElement).textContent = `$ ${result.price}`;
        const prodInCart = cart.getCart().find((cartItem) => cartItem.id === result.id);
        if (prodInCart) {
            cartText.textContent = 'remove';
            iconContainer.setAttribute('data-count', `${prodInCart.count}`);
        } else {
            cartText.textContent = 'add';
        }
    });
}

function actionAddToCartButton() {
    if (addBtn && addBtn.lastElementChild && addBtn.firstElementChild) {
        if (addBtn.lastElementChild.textContent === 'remove') {
            cart.removeProduct(currentProduct.id);
            addBtn.lastElementChild.textContent = 'add';
            addBtn.firstElementChild.setAttribute('data-count', '');
        } else {
            cart.addProduct(currentProduct.id, 1, currentProduct.price);
            addBtn.lastElementChild.textContent = 'remove';
            addBtn.firstElementChild.setAttribute('data-count', '1');
        }
        const eventUpdate = new CustomEvent('update-cart', { bubbles: true });
        addBtn.dispatchEvent(eventUpdate);
    }
}

addBtn.addEventListener('click', actionAddToCartButton);

function switchMainImage(e: Event) {
    if (e.target instanceof HTMLImageElement) {
        if (!e.target.classList.contains('image__active') && e.target.parentElement) {
            imageLarge.src = e.target.src;
            for (const imageElement of e.target.parentElement.children) {
                imageElement.classList.remove('image__active');
            }
            e.target.classList.add('image__active');
        }
    }
}

imageSmallBlock.addEventListener('click', switchMainImage);

function actionBuyNowButton() {
    if (addBtn && addBtn.lastElementChild && addBtn.firstElementChild) {
        if (addBtn.lastElementChild.textContent === 'add') {
            cart.addProduct(currentProduct.id, 1, currentProduct.price);
            addBtn.lastElementChild.textContent = 'remove';
            addBtn.firstElementChild.setAttribute('data-count', '1');
        }
        const eventUpdate = new CustomEvent('update-cart', { bubbles: true });
        addBtn.dispatchEvent(eventUpdate);
    }
}

buyBtn.addEventListener('click', actionBuyNowButton);
