import { Product } from '../../models/types';
import { cardsBlock, foundProducts } from './products';
import { sortItems } from './settings';

const logo = require('../../assets/images/shopping-cart.svg');

export function createCards(data: Product[]) {
    cardsBlock.innerHTML = '';
    sortItems(data).map((item) => {
        const card = document.createElement('div');
        card.className = 'card';

        const discount = document.createElement('div');
        discount.className = 'card__discount';
        discount.textContent = `-${item.discountPercentage.toString()}%`;

        const title = document.createElement('div');
        title.className = 'card__title';
        title.textContent = item.title;

        const cardImg = document.createElement('div');
        cardImg.className = 'card__image';
        cardImg.style.backgroundImage = `url(${item.thumbnail})`;

        const price = document.createElement('div');
        price.className = 'card__price';
        price.textContent = `$ ${item.price.toString()}`;

        const btnsWrapper = document.createElement('div');
        btnsWrapper.className = 'card__btns';

        const addBtn = document.createElement('button');
        addBtn.className = 'card__add-btn card__btn';

        const cartIcon = document.createElement('img');
        cartIcon.src = logo;
        cartIcon.alt = 'cart';
        cartIcon.className = 'card__cart-icon';

        const cartText = document.createElement('span');
        cartText.className = 'add-to-cart';
        cartText.textContent = 'add';
        addBtn.append(cartIcon, cartText);

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'card__detail-btn card__btn';
        detailsBtn.textContent = 'details';

        btnsWrapper.append(addBtn, detailsBtn);
        card.append(discount, title, cardImg, price, btnsWrapper);
        cardsBlock.append(card);
    });
    foundProducts.textContent = `Found: ${data.length}`;
    if (cardsBlock.innerHTML === '') {
        cardsBlock.innerHTML = '<span class="cards-text">No products found</span>';
    }
}
