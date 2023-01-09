import './modal.scss';
import payment from '../../assets/images/cards';
import ErrorMessage from '../../models/error-message';
import { cart } from '../../pages/cart/index';
import { promo } from '../../pages/cart/promo';

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

const formFields = document.createElement('form');
formFields.className = 'form__content';

const blockFullName = document.createElement('div');
blockFullName.className = 'block';

const errorMessageFullName = document.createElement('span');
errorMessageFullName.className = 'error-message';

const inputFullName = document.createElement('input');
inputFullName.className = 'input input__full-name';
inputFullName.required = true;
inputFullName.placeholder = 'Name';
inputFullName.addEventListener('input', validityFullName);

blockFullName.append(inputFullName, errorMessageFullName);

const blockPhone = document.createElement('div');
blockPhone.className = 'block';

const errorMessagePhone = document.createElement('span');
errorMessagePhone.className = 'error-message';

const inputPhone = document.createElement('input');
inputPhone.className = 'input input__phone';
inputPhone.required = true;
inputPhone.addEventListener('input', validityPhone);
inputPhone.placeholder = 'Phone number';

blockPhone.append(inputPhone, errorMessagePhone);

const blockDelivery = document.createElement('div');
blockDelivery.className = 'block';

const errorMessageDelivery = document.createElement('span');
errorMessageDelivery.className = 'error-message';

const inputDelivery = document.createElement('input');
inputDelivery.className = 'input input__delivery';
inputDelivery.required = true;
inputDelivery.addEventListener('input', validityDelivery);
inputDelivery.placeholder = 'Delivery address';
blockDelivery.append(inputDelivery, errorMessageDelivery);

const blockEmail = document.createElement('div');
blockEmail.className = 'block';

const errorMessageEmail = document.createElement('span');
errorMessageEmail.className = 'error-message';

const inputEmail = document.createElement('input');
inputEmail.className = 'input input__email';
inputEmail.required = true;
inputEmail.type = 'email';
inputEmail.addEventListener('input', validityEmail);
inputEmail.placeholder = 'E-mail';

blockEmail.append(inputEmail, errorMessageEmail);

const labelCard = document.createElement('h2');
labelCard.className = 'modal__title';
labelCard.textContent = 'Credit cart detail';

const btnConfirm = document.createElement('button');
btnConfirm.className = 'confirm__btn';
btnConfirm.textContent = 'Confirm';

const cardFront = document.createElement('div');
cardFront.className = 'credit-card';

const divPayment = document.createElement('div');
divPayment.className = 'credit-card-img';

const imgPayment = document.createElement('img');
imgPayment.className = 'credit-card-img';

const inputCardNumber = document.createElement('input');
inputCardNumber.className = 'input__card input__card-number';
imgPayment.src = cardType();
inputCardNumber.addEventListener('input', () => {
    const regExp = new RegExp('[\\D]', 'gi');
    inputCardNumber.value = inputCardNumber.value.replace(regExp, '');
    imgPayment.src = cardType();
    validityCardNumber();
});
inputCardNumber.placeholder = 'Card number';

const cardDetailContainer = document.createElement('div');
cardDetailContainer.className = 'card__detail-row';

const inputCardValid = document.createElement('input');
inputCardValid.className = 'input__card input__card-valid';
inputCardValid.id = 'card-valid';
inputCardValid.placeholder = 'MM/YY';
inputCardValid.addEventListener('input', () => {
    const regExp = new RegExp('[\\D[^\\/]]', 'gi');
    inputCardValid.value = inputCardValid.value.replace(regExp, '');

    inputCardValid.value = inputCardValid.value.length === 2 ? inputCardValid.value + '/' : inputCardValid.value;
    if (inputCardValid.value.length > 5) {
        inputCardValid.value = inputCardValid.value.slice(0, 5);
    }
    validityCardValid();
});
inputCardValid.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
        inputCardValid.value =
            inputCardValid.value.length === 3 ? inputCardValid.value.slice(0, -1) : inputCardValid.value;
    }
});

const labelCardValid = document.createElement('label');
labelCardValid.className = 'card__valid';
labelCardValid.htmlFor = inputCardValid.id;
labelCardValid.textContent = 'VALID:';

