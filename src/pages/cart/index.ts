import './cart.scss';
import '../../components/elements/cart-item';
import CartController from '../../components/controller/cartController';
import PromoCodes from '../../models/promo-codes';
import { ProductsController } from '../../components/controller/productsController';
import { Product } from './../../models/Product';

//тестовое значение корзины
localStorage.removeItem('cart');
const cartTest = new CartController();
cartTest.addProduct(3, 1, 100);
cartTest.addProduct(23, 1, 110);
cartTest.addProduct(26, 5, 112);
cartTest.addProduct(78, 6, 214);
cartTest.addProduct(34, 2, 657);

//------

const cart = new CartController();

function renderItem(product: Product, count: number, price: number) {
    const template = document.createElement('template');
    template.innerHTML = `
    <div>
      <cart-item src=${product.thumbnail} count=${count} price =${price} id=${product.id} stock=${product.stock}>
        <span slot='title'>${product.title}</span>
        <span slot='description'>${product.description}</span>
        <span slot='stock'>${product.stock}</span>
        <span slot='category'>${product.category}</span>
        <span slot='rating'>${product.rating}</span>
      </cart-item>    
  </div>`;
    return template;
}

function pageCartRender() {
    const app = document.getElementById('App');
    if (app) {
        app.removeEventListener('remove-item', removeItem);
        app.removeEventListener('counted-id', changeProductCount);
        app.addEventListener('remove-item', removeItem);
        app.addEventListener('counted-id', changeProductCount);
    }
    const cartItem = cart
        .getCart()
        .map(({ id, count, price }) =>
            ProductsController.getProductDetails(id).then((data) => renderItem(data, count, price))
        );
    return Promise.all(cartItem);
}
async function pageCart() {
    const app = document.getElementById('App'); //Kochab
    if (app) {
        app.innerHTML = `<div class='wrapper'>
            <h3 class="cart__title">Products in Cart</h3>
            
            <div class='cart__wrapper'>            
            <div class='cart__summary'>
            <h2 class='summary__title'>Summary</h2>
            <p> Products: <span class='summary__product-value'></span></p>
            <p> Total: <span class='summary__not-promo'></span> $<span class='summary__total-value'></span></p>
            <div class=''>
            <h4>Promo</h4>
            <div class = 'summary__promo'>
            <input type='text' class='summary__input'>
            <button class='summary__btn'>Apply</button>
            </div>
            <button class='summary__btn summary__buy'>Buy now</button>
            </div>
        </div>
        `;
        const inputPromo = app.querySelector('.summary__promo');
        inputPromo?.removeEventListener('input', handleInputPromo);
        inputPromo?.addEventListener('input', handleInputPromo);
    }

    const div = document.createElement('div');
    div.classList.add('cart__items');
    const data = await pageCartRender();
    const divTemp = data.reduce(function (div_1, template) {
        div_1.appendChild(template.content.cloneNode(true));
        return div_1;
    }, div);
    if (app) {
        const cartWrapper = app.querySelector('.cart__wrapper');
        if (cartWrapper) {
            cartWrapper.insertBefore(divTemp, cartWrapper.firstChild);
        }
    }
}

function removeItem(e: Event) {
    const id = Number((e as CustomEvent).detail);
    cart.removeProduct(id);
    renderRemoveCartItem(id);
    setSummaryInfo();
}

function changeProductCount(e: Event) {
    const { id, count } = (e as CustomEvent).detail;
    cart.setProductCount(Number(id), Number(count));
    setSummaryInfo();
}

function renderRemoveCartItem(id: number) {
    const cartItems = document.querySelector('.cart__items');
    if (cartItems) {
        const item = cartItems.querySelector(`cart-item[id="${id}"]`);
        if (item) {
            const removeItem = item.closest('div') as Node;
            cartItems.removeChild(removeItem);
        }
        if (cartItems.children.length === 0) {
            cartItems.innerHTML = '<div class="top"><h3>Cart is empty</h3> </div>';
        }
    }
}
function setSummaryInfo() {
    const summaryProductCount = document.querySelector('.summary__product-value');
    const summaryProductAmount = document.querySelector('.summary__total-value');
    if (summaryProductCount) {
        summaryProductCount.textContent = `${cart.getSummaryCount()}`;
    }
    if (summaryProductAmount) {
        summaryProductAmount.textContent = `${cart.getSummaryAmount()}`;
    }
}
function handleInputPromo(e: Event) {
    console.log(PromoCodes);
    console.log(e.target);
}

export default pageCart;
