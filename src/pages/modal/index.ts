import './modal.scss';

const modal = document.createElement('div');
modal.className = 'container';
modal.setAttribute('data-close', '');

const content = document.createElement('div');
content.className = 'modal__content';

const buttonClose = document.createElement('button');
buttonClose.className = 'modal__close';
buttonClose.setAttribute('data-close', '');
buttonClose.textContent = 'X';

const labelDetail = document.createElement('h2');
labelDetail.className = 'modal__title';
labelDetail.textContent = 'Personal detail';

const inputFullName = document.createElement('input');
inputFullName.className = 'input input__full-name';
inputFullName.placeholder = 'Name';

const inputPhone = document.createElement('input');
inputPhone.className = 'input input__phone';
inputPhone.placeholder = 'Phone number';

const inputDelivery = document.createElement('input');
inputDelivery.className = 'input input__delivery';
inputDelivery.placeholder = 'Delivery address';

const inputEmail = document.createElement('input');
inputEmail.className = 'input input__email';
inputEmail.placeholder = 'E-mail';

const labelCard = document.createElement('h2');
labelCard.className = 'modal__title';
labelCard.textContent = 'Credit cart detail';

const buttonConfirm = document.createElement('button');
buttonConfirm.className = 'confirm__btn';
buttonConfirm.textContent = 'Confirm';

const cardFront = document.createElement('div');
cardFront.className = 'credit-card';

const imgPayment = document.createElement('img');
imgPayment.className = 'credit-card-img';

const inputCardNumber = document.createElement('input');
inputCardNumber.className = 'input__card input__card-number';
inputCardNumber.placeholder = 'Card number';

const cardDetailContainer = document.createElement('div');
cardDetailContainer.className = 'card__detail-row';

const inputCardValid = document.createElement('input');
inputCardValid.className = 'input__card input__card-valid';
inputCardValid.id = 'card-valid';
inputCardValid.placeholder = 'MM/YY';

const labelCardValid = document.createElement('label');
labelCardValid.className = 'card__valid';
labelCardValid.htmlFor = inputCardValid.id;
labelCardValid.textContent = 'VALID:';

const inputCardCVV = document.createElement('input');
inputCardCVV.className = 'input__card input__card-cvv';
inputCardCVV.id = 'card-cvv';
inputCardCVV.placeholder = 'Code';

const labelCardCVV = document.createElement('label');
labelCardCVV.className = 'card__cvv';
labelCardCVV.htmlFor = inputCardCVV.id;
labelCardCVV.textContent = 'CVV:';

cardFront.append(inputCardNumber, labelCardValid, inputCardValid, labelCardCVV, inputCardCVV);

function renderModal() {
    content.append(labelDetail, inputFullName, inputPhone, inputDelivery, inputEmail);
    content.append(labelCard, cardFront, buttonConfirm);
    content.append(buttonClose);
    modal.append(content);
}

export function showModal() {
    const header = document.querySelector('#header');
    renderModal();
    document.body.insertBefore(modal, header);
    document.body.classList.add('lock');
    modal.addEventListener('click', hideModal);
}

function hideModal(e: Event) {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-close')) {
        if (content) content.remove();
        setTimeout(() => {
            if (modal) {
                modal.remove();
                document.body.classList.remove('lock');
            }
        }, 1000);
    }
}
