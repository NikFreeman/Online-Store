import { ProductList, Product, GroupeBy } from '../../models/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/icons/shopping-cart.svg');

export async function getList() {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data: ProductList = await res.json();
    return data;
}

const main: HTMLElement = document.createElement('main');
main.className = 'wrapper';
document.body.append(main);

const filtersContainer: HTMLElement = document.createElement('div');
filtersContainer.className = 'filter';

const filterBrand: HTMLElement = document.createElement('div');
filterBrand.className = 'filter__brand';
const brandHeader: HTMLElement = document.createElement('div');
brandHeader.className = 'filter__brand-header';
brandHeader.textContent = 'Brand';
const brandList: HTMLElement = document.createElement('div');
brandList.className = 'filter__list';

const filterCategory: HTMLElement = document.createElement('div');
filterCategory.className = 'filter__category';
const categoryHeader: HTMLElement = document.createElement('div');
categoryHeader.className = 'filter__category-header';
categoryHeader.textContent = 'Category';
const categoryList: HTMLElement = document.createElement('div');
categoryList.className = 'filter__list';

filtersContainer.append(filterBrand, filterCategory);
filterBrand.append(brandHeader, brandList);
filterCategory.append(categoryHeader, categoryList);

export function groupeByBrand(data: Product[]): GroupeBy {
    const groupedBy: GroupeBy = {};
    for (const item of data) {
        if (groupedBy[item.brand.toUpperCase()]) {
            groupedBy[item.brand.toUpperCase()].push(item);
        } else {
            groupedBy[item.brand.toUpperCase()] = [item];
        }
    }
    return groupedBy;
}

export function groupeByCategory(data: Product[]): GroupeBy {
    const groupedBy: GroupeBy = {};
    for (const item of data) {
        if (groupedBy[item.category.toLowerCase()]) {
            groupedBy[item.category.toLowerCase()].push(item);
        } else {
            groupedBy[item.category.toLowerCase()] = [item];
        }
    }
    return groupedBy;
}

const checkboxes: HTMLInputElement[] = [];

export function fillBrandList(data: GroupeBy) {
    if (!brandList.firstElementChild) {
        for (const brand in data) {
            const checkboxCont: HTMLElement = document.createElement('div');
            checkboxCont.className = 'checkbox-line';
            const checkboxIn: HTMLInputElement = document.createElement('input');
            checkboxIn.type = 'checkbox';
            checkboxIn.id = `${brand}`;
            checkboxes.push(checkboxIn);
            const checkboxLbl: HTMLLabelElement = document.createElement('label');
            checkboxLbl.htmlFor = checkboxIn.id;
            checkboxLbl.textContent = `${brand}`;
            const count: HTMLElement = document.createElement('span');
            count.className = 'brand-count';
            count.textContent = `(${data[brand].length})`;
            checkboxCont.append(checkboxIn, checkboxLbl, count);
            brandList.append(checkboxCont);
        }
    }
    return data;
}

function fillCategoryList(data: GroupeBy) {
    if (!categoryList.firstElementChild) {
        for (const category in data) {
            const checkboxCont: HTMLElement = document.createElement('div');
            checkboxCont.className = 'checkbox-line';
            const checkboxIn: HTMLInputElement = document.createElement('input');
            checkboxIn.type = 'checkbox';
            checkboxIn.id = `${category}`;
            checkboxes.push(checkboxIn);
            const checkboxLbl: HTMLLabelElement = document.createElement('label');
            checkboxLbl.htmlFor = checkboxIn.id;
            checkboxLbl.textContent = `${category}`;
            const count: HTMLElement = document.createElement('span');
            count.className = 'brand-count';
            count.textContent = `(${data[category].length})`;
            checkboxCont.append(checkboxIn, checkboxLbl, count);
            categoryList.append(checkboxCont);
        }
    }
    return data;
}

export function start() {
    getList()
        .then((data) => groupeByBrand(data.products))
        .then((data) => fillBrandList(data))
        .then((data) => getCheckedItems(data));
    // .then((data) => createCards(data));
    getList()
        .then((data) => groupeByCategory(data.products))
        .then((data) => fillCategoryList(data))
        .then((data) => getCheckedItems(data));
}

let cardListOfCheckedCheckboxes: HTMLInputElement[] = checkboxes;

export function getCheckedItems(data: GroupeBy) {
    cardListOfCheckedCheckboxes =
        checkboxes.filter((input) => input.checked).length > 0
            ? checkboxes.filter((input) => input.checked)
            : checkboxes;
    cardsBlock.innerHTML = '';
    for (const key in data) {
        if (cardListOfCheckedCheckboxes.some((el) => el.id === key)) {
            createCards(data[key]);
        }
    }
}

brandList.addEventListener('change', start);
categoryList.addEventListener('change', start);

const cardsBlock: HTMLElement = document.createElement('div');
cardsBlock.className = 'cards';

export function createCards(data: Product[]) {
    data.map((item) => {
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
        cartIcon.src = logo;
        cartIcon.alt = 'cart';
        cartIcon.className = 'card__cart-icon';
        addBtn.append(cartIcon);
        const detailsBtn: HTMLElement = document.createElement('button');
        detailsBtn.className = 'card__detail-btn';
        detailsBtn.textContent = 'details';
        btnsWrapper.append(addBtn, detailsBtn);
        card.append(discount, title, cardImg, price, btnsWrapper);
        cardsBlock.append(card);
    });
}

main.append(filtersContainer, cardsBlock);
