import { searchParams, checkboxes, getCheckedItems, sizeContainer, sortContainer } from './products';

export const resetBtn = document.createElement('button');
resetBtn.className = 'filter__reset-btn filter__btn';
resetBtn.textContent = 'reset filters';

async function resetFilters() {
    checkboxes.forEach((chBox) => (chBox.checked = false));
    searchParams
        .toString()
        .split('&')
        .forEach((param) => searchParams.delete(param.split('=')[0]));
    (sizeContainer.querySelector('#size-large') as HTMLInputElement).checked = true;
    document.documentElement.style.setProperty('--cards-multiplier', '1');
    document.documentElement.style.removeProperty('--direction-for-btns');
    if (sortContainer.querySelector('input:checked')) {
        (sortContainer.querySelector('input:checked') as HTMLInputElement).checked = false;
    }
    window.history.replaceState(null, '', '?' + searchParams.toString());
    getCheckedItems();
}

resetBtn.addEventListener('click', resetFilters);
