import { ProductList } from '../utils/types';
// import src from './products';

export async function getList() {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data: ProductList = await res.json();
    return data;
}

const main: HTMLElement = document.createElement('main');
main.className = 'wrapper';
document.body.append(main);

const cardsBlock: HTMLElement = document.createElement('div');
cardsBlock.className = 'cards';

export function createCards(data: ProductList) {
    data.products.map((item) => {
        const card: HTMLElement = document.createElement('div');
        card.className = 'card';
        const discount: HTMLElement = document.createElement('div');
        discount.className = 'card__discount';
        discount.textContent = `-${item.discountPercentage.toString()}%`;
        const title: HTMLElement = document.createElement('div');
        title.className = 'card__title';
        title.textContent = item.title;
        const cardImg: HTMLElement = document.createElement('div');
        cardImg.className = 'card__image';
        cardImg.style.backgroundImage = `url(${item.thumbnail})`;
        const price: HTMLElement = document.createElement('div');
        price.className = 'card__price';
        price.textContent = `$ ${item.price.toString()}`;
        const btnsWrapper: HTMLElement = document.createElement('div');
        btnsWrapper.className = 'card__btns';
        const addBtn: HTMLElement = document.createElement('button');
        addBtn.className = 'card__add-btn';
        const cartIcon: HTMLImageElement = document.createElement('img');
        cartIcon.src = '../assets/icons/shopping-cart.svg';
        cartIcon.alt = 'cart';
        cartIcon.className = 'card__cart-icon';
        addBtn.append(cartIcon);
        const detailsBtn: HTMLElement = document.createElement('button');
        detailsBtn.className = 'card__detail-btn';
        detailsBtn.textContent = 'add to cart';
        btnsWrapper.append(addBtn, detailsBtn);
        card.append(discount, title, cardImg, price, btnsWrapper);
        cardsBlock.append(card);
    });
}

main.append(cardsBlock);
