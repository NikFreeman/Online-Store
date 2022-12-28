import { resetBtn } from './resetFilters';

export const btnsContainer = document.createElement('div');
btnsContainer.className = 'filter__btns btns__block';

const copyLinkBtn = document.createElement('button');
copyLinkBtn.className = 'filter__copy-btn filter__btn';
const copyLinkText = document.createElement('span');
copyLinkText.textContent = 'copy link';

const copiedText = document.createElement('span');
copiedText.className = 'invisible-text';
copiedText.textContent = 'copied !';

copyLinkBtn.append(copyLinkText, copiedText);
btnsContainer.append(copyLinkBtn, resetBtn);

function copyLink() {
    navigator.clipboard.writeText(decodeURIComponent(document.location.href));
    copyLinkText.classList.add('invisible-text');
    copiedText.classList.remove('invisible-text');
    window.setTimeout(renameBtn, 1000);
}

function renameBtn() {
    copyLinkText.classList.remove('invisible-text');
    copiedText.classList.add('invisible-text');
}

copyLinkBtn.addEventListener('click', copyLink);
