import { ProductList, Product, GroupedBy } from '../../models/types';
import { groupByBrand, groupByCategory } from '../../utils/grouping';
import { createCards } from './cards';
import { switchSizeItems, RangeSettings } from './settings';
import { btnsContainer } from './copyLink';
import { searchCont, searchIn, searchProducts } from './search';
import { cart } from '../cart/index';
import { header, updateHeaderCartData } from '../../components/header/header';
import { routerHandler } from '../../routes/router';

// query params
export const searchParams = new URLSearchParams(document.location.search);

// get products from API
export let products: Product[] = [];
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
const main = document.createElement('div');
main.className = 'wrapper';
const app = document.getElementById('App');

const filtersContainer = document.createElement('div');
filtersContainer.className = 'filter';

const filterBrand = document.createElement('div');
filterBrand.className = 'filter__brand filter__block';

const brandHeader = document.createElement('div');
brandHeader.className = 'filter__brand-header filter__header';
brandHeader.textContent = 'Brand';

const brandList = document.createElement('div');
brandList.className = 'filter__list';

const filterCategory = document.createElement('div');
filterCategory.className = 'filter__category filter__block';

const categoryHeader = document.createElement('div');
categoryHeader.className = 'filter__category-header filter__header';
categoryHeader.textContent = 'Category';

const categoryList = document.createElement('div');
categoryList.className = 'filter__list';

export const checkboxes: HTMLInputElement[] = [];
const checkboxesBrand: HTMLInputElement[] = [];
const checkboxesCategory: HTMLInputElement[] = [];

function fillBrandList(data: GroupedBy) {
    if (!brandList.firstElementChild) {
        const selectedBrands: string[] | undefined = searchParams.get('brand')?.split('↕');
        for (const brand in data) {
            const checkboxCont = document.createElement('div');
            checkboxCont.className = 'checkbox-line';

            const checkboxIn = document.createElement('input');
            checkboxIn.type = 'checkbox';
            checkboxIn.id = `${brand}`;
            checkboxIn.className = 'checkbox';
            if (selectedBrands?.includes(brand.toUpperCase())) {
                checkboxIn.checked = true;
            }
            checkboxes.push(checkboxIn);
            checkboxesBrand.push(checkboxIn);

            const checkboxLbl = document.createElement('label');
            checkboxLbl.htmlFor = checkboxIn.id;
            checkboxLbl.textContent = `${brand}`;
            checkboxLbl.className = 'label';

            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkboxLbl.append(checkmark);

            const restCount = document.createElement('span');
            restCount.className = 'brand__rest-count items-count';
            restCount.id = `brand-${brand}`;
            restCount.textContent = `(${data[brand].length}`;

            const count = document.createElement('span');
            count.className = 'brand-count items-count';
            count.textContent = `/${data[brand].length})`;
            checkboxCont.append(checkboxIn, checkboxLbl, restCount, count);
            brandList.append(checkboxCont);
        }
    }
    return data;
}

function fillCategoryList(data: GroupedBy) {
    if (!categoryList.firstElementChild) {
        const selectedCategories: string[] | undefined = searchParams.get('category')?.split('↕');
        for (const category in data) {
            const checkboxCont = document.createElement('div');
            checkboxCont.className = 'checkbox-line';

            const checkboxIn = document.createElement('input');
            checkboxIn.type = 'checkbox';
            checkboxIn.id = `${category}`;
            checkboxIn.className = 'checkbox';
            if (selectedCategories?.includes(category.toLowerCase())) {
                checkboxIn.checked = true;
            }
            checkboxes.push(checkboxIn);
            checkboxesCategory.push(checkboxIn);

            const checkboxLbl = document.createElement('label');
            checkboxLbl.htmlFor = checkboxIn.id;
            checkboxLbl.textContent = `${category}`;
            checkboxLbl.className = 'label';

            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkboxLbl.append(checkmark);

            const restCount = document.createElement('span');
            restCount.className = 'category__rest-count items-count';
            restCount.id = `category-${category}`;
            restCount.textContent = `(${data[category].length}`;

            const count = document.createElement('span');
            count.className = 'brand-count items-count';
            count.textContent = `/${data[category].length})`;
            checkboxCont.append(checkboxIn, checkboxLbl, restCount, count);
            categoryList.append(checkboxCont);
        }
    }
    return data;
}

function fillRestCountBrand(data: Product[]) {
    const arrRestCount = filterBrand.querySelectorAll('.brand__rest-count');
    const restBrands = groupByBrand(data);
    arrRestCount.forEach((el) => {
        if (restBrands[el.id.slice(6)]) {
            el.textContent = `(${restBrands[el.id.slice(6)].length}`;
        } else {
            el.textContent = '(0';
        }
    });
}

