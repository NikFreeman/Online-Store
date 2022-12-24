import { ProductList, Product, GroupeBy } from '../../models/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../../assets/images/shopping-cart.svg');

// query params
const searchParams = new URLSearchParams(document.location.search);

// get products from API
let products: Product[] = [];
export async function getList() {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data: ProductList = await res.json();
    return data;
}

// get list of all products as array
export function getProductsList(data: ProductList) {
    products = data.products;
    return data.products;
}

// draw html elements for start page
const main: HTMLElement = document.createElement('main');
main.className = 'wrapper';
document.body.append(main);

const filtersContainer: HTMLElement = document.createElement('div');
filtersContainer.className = 'filter';

const filterBrand: HTMLElement = document.createElement('div');
filterBrand.className = 'filter__brand filter__block';
const brandHeader: HTMLElement = document.createElement('div');
brandHeader.className = 'filter__brand-header filter__header';
brandHeader.textContent = 'Brand';
const brandList: HTMLElement = document.createElement('div');
brandList.className = 'filter__list';

const filterCategory: HTMLElement = document.createElement('div');
filterCategory.className = 'filter__category filter__block';
const categoryHeader: HTMLElement = document.createElement('div');
categoryHeader.className = 'filter__category-header filter__header';
categoryHeader.textContent = 'Category';
const categoryList: HTMLElement = document.createElement('div');
categoryList.className = 'filter__list';

// dual ranges
const filterRanges: HTMLElement = document.createElement('div');
filterRanges.className = 'filter__ranges filter__block';
const rangeContainerOne: HTMLElement = document.createElement('div');
rangeContainerOne.className = 'filter__range range__container';
const slidersControlOne: HTMLElement = document.createElement('div');
slidersControlOne.className = 'filter__sliders range__sliders';
const sliderFirstOne: HTMLInputElement = document.createElement('input');
const sliderSecondOne: HTMLInputElement = document.createElement('input');
sliderFirstOne.id = 'fromPrice';
sliderFirstOne.type = 'range';
sliderSecondOne.id = 'toPrice';
sliderSecondOne.type = 'range';

const valuePriceContainer: HTMLElement = document.createElement('div');
valuePriceContainer.className = 'filter__values value__container';
const valueMinPrice: HTMLElement = document.createElement('span');
valueMinPrice.className = 'filter__min-value filter__value';
const valueMaxPrice: HTMLElement = document.createElement('span');
valueMaxPrice.className = 'filter__max-value filter__value';

const rangeNameOne: HTMLElement = document.createElement('div');
rangeNameOne.className = 'range__title filter__header';
rangeNameOne.textContent = 'Price';

const rangeValuesOne: HTMLElement = document.createElement('div');
rangeValuesOne.className = 'range__values';
const rangeValuePriceMin: HTMLElement = document.createElement('div');
rangeValuePriceMin.className = 'range__value';
const rangeValuePriceMax: HTMLElement = document.createElement('div');
rangeValuePriceMax.className = 'range__value';

const rangeContainerTwo: HTMLElement = document.createElement('div');
rangeContainerTwo.className = 'filter__range range__container';
const slidersControlTwo: HTMLElement = document.createElement('div');
slidersControlTwo.className = 'filter__sliders range__sliders';
const sliderFirstTwo: HTMLInputElement = document.createElement('input');
const sliderSecondTwo: HTMLInputElement = document.createElement('input');
sliderFirstTwo.id = 'fromStock';
sliderFirstTwo.type = 'range';
sliderSecondTwo.id = 'toStock';
sliderSecondTwo.type = 'range';

const valueStockContainer: HTMLElement = document.createElement('div');
valueStockContainer.className = 'filter__values value__container';
const valueMinStock: HTMLElement = document.createElement('span');
valueMinStock.className = 'filter__min-value filter__value';
const valueMaxStock: HTMLElement = document.createElement('span');
valueMaxStock.className = 'filter__max-value filter__value';

const rangeNameTwo: HTMLElement = document.createElement('div');
rangeNameTwo.className = 'range__title filter__header';
rangeNameTwo.textContent = 'Stock';

const rangeValuesTwo: HTMLElement = document.createElement('div');
rangeValuesTwo.className = 'range__values';
const rangeValueStockMin: HTMLElement = document.createElement('div');
rangeValueStockMin.className = 'range__value';
const rangeValueStockMax: HTMLElement = document.createElement('div');
rangeValueStockMax.className = 'range__value';

filterRanges.append(rangeContainerOne, rangeContainerTwo);
rangeContainerOne.append(rangeNameOne, slidersControlOne, valuePriceContainer);
slidersControlOne.append(sliderFirstOne, sliderSecondOne);
valuePriceContainer.append(valueMinPrice, valueMaxPrice);

