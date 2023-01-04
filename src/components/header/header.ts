import { cart } from '../../pages/cart/index';
import { routerHandler } from '../../routes/router';

export const header = document.createElement('header');
header.className = 'header';

const headerContent = document.createElement('div');
headerContent.className = 'wrapper header__wrapper';

const shopLogo = document.createElement('h1');
shopLogo.className = 'header__logo';
shopLogo.textContent = 'Online Store';

const totalBlock = document.createElement('div');
totalBlock.className = 'header__total-container';
totalBlock.textContent = 'Cart total : ';

const totalSum = document.createElement('span');
totalSum.className = 'header__total-sum';

totalBlock.append(totalSum);

const cartContainer = document.createElement('div');
cartContainer.className = 'header__cart-container';

const cartIconHeader = document.createElement('img');
cartIconHeader.src = require('../../assets/images/shopping-cart.svg');
cartIconHeader.alt = 'cart';
cartIconHeader.className = 'card__cart-icon';
cartContainer.append(cartIconHeader);

totalSum.textContent = `$ ${cart.getSummaryAmount()}`;
if (cart.getSummaryCount() > 0) {
    cartContainer.setAttribute('data-count', `${cart.getSummaryCount()}`);
} else {
    cartContainer.setAttribute('data-count', '');
}

headerContent.append(shopLogo, totalBlock, cartContainer);
header.append(headerContent);

export function updateHeaderCartData() {
    totalSum.textContent = `$ ${cart.getSummaryAmount()}`;
    if (cart.getSummaryCount() > 0) {
        cartContainer.setAttribute('data-count', `${cart.getSummaryCount()}`);
    } else {
        cartContainer.setAttribute('data-count', '');
    }
}

cartContainer.addEventListener('click', () => {
    history.pushState({}, '', '/cart');
    routerHandler();
});
shopLogo.addEventListener('click', () => {
    history.pushState({}, '', '/');
    routerHandler();
});

window.addEventListener('storage', updateHeaderCartData);
