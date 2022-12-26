import '../../components/elements/cart-item';
import StorageBox from '../../utils/storage';
import CartController from '../../components/controller/cartController';
import { ProductsController } from '../../components/controller/productsController';
import { Product } from './../../models/Product';

//тестовое значение корзины
const cartTest = new CartController();
cartTest.addProduct(3, 1, 100);
cartTest.addProduct(23, 1, 110);
cartTest.addProduct(26, 5, 112);
cartTest.addProduct(78, 6, 214);
cartTest.addProduct(34, 2, 657);
StorageBox.setStorage('cart', JSON.stringify(cartTest.getCart()));

//------
const storage = StorageBox.getStorage('cart');
const cartArray = storage ? JSON.parse(storage) : [];
const cart = new CartController(cartArray);

function renderItem(product: Product, count: number, price: number) {
    const template = document.createElement('template');
    template.innerHTML = `<div>
    <cart-item src=${product.thumbnail} count=${count} price =${price} id=${product.id} stock=${product.stock}>
     <span slot='title'>${product.title}</span>
     <span slot='description'>${product.description}</span>
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
    const div = document.createElement('div');
    const data = await pageCartRender();
    const divTemp = data.reduce(function (div_1, template) {
        div_1.appendChild(template.content.cloneNode(true));
        return div_1;
    }, div);
    // kochab
    if (app) {
        app.innerHTML = '';
        app.appendChild(divTemp);
    }
}
function removeItem(e: Event) {
    const id = Number((e as CustomEvent).detail);
    console.log(id);
    console.log(cart);
    cart.removeProduct(id);
    console.log(cart);
    StorageBox.setStorage('cart', JSON.stringify(cartTest.getCart()));
    pageCart();
}

export default pageCart;
