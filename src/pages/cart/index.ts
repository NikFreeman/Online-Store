import './cart.scss';
import '../../components/elements/cart-item';
import CartController from '../../components/controller/cartController';
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
    app?.removeEventListener('remove-item', removeItem);
    app?.addEventListener('remove-item', removeItem);

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
        app.innerHTML = `<div>
            <h3 class="cart__title">Cart</h3>
            
            <div class='cart__wrapper'>            
            <div class='cart__summary'>
            <h2 class='summary__title'>Summary</h2>
            <p> Products: <span class='summary__product-value'>23</span></p>
            <p> Total: <span class='summary__total-value'>222</span></p>
            <h4>Promo</h4>
            <input class='summary__promo'>
            <button class='summary__buy'>Buy now</button>
            </div>
        </div>
        `;
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
    pageCart();
}

export default pageCart;