const inputCardCVV = document.createElement('input');
inputCardCVV.className = 'input__card input__card-cvv';
inputCardCVV.id = 'card-cvv';
inputCardCVV.placeholder = 'Code';
inputCardCVV.addEventListener('input', () => {
    const regExp = new RegExp('[\\D]', 'gi');
    inputCardCVV.value = inputCardCVV.value.replace(regExp, '');
    inputCardCVV.value = inputCardCVV.value.length > 3 ? inputCardCVV.value.slice(1, 4) : inputCardCVV.value;
    validityCardCVV();
});

const labelCardCVV = document.createElement('label');
labelCardCVV.className = 'card__cvv';
labelCardCVV.htmlFor = inputCardCVV.id;
labelCardCVV.textContent = 'CVV:';

const errorMessageCardNumber = document.createElement('giv');
errorMessageCardNumber.className = 'error-message';

const errorMessageCardValid = document.createElement('giv');
errorMessageCardValid.className = 'error-message';

const errorMessageCardCVV = document.createElement('giv');
errorMessageCardCVV.className = 'error-message';

cardDetailContainer.append(labelCardValid, inputCardValid, labelCardCVV, inputCardCVV);
cardFront.append(inputCardNumber, cardDetailContainer, imgPayment);
formFields.append(labelDetail, blockFullName, blockPhone, blockDelivery, blockEmail);

formFields.append(labelCard, cardFront);
formFields.append(errorMessageCardNumber, errorMessageCardValid, errorMessageCardCVV);
formFields.append(btnConfirm);

function renderModal() {
    content.append(buttonClose);
    content.append(formFields);
    modal.append(content);
}

