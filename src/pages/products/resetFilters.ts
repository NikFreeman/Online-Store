import { searchParams, checkboxes, getCheckedItems, sizeContainer } from './products';

export const resetBtn = document.createElement('button');
resetBtn.className = 'filter__reset-btn filter__btn';
resetBtn.textContent = 'reset filters';

function resetFilters() {
    for (const key of searchParams.keys()) {
        searchParams.delete(key);
    }
    window.history.replaceState(null, '', '?' + searchParams.toString());
    checkboxes.forEach((chBox) => (chBox.checked = false));
    (sizeContainer.querySelector('#size-large') as HTMLInputElement).checked = true;
    document.documentElement.style.setProperty('--cards-multiplier', '1');
    document.documentElement.style.removeProperty('--direction-for-btns');
    getCheckedItems();
}

resetBtn.addEventListener('click', resetFilters);