function fillRestCountCategory(data: Product[]) {
    const arrRestCount = filterCategory.querySelectorAll('.category__rest-count');

    const restCategories = groupByCategory(data);
    arrRestCount.forEach((el) => {
        if (restCategories[el.id.slice(9)]) {
            el.textContent = `(${restCategories[el.id.slice(9)].length}`;
        } else {
            el.textContent = '(0';
        }
    });
}

const restfilters = document.createElement('div');
restfilters.className = 'filter__block';

// dual ranges
const filterRanges = document.createElement('div');
filterRanges.className = 'filter__ranges';

const rangeContainerOne = document.createElement('div');
rangeContainerOne.className = 'filter__range range__container';

const slidersControlOne = document.createElement('div');
slidersControlOne.className = 'filter__sliders range__sliders';

const sliderFirstOne = document.createElement('input');
sliderFirstOne.id = 'fromPrice';
sliderFirstOne.type = 'range';

const sliderSecondOne = document.createElement('input');
sliderSecondOne.id = 'toPrice';
sliderSecondOne.type = 'range';

const valuePriceContainer = document.createElement('div');
valuePriceContainer.className = 'filter__values value__container';

const valueMinPrice = document.createElement('span');
valueMinPrice.className = 'filter__min-value filter__value';

const valueMaxPrice = document.createElement('span');
valueMaxPrice.className = 'filter__max-value filter__value';

const rangeNameOne = document.createElement('div');
rangeNameOne.className = 'range__title filter__header';
rangeNameOne.textContent = 'Price';

const rangeValuesOne = document.createElement('div');
rangeValuesOne.className = 'range__values';

const rangeValuePriceMin = document.createElement('div');
rangeValuePriceMin.className = 'range__value';

const rangeValuePriceMax = document.createElement('div');
rangeValuePriceMax.className = 'range__value';

const rangeContainerTwo = document.createElement('div');
rangeContainerTwo.className = 'filter__range range__container';

const slidersControlTwo = document.createElement('div');
slidersControlTwo.className = 'filter__sliders range__sliders';

const sliderFirstTwo = document.createElement('input');
sliderFirstTwo.id = 'fromStock';
sliderFirstTwo.type = 'range';

const sliderSecondTwo = document.createElement('input');
sliderSecondTwo.id = 'toStock';
sliderSecondTwo.type = 'range';

const valueStockContainer = document.createElement('div');
valueStockContainer.className = 'filter__values value__container';

const valueMinStock = document.createElement('span');
valueMinStock.className = 'filter__min-value filter__value';

const valueMaxStock = document.createElement('span');
valueMaxStock.className = 'filter__max-value filter__value';

const rangeNameTwo = document.createElement('div');
rangeNameTwo.className = 'range__title filter__header';
rangeNameTwo.textContent = 'Stock';

const rangeValuesTwo = document.createElement('div');
rangeValuesTwo.className = 'range__values';

const rangeValueStockMin = document.createElement('div');
rangeValueStockMin.className = 'range__value';

const rangeValueStockMax = document.createElement('div');
rangeValueStockMax.className = 'range__value';

restfilters.append(btnsContainer, filterRanges, searchCont);
filterRanges.append(rangeContainerOne, rangeContainerTwo);
rangeContainerOne.append(rangeNameOne, slidersControlOne, valuePriceContainer);
slidersControlOne.append(sliderFirstOne, sliderSecondOne);
valuePriceContainer.append(valueMinPrice, valueMaxPrice);

rangeContainerTwo.append(rangeNameTwo, slidersControlTwo, valueStockContainer);
slidersControlTwo.append(sliderFirstTwo, sliderSecondTwo);
valueStockContainer.append(valueMinStock, valueMaxStock);

filtersContainer.append(filterBrand, filterCategory, restfilters);
filterBrand.append(brandHeader, brandList);
filterCategory.append(categoryHeader, categoryList);

function setRangeMinMax(data: Product[]) {
    if (data.length > 0) {
        const settings = new RangeSettings(data);
        sliderFirstOne.min = settings.minPrice().toString();
        sliderFirstOne.max = settings.maxPrice().toString();
        sliderSecondOne.min = sliderFirstOne.min;
        sliderSecondOne.max = sliderFirstOne.max;
        sliderFirstTwo.min = settings.minStock().toString();
        sliderFirstTwo.max = settings.maxStock().toString();
        sliderSecondTwo.min = sliderFirstTwo.min;
        sliderSecondTwo.max = sliderFirstTwo.max;
    }
}

