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

const sortAndSettings: HTMLElement = document.createElement('div');
sortAndSettings.className = 'settings';

const sortMethods: string[] = ['PriceUp', 'PriceDown', 'RatingUp', 'RatingDown'];

let sortBtn: HTMLInputElement = document.createElement('input');
let labelForSort: HTMLLabelElement = document.createElement('label');
for (let i = 0; i < sortMethods.length; i++) {
    sortBtn = document.createElement('input');
    sortBtn.type = 'radio';
    sortBtn.name = 'radio';
    sortBtn.id = `sort-${i + 1}`;
    sortBtn.value = sortMethods[i];
    labelForSort = document.createElement('label');
    labelForSort.htmlFor = sortBtn.id;
    labelForSort.className = `sort-control sort-control__${i + 1}`;
    labelForSort.textContent = `${sortMethods[i]}`;
    sortAndSettings.append(sortBtn, labelForSort);
}

function sortItems(data: Product[]) {
    const sortMethod: string | undefined = sortAndSettings.querySelector('input:checked')?.id;
    switch (sortMethod) {
        case 'sort-1':
            return data.sort((a, b) => a.price - b.price);
        case 'sort-2':
            return data.sort((a, b) => b.price - a.price);
        case 'sort-3':
            return data.sort((a, b) => a.rating - b.rating);
        case 'sort-4':
            return data.sort((a, b) => b.rating - a.rating);
        default:
            return data;
    }
}

const groupedByBrand: GroupeBy = {};
function groupeByBrand(data: Product[]): GroupeBy {
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
function groupeByCategory(data: Product[]): GroupeBy {
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
const checkboxesBrand: HTMLInputElement[] = [];
const checkboxesCategory: HTMLInputElement[] = [];

function fillBrandList(data: GroupeBy) {
    if (!brandList.firstElementChild) {
        for (const brand in data) {
            const checkboxCont: HTMLElement = document.createElement('div');
            checkboxCont.className = 'checkbox-line';
            const checkboxIn: HTMLInputElement = document.createElement('input');
            checkboxIn.type = 'checkbox';
            checkboxIn.id = `${brand}`;
            checkboxIn.className = 'checkbox';
            checkboxes.push(checkboxIn);
            checkboxesBrand.push(checkboxIn);
            const checkboxLbl: HTMLLabelElement = document.createElement('label');
            checkboxLbl.htmlFor = checkboxIn.id;
            checkboxLbl.textContent = `${brand}`;
            checkboxLbl.className = 'label';
            const checkmark: HTMLElement = document.createElement('span');
            checkmark.className = 'checkmark';
            checkboxLbl.append(checkmark);
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
            checkboxIn.className = 'checkbox';
            checkboxes.push(checkboxIn);
            checkboxesCategory.push(checkboxIn);
            const checkboxLbl: HTMLLabelElement = document.createElement('label');
            checkboxLbl.htmlFor = checkboxIn.id;
            checkboxLbl.textContent = `${category}`;
            checkboxLbl.className = 'label';
            const checkmark: HTMLElement = document.createElement('span');
            checkmark.className = 'checkmark';
            checkboxLbl.append(checkmark);
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

let listOfCheckedCheckboxes: HTMLInputElement[][] = [checkboxesBrand, checkboxesCategory];

function getCheckedItems() {
    // cardsBlock.innerHTML = '';
    listOfCheckedCheckboxes = [checkboxesBrand, checkboxesCategory];
    if (checkboxes.filter((input) => input.checked).length > 0) {
        if (checkboxesBrand.filter((input) => input.checked).length > 0) {
            listOfCheckedCheckboxes[0] = checkboxesBrand.filter((input) => input.checked);
        }
        if (checkboxesCategory.filter((input) => input.checked).length > 0) {
            listOfCheckedCheckboxes[1] = checkboxesCategory.filter((input) => input.checked);
        }
        const prodList: Product[] = products.filter((item) => {
            return (
                listOfCheckedCheckboxes[0].map((el) => el.id).includes(item.brand.toUpperCase()) &&
                listOfCheckedCheckboxes[1].map((el) => el.id).includes(item.category.toLowerCase())
            );
        });
        createCards(prodList);
    } else {
        listOfCheckedCheckboxes = [checkboxesBrand, checkboxesCategory];
        createCards(products);
    }
}

brandList.addEventListener('change', getCheckedItems);
categoryList.addEventListener('change', getCheckedItems);
sortAndSettings.addEventListener('change', getCheckedItems);

const cardsBlock: HTMLElement = document.createElement('div');
cardsBlock.className = 'cards';

export function createCards(data: Product[]) {
    cardsBlock.innerHTML = '';
    sortItems(data).map((item) => {
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

main.append(filtersContainer, sortAndSettings, cardsBlock);