export function showModal() {
    const header = document.querySelector('#header');
    renderModal();
    document.body.insertBefore(modal, header);
    document.body.classList.add('lock');
    modal.addEventListener('click', hideModal);
    btnConfirm.addEventListener('click', validityModal);
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
function validityModal(e: Event) {
    validityFullName();
    validityPhone();
    validityDelivery();
    validityEmail();
    validityCardNumber();
    validityCardValid();
    validityCardCVV();
    e.preventDefault();
    if (isFullName() && isPhone() && isDelivery() && isEmail() && isCardNumber() && isCardValid() && isCardCVV()) {
        cart.clearCart();
        promo.clearPromos();
        if (content) content.remove();
        modal.innerHTML = '<h3>Thanks for your order.</h3>';
        //Redirect to the store after 0 sec
        setTimeout(() => {
            if (modal) {
                modal.remove();
                document.body.classList.remove('lock');
            }
            history.pushState('', '', window.location.origin + '/');
            window.history.go();
        }, 5000);
    }
}
function validityFullName() {
    if (isFullName()) {
        inputFullName.classList.remove('invalid');
        inputFullName.classList.add('valid');
        errorMessageFullName.textContent = '';
    } else {
        inputFullName.classList.remove('valid');
        inputFullName.classList.add('invalid');
        errorMessageFullName.textContent = ErrorMessage.ERROR_MESSAGE;
    }
}
function validityPhone() {
    if (isPhone()) {
        inputPhone.classList.remove('invalid');
        inputPhone.classList.add('valid');
        errorMessagePhone.textContent = '';
    } else {
        inputPhone.classList.remove('valid');
        inputPhone.classList.add('invalid');
        errorMessagePhone.textContent = ErrorMessage.ERROR_MESSAGE;
    }
}
function validityDelivery() {
    if (isDelivery()) {
        inputDelivery.classList.remove('invalid');
        inputDelivery.classList.add('valid');
        errorMessageDelivery.textContent = '';
    } else {
        inputDelivery.classList.remove('valid');
        inputDelivery.classList.add('invalid');
        errorMessageDelivery.textContent = ErrorMessage.ERROR_MESSAGE;
    }
}
function validityEmail() {
    if (isEmail()) {
        inputEmail.classList.remove('invalid');
        inputEmail.classList.add('valid');
        errorMessageEmail.textContent = '';
    } else {
        inputEmail.classList.remove('valid');
        inputEmail.classList.add('invalid');
        errorMessageEmail.textContent = ErrorMessage.ERROR_MESSAGE;
    }
}
function validityCardNumber() {
    if (isCardNumber()) {
        inputCardNumber.classList.remove('invalid-card');
        inputCardNumber.classList.add('valid-card');
        errorMessageCardNumber.textContent = '';
    } else {
        inputCardNumber.classList.remove('valid-card');
        inputCardNumber.classList.add('invalid-card');
        errorMessageCardNumber.textContent = ErrorMessage.ERROR_CARD_NUMBER;
    }
}
function validityCardValid() {
    if (isCardValid()) {
        inputCardValid.classList.remove('invalid-card');
        inputCardValid.classList.add('valid-card');
        errorMessageCardValid.textContent = '';
    } else {
        inputCardValid.classList.remove('valid-card');
        inputCardValid.classList.add('invalid-card');
        errorMessageCardValid.textContent = ErrorMessage.ERROR_CARD_VALID;
    }
}
function validityCardCVV() {
    if (isCardCVV()) {
        inputCardCVV.classList.remove('invalid-card');
        inputCardCVV.classList.add('valid-card');
        errorMessageCardCVV.textContent = '';
    } else {
        inputCardCVV.classList.remove('valid-card');
        inputCardCVV.classList.add('invalid-card');
        errorMessageCardCVV.textContent = ErrorMessage.ERROR_CARD_CVV;
    }
}
function isFullName() {
    const arrayFullName = inputFullName.value.replace(/\s+/g, ' ').trim().split(' ');
    if (arrayFullName.length < 2) {
        return false;
    }
    const regExp = new RegExp('(^[A-ZА-ЯЁ]{3,})', 'i');
    return arrayFullName.every((elem: string) => regExp.test(elem));
}
function isPhone() {
    const regExp = new RegExp('^\\+([0-9]{9,})', 'i');
    return regExp.test(inputPhone.value);
}
function isDelivery() {
    const arrayDelivery = inputDelivery.value.replace(/\s+/g, ' ').trim().split(' ');
    if (arrayDelivery.length < 3) {
        return false;
    }
    const regExp = new RegExp('(^[A-ZА-ЯЁ0-9,\\-\\/]{5,})', 'i');
    return arrayDelivery.every((elem: string) => regExp.test(elem));
}
function isEmail() {
    const regExp = new RegExp('^\\S+@\\S+\\.\\S+$', 'i');
    return regExp.test(String(inputEmail.value));
}

function isCardNumber() {
    const regExp = new RegExp('^([0-9]{16})$', 'i');
    return regExp.test(inputCardNumber.value);
}
function isCardValid() {
    const regExp = new RegExp('^([0][1-9]|[1][1-2]/[0-9]{2,2})', 'i');
    return regExp.test(inputCardValid.value);
}

function isCardCVV() {
    const regExp = new RegExp('^([0-9]{3})$', 'i');
    return regExp.test(inputCardCVV.value.replace(/\s+/g, ''));
}

function cardType() {
    const number = inputCardNumber.value;
    let regExp = new RegExp('^4');
    if (number.match(regExp) != null) {
        return `${payment.visa}`;
    }

    regExp = new RegExp('^(34|37)');
    if (number.match(regExp) != null) {
        return `${payment.amex}`;
    }

    regExp = new RegExp('^5[1-5]');
    if (number.match(regExp) != null) {
        return `${payment.mastercard}`;
    }

    regExp = new RegExp('^6011');
    if (number.match(regExp) != null) {
        return `${payment.discover}`;
    }

    regExp = new RegExp('^62');
    if (number.match(regExp) != null) {
        return `${payment.unionpay}`;
    }

    regExp = new RegExp('^9792');
    if (number.match(regExp) != null) {
        return `${payment.troy}`;
    }

    regExp = new RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}');
    if (number.match(regExp) != null) {
        return `${payment.dinersclub}`;
    }

    regExp = new RegExp('^35(2[89]|[3-8])');
    if (number.match(regExp) != null) {
        return `${payment.jcb}`;
    }
    return `${payment.chip}`;
}
