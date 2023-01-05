import { cart } from '../../pages/cart/index';
import { promo } from '../../pages/cart/promo';

export const header = document.createElement('header');
header.className = 'header';

const headerContent = document.createElement('div');
headerContent.className = 'wrapper header__wrapper';

const shopLogo = document.createElement('h1');
shopLogo.className = 'header__logo';
shopLogo.textContent = 'Online Store';

const shopLink = document.createElement('a');
shopLink.href = '/';
shopLink.className = 'header__logo-link';
shopLink.setAttribute('data-link', '');
shopLink.append(shopLogo);

const totalBlock = document.createElement('div');
totalBlock.className = 'header__total-container';
totalBlock.textContent = 'Cart total : ';

const totalSum = document.createElement('span');
totalSum.className = 'header__total-sum';

totalBlock.append(totalSum);

const cartContainer = document.createElement('div');
cartContainer.className = 'header__cart-container';

const cartLink = document.createElement('a');
cartLink.href = '/cart';
cartLink.setAttribute('data-link', '');

const cartIconHeader = document.createElement('img');
cartIconHeader.src = require('../../assets/images/shopping-cart.svg');
cartIconHeader.alt = 'cart';
cartIconHeader.className = 'card__cart-icon';
cartLink.append(cartIconHeader);
cartContainer.append(cartLink);

totalSum.textContent = `$ ${cart.getSummaryAmount()}`;
if (cart.getSummaryCount() > 0) {
    cartContainer.setAttribute('data-count', `${cart.getSummaryCount()}`);
} else {
    cartContainer.setAttribute('data-count', '');
}

headerContent.append(shopLink, totalBlock, cartContainer);
header.append(headerContent);

export function updateHeaderCartData() {
    if (promo.getPromo().length !== 0) {
        totalSum.textContent = `$ ${
            cart.getSummaryAmount() - (cart.getSummaryAmount() * promo.getSummaryDiscount()) / 100
        }`;
    } else {
        totalSum.textContent = `$ ${cart.getSummaryAmount()}`;
    }
    if (cart.getSummaryCount() > 0) {
        cartContainer.setAttribute('data-count', `${cart.getSummaryCount()}`);
    } else {
        cartContainer.setAttribute('data-count', '');
    }
}

window.addEventListener('update-cart', updateHeaderCartData);
window.addEventListener('remove-item', updateHeaderCartData);
window.addEventListener('counted-id', updateHeaderCartData);
window.addEventListener('storage', updateHeaderCartData);