rangeContainerTwo.append(rangeNameTwo, slidersControlTwo, valueStockContainer);
slidersControlTwo.append(sliderFirstTwo, sliderSecondTwo);
valueStockContainer.append(valueMinStock, valueMaxStock);

filtersContainer.append(filterBrand, filterCategory, filterRanges);
filterBrand.append(brandHeader, brandList);
filterCategory.append(categoryHeader, categoryList);

class RangeSettings {
    data: Product[];
    constructor(data: Product[]) {
        this.data = data;
    }
    minPrice() {
        return this.data.reduce((min, prod) => (prod.price < min ? prod.price : min), this.data[0].price);
    }
    maxPrice() {
        return this.data.reduce((max, prod) => (prod.price > max ? prod.price : max), this.data[0].price);
    }
    minStock() {
        return this.data.reduce((min, prod) => (prod.stock < min ? prod.stock : min), this.data[0].stock);
    }
    maxStock() {
        return this.data.reduce((max, prod) => (prod.stock > max ? prod.stock : max), this.data[0].stock);
    }
}

function setRangeMinMax(data: Product[]) {
    const settings = new RangeSettings(data);
    sliderFirstOne.min = settings.minPrice().toString();
    sliderFirstOne.max = settings.maxPrice().toString();
    sliderSecondOne.min = settings.minPrice().toString();
    sliderSecondOne.max = settings.maxPrice().toString();
    sliderFirstTwo.min = settings.minStock().toString();
    sliderFirstTwo.max = settings.maxStock().toString();
    sliderSecondTwo.min = settings.minStock().toString();
    sliderSecondTwo.max = settings.maxStock().toString();
}

function setRangeValues(data: Product[]) {
    const currentSettings = new RangeSettings(getRangedItems(data));
    sliderFirstOne.value = currentSettings.minPrice().toString();
    sliderSecondOne.value = currentSettings.maxPrice().toString();
    valueMinPrice.textContent = sliderFirstOne.value;
    valueMaxPrice.textContent = sliderSecondOne.value;
    sliderFirstTwo.value = currentSettings.minStock().toString();
    sliderSecondTwo.value = currentSettings.maxStock().toString();
    valueMinStock.textContent = sliderFirstTwo.value;
    valueMaxStock.textContent = sliderSecondTwo.value;
}

function getRangeValues(e: Event) {
    const target = e.target as HTMLInputElement;
    const parent = target.parentElement as HTMLDivElement;
    const sibling = parent.nextElementSibling as HTMLDivElement;
    const firstChild = sibling.firstElementChild as HTMLSpanElement;
    const lastChild = sibling.lastElementChild as HTMLSpanElement;
    if (target.nextElementSibling) {
        const range2Sibling = target.nextElementSibling as HTMLInputElement;
        firstChild.textContent = target.value;
        if (+target.value >= +range2Sibling.value) {
            target.value = range2Sibling.value;
            firstChild.textContent = target.value;
        }
        searchParams.set(target.id.slice(-5).toLowerCase(), `${target.value}↕${range2Sibling.value}`);
        window.history.replaceState(null, '', '?' + searchParams.toString());
    } else {
        const range1Sibling = target.previousElementSibling as HTMLInputElement;
        lastChild.textContent = target.value;
        if (+target.value <= +range1Sibling.value) {
            target.value = range1Sibling.value;
            lastChild.textContent = target.value;
        }
        searchParams.set(target.id.slice(-5).toLowerCase(), `${range1Sibling.value}↕${target.value}`);
        window.history.replaceState(null, '', '?' + searchParams.toString());
    }
    getCheckedItems();
}

filterRanges.addEventListener('input', getRangeValues);

// sort elements
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
    if (searchParams.get('sort') === `${i + 1}`) {
        sortBtn.checked = true;
    }
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
            searchParams.set('sort', '1');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            return data.sort((a, b) => a.price - b.price);
        case 'sort-2':
            searchParams.set('sort', '2');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            return data.sort((a, b) => b.price - a.price);
        case 'sort-3':
            searchParams.set('sort', '3');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            return data.sort((a, b) => a.rating - b.rating);
        case 'sort-4':
            searchParams.set('sort', '4');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            return data.sort((a, b) => b.rating - a.rating);
        default:
            return data;
    }
}

function groupeByBrand(data: Product[]): GroupeBy {
    const groupedByBrand: GroupeBy = {};
    for (const item of data) {
        if (groupedByBrand[item.brand.toUpperCase()]) {
            groupedByBrand[item.brand.toUpperCase()].push(item);
        } else {
            groupedByBrand[item.brand.toUpperCase()] = [item];
        }
    }
    return groupedByBrand;
}