export function setRangeValues(data: Product[]) {
    if (data.length > 0) {
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

filterRanges.addEventListener('change', getRangeValues);

// sort elements
const sortAndSettings = document.createElement('div');
sortAndSettings.className = 'settings';

export const sortContainer = document.createElement('div');
sortContainer.className = 'settings__sort';

export const sizeContainer = document.createElement('div');
sizeContainer.className = 'settings__size';

export const foundProducts = document.createElement('div');
foundProducts.className = 'settings__found';
sortAndSettings.append(sortContainer, foundProducts, sizeContainer);

const sortMethods: string[] = ['PriceUp', 'PriceDown', 'RatingUp', 'RatingDown'];

let sortBtn = document.createElement('input');
let labelForSort = document.createElement('label');
for (let i = 0; i < sortMethods.length; i++) {
    sortBtn = document.createElement('input');
    sortBtn.type = 'radio';
    sortBtn.name = 'sort';
    sortBtn.id = `sort-${i + 1}`;
    sortBtn.value = sortMethods[i];
    if (searchParams.get('sort') === sortMethods[i]) {
        sortBtn.checked = true;
    }
    labelForSort = document.createElement('label');
    labelForSort.htmlFor = sortBtn.id;
    labelForSort.className = `sort-control sort-control__${i + 1}`;
    labelForSort.textContent = `${sortMethods[i]}`;
    sortContainer.append(sortBtn, labelForSort);
}

// cards size change
const sizeMethods: string[] = ['Small', 'Large'];

sizeMethods.forEach((size) => {
    const sizeBtn = document.createElement('input');
    sizeBtn.type = 'radio';
    sizeBtn.name = 'size';
    sizeBtn.id = `size-${size.toLowerCase()}`;
    if (searchParams.get('size') === size.toLowerCase()) {
        sizeBtn.checked = true;
    }
    sizeBtn.value = size;

    const labelForSize = document.createElement('label');
    labelForSize.htmlFor = sizeBtn.id;
    labelForSize.className = `size-control size-control__${size.toLowerCase()}`;
    labelForSize.textContent = `${size}`;
    sizeContainer.append(sizeBtn, labelForSize);
});

sizeContainer.addEventListener('change', switchSizeItems);

export async function start() {
    await getList().then(getProductsList);
    fillBrandList(groupByBrand(products));
    fillCategoryList(groupByCategory(products));
    setRangeMinMax(products);
    getCheckedItems();
    switchSizeItems();
    if (app) {
        app.innerHTML = '';
        app.append(main);
        app.prepend(header);
    }
}

export function getRangedItems(data: Product[]) {
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

export function getCheckedItems() {
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
        fillRestCountBrand(searchProducts(prodList));
        fillRestCountCategory(searchProducts(prodList));
        createCards(searchProducts(prodList));
        setRangeValues(searchProducts(prodList));
        return prodList;
    } else {
        listOfCheckedCheckboxes = [checkboxesBrand, checkboxesCategory];
        searchParams.delete('brand');
        searchParams.delete('category');
        window.history.replaceState(null, '', '?' + searchParams.toString());
        fillRestCountBrand(searchProducts(getRangedItems(products)));
        fillRestCountCategory(searchProducts(getRangedItems(products)));
        createCards(searchProducts(getRangedItems(products)));
        setRangeValues(searchProducts(products));
        return products;
    }
}

brandList.addEventListener('change', getCheckedItems);
categoryList.addEventListener('change', getCheckedItems);
sortContainer.addEventListener('change', getCheckedItems);

searchIn.addEventListener('input', getCheckedItems);

export const cardsBlock = document.createElement('div');
cardsBlock.className = 'cards';

main.append(filtersContainer, sortAndSettings, cardsBlock);

function actionCardButtons(e: Event) {
    if (e.target instanceof HTMLElement) {
        const elementId = e.target.closest('.card')?.id.substring(5);
        const prod = products.find((item) => item.id.toString() === elementId);
        if (prod) {
            if (e.target.classList.contains('card__detail-btn')) {
                history.pushState({}, '', `/product-detail/${elementId}`);
                routerHandler();
            } else if (e.target.closest('.card__add-btn')) {
                const addBtn = e.target.closest('.card__add-btn');
                if (addBtn && addBtn.lastElementChild && addBtn.firstElementChild) {
                    if (addBtn.lastElementChild.textContent === 'remove') {
                        cart.removeProduct(prod.id);
                        addBtn.lastElementChild.textContent = 'add';
                        addBtn.firstElementChild.setAttribute('data-count', '');
                    } else {
                        cart.addProduct(prod.id, 1, prod.price);
                        addBtn.lastElementChild.textContent = 'remove';
                        addBtn.firstElementChild.setAttribute('data-count', '1');
                    }
                    updateHeaderCartData();
                }
            }
        }
    }
}
cardsBlock.addEventListener('click', actionCardButtons);
