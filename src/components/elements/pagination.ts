import { cartElements } from '../../pages/cart';

export const searchParams = new URLSearchParams(document.location.search);

export const paginationCtrl = document.createElement('div');
paginationCtrl.className = 'pagination__control';
const paginationLimit = document.createElement('div');
paginationLimit.className = 'pagination__limit';

const limitText = document.createElement('span');
limitText.className = 'pagination__limit-text';
limitText.textContent = 'Number of items per page: ';

const inputPagesCount = document.createElement('input');
inputPagesCount.className = 'pagination__input';
inputPagesCount.type = 'number';
inputPagesCount.min = '1';
inputPagesCount.max = '8';

const selectedLimit: string | null = searchParams.get('limit');
inputPagesCount.value = selectedLimit ? selectedLimit : '3';
if (Number(inputPagesCount.value) < 1) {
    inputPagesCount.value = '1';
    searchParams.set('limit', inputPagesCount.value);
    window.history.replaceState(null, '', '?' + searchParams.toString());
}
if (Number(inputPagesCount.value) > 8) {
    inputPagesCount.value = '8';
    searchParams.set('limit', inputPagesCount.value);
    window.history.replaceState(null, '', '?' + searchParams.toString());
}

const paginationPages = document.createElement('div');
paginationPages.className = 'pagination__page-block';

const pageText = document.createElement('span');
pageText.className = 'pagination__page-text';
pageText.textContent = 'Page: ';

const paginationButtons = document.createElement('div');
paginationButtons.className = 'pagination__buttons';

const btnLeft = document.createElement('button');
btnLeft.className = 'pagination__page-down pagination__btn';
btnLeft.textContent = ' - ';

const btnRight = document.createElement('button');
btnRight.className = 'pagination__page-up pagination__btn';
btnRight.textContent = ' + ';

const pageNumber = document.createElement('span');
pageNumber.className = 'pagination__page-number';
pageNumber.textContent = '1';

paginationCtrl.append(paginationLimit, paginationPages);
paginationLimit.append(limitText, inputPagesCount);
paginationPages.append(pageText, paginationButtons);
paginationButtons.append(btnLeft, pageNumber, btnRight);

function turnPage(e: Event) {
    if (e.target instanceof HTMLButtonElement) {
        if (e.target.classList.contains('pagination__page-down')) {
            pageNumber.textContent = (Number(pageNumber.textContent) - 1).toString();
            if (Number(pageNumber.textContent) < 1) {
                pageNumber.textContent = '1';
            }
            searchParams.set('page', `${pageNumber.textContent}`);
            window.history.replaceState(null, '', '?' + searchParams.toString());
        }
        if (e.target.classList.contains('pagination__page-up')) {
            pageNumber.textContent = (Number(pageNumber.textContent) + 1).toString();
            if (Number(pageNumber.textContent) > Math.ceil(cartElements.length / Number(inputPagesCount.value))) {
                pageNumber.textContent = `${Math.ceil(cartElements.length / Number(inputPagesCount.value))}`;
            }
            searchParams.set('page', `${pageNumber.textContent}`);
            window.history.replaceState(null, '', '?' + searchParams.toString());
        }
    }
}

paginationPages.addEventListener('click', turnPage);
paginationPages.addEventListener('click', hideItems);

function changeItemsPerPage() {
    searchParams.set('limit', `${inputPagesCount.value}`);
    window.history.replaceState(null, '', '?' + searchParams.toString());
}

inputPagesCount.addEventListener('change', changeItemsPerPage);
inputPagesCount.addEventListener('change', hideItems);

export function hideItems() {
    const pageN = Number(searchParams.get('page')) || 1;
    const lim = Number(searchParams.get('limit')) || 3;
    if (cartElements.length > 0) {
        Array.from(cartElements).forEach((item, index) => {
            if (index + 1 > lim * pageN || index < lim * (pageN - 1)) {
                item.classList.add('hide');
            } else {
                item.classList.remove('hide');
            }
        });
    }
}