function groupeByCategory(data: Product[]): GroupeBy {
    const groupedByCategory: GroupeBy = {};
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

// const prodCheckedList: Product[] = getCheckedItems();
function fillBrandList(data: GroupeBy) {
    if (!brandList.firstElementChild) {
        const selectedBrands: string[] | undefined = searchParams.get('brand')?.split('↕');
        for (const brand in data) {
            const checkboxCont: HTMLElement = document.createElement('div');
            checkboxCont.className = 'checkbox-line';
            const checkboxIn: HTMLInputElement = document.createElement('input');
            checkboxIn.type = 'checkbox';
            checkboxIn.id = `${brand}`;
            checkboxIn.className = 'checkbox';
            if (selectedBrands?.includes(brand.toUpperCase())) {
                checkboxIn.checked = true;
            }
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
            count.textContent = `(${data[brand].length}/${data[brand].length})`;
            checkboxCont.append(checkboxIn, checkboxLbl, count);
            brandList.append(checkboxCont);
        }
    }
    return data;
}

function fillCategoryList(data: GroupeBy) {
    if (!categoryList.firstElementChild) {
        const selectedCategories: string[] | undefined = searchParams.get('category')?.split('↕');
        for (const category in data) {
            const checkboxCont: HTMLElement = document.createElement('div');
            checkboxCont.className = 'checkbox-line';
            const checkboxIn: HTMLInputElement = document.createElement('input');
            checkboxIn.type = 'checkbox';
            checkboxIn.id = `${category}`;
            checkboxIn.className = 'checkbox';
            if (selectedCategories?.includes(category.toLowerCase())) {
                checkboxIn.checked = true;
            }
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
    setRangeMinMax(products);
    getCheckedItems();
}

function getRangedItems(data: Product[]) {
    const selectedPrice: string[] | undefined = searchParams.get('price')?.split('↕');
    const selectedStock: string[] | undefined = searchParams.get('stock')?.split('↕');
    let prodItems: Product[] = data;
    if (selectedPrice) {
        prodItems = data.filter(
            (item) => item.price >= Number(selectedPrice[0]) && item.price <= Number(selectedPrice[1])
        );
    }
    if (selectedStock) {
        prodItems = prodItems.filter(
            (item) => item.stock >= Number(selectedStock[0]) && item.stock <= Number(selectedStock[1])
        );
    }
    return prodItems;
}

let listOfCheckedCheckboxes: HTMLInputElement[][] = [checkboxesBrand, checkboxesCategory];

function getCheckedItems() {
    listOfCheckedCheckboxes = [checkboxesBrand, checkboxesCategory];
    if (checkboxes.filter((input) => input.checked).length > 0) {
        if (checkboxesBrand.filter((input) => input.checked).length > 0) {
            listOfCheckedCheckboxes[0] = checkboxesBrand.filter((input) => input.checked);
            let brandList = '';
            listOfCheckedCheckboxes[0].forEach((el) => (brandList += brandList ? `↕${el.id}` : `${el.id}`));
            searchParams.set('brand', brandList);
        } else {
            searchParams.delete('brand');
        }
        if (checkboxesCategory.filter((input) => input.checked).length > 0) {
            listOfCheckedCheckboxes[1] = checkboxesCategory.filter((input) => input.checked);
            let categoryList = '';
            listOfCheckedCheckboxes[1].forEach((el) => (categoryList += categoryList ? `↕${el.id}` : `${el.id}`));
            searchParams.set('category', categoryList);
        } else {
            searchParams.delete('category');
        }
        const prodList: Product[] = getRangedItems(products).filter((item) => {
            return (
                listOfCheckedCheckboxes[0].map((el) => el.id).includes(item.brand.toUpperCase()) &&
                listOfCheckedCheckboxes[1].map((el) => el.id).includes(item.category.toLowerCase())
            );
        });
        window.history.replaceState(null, '', '?' + searchParams.toString());
        createCards(prodList);
        setRangeValues(prodList);
        return prodList;
    } else {
        listOfCheckedCheckboxes = [checkboxesBrand, checkboxesCategory];
        searchParams.delete('brand');
        searchParams.delete('category');
        window.history.replaceState(null, '', '?' + searchParams.toString());
        createCards(getRangedItems(products));
        setRangeValues(products);
        return products;
    }
}

brandList.addEventListener('change', getCheckedItems);
categoryList.addEventListener('change', getCheckedItems);
sortAndSettings.addEventListener('change', getCheckedItems);
// filterRanges.addEventListener('input', getCheckedItems);

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
        const cartText: HTMLElement = document.createElement('span');
        cartText.className = 'add-to-cart';
        cartText.textContent = 'add';
        addBtn.append(cartIcon, cartText);
        const detailsBtn: HTMLElement = document.createElement('button');
        detailsBtn.className = 'card__detail-btn';
        detailsBtn.textContent = 'details';
        btnsWrapper.append(addBtn, detailsBtn);
        card.append(discount, title, cardImg, price, btnsWrapper);
        cardsBlock.append(card);
    });
}

main.append(filtersContainer, sortAndSettings, cardsBlock);
