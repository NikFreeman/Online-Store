import { ProductList, Product, GroupeBy } from '../../models/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/icons/shopping-cart.svg');

let products: Product[] = [];
export async function getList() {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data: ProductList = await res.json();
    return data;
}

export function getProductsList(data: ProductList) {
    products = data.products;
    return data.products;
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

const groupedByBrand: GroupeBy = {};
export function groupeByBrand(data: Product[]): GroupeBy {
    // const groupedBy: GroupeBy = {};
    for (const item of data) {
        if (groupedByBrand[item.brand.toUpperCase()]) {
            groupedByBrand[item.brand.toUpperCase()].push(item);
        } else {
            groupedByBrand[item.brand.toUpperCase()] = [item];
        }
    }
    return groupedByBrand;
}

const groupedByCategory: GroupeBy = {};
export function groupeByCategory(data: Product[]): GroupeBy {
    for (const item of data) {
        if (groupedByCategory[item.category.toLowerCase()]) {
            groupedByCategory[item.category.toLowerCase()].push(item);
        } else {
            groupedByCategory[item.category.toLowerCase()] = [item];
        }
    }
    return groupedByCategory;
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

export async function start() {
    await getList().then(getProductsList);
    fillBrandList(groupeByBrand(products));
    fillCategoryList(groupeByCategory(products));
    createCards(products);
}

let cardListOfCheckedCheckboxes: HTMLInputElement[] = checkboxes;

export function getCheckedItems() {
    cardListOfCheckedCheckboxes =
        checkboxes.filter((input) => input.checked).length > 0
            ? checkboxes.filter((input) => input.checked)
            : checkboxes;
    cardsBlock.innerHTML = '';
    for (const key in groupedByCategory) {
        if (cardListOfCheckedCheckboxes.some((el) => el.id === key)) {
            createCards(groupedByCategory[key]);
        }
    }
    for (const key in groupedByBrand) {
        if (cardListOfCheckedCheckboxes.some((el) => el.id === key)) {
            createCards(groupedByBrand[key]);
        }
    }
}

brandList.addEventListener('change', getCheckedItems);
categoryList.addEventListener('change', getCheckedItems);

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
