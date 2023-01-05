import './cart.scss';
import '../../components/elements/cart-item';
import CartController from '../../components/controller/cartController';
import { ProductsController } from '../../components/controller/productsController';
import { promo, renderApplyPromo } from './promo';
import { Product } from './../../models/Product';

export const cart = new CartController();

const cartEmpty = '<h3>Cart is empty</h3>';

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
        app.removeEventListener('update-cart', setSummaryInfo);
        app.addEventListener('remove-item', removeItem);
        app.addEventListener('counted-id', changeProductCount);
        app.addEventListener('update-cart', setSummaryInfo);
    }
    const cartItem = cart
        .getCart()
        .map(({ id, count, price }) =>
            ProductsController.getProductDetails(id).then((data) => renderItem(data, count, price))
        );
    return Promise.all(cartItem);
}
async function pageCart() {
    const app = document.getElementById('App');
    if (app) {
        app.innerHTML = `
        <div class='wrapper'>
          <h3 class="cart__title">Products in Cart</h3>
          <div class='cart__wrapper'>
             <div class='cart__items'>
             <h3>Cart is loaded</h3> 
             </div>            
             <div class='cart__summary'>
               <h2 class='summary__title'>Summary</h2>
               <p class = 'summary__subtitle'> Products:
                  <span class='summary__product-value'></span>
               </p>
               <p class = 'summary__subtitle'> Total:
                 <span class='summary__not-promo'></span>
                 <span class='summary__total-value'></span>
               </p>
            <div class='summary__promo'>
            <h2 class='summary__title'>Promo</h2>            
            <div class = 'summary__buttons'>
            <input type='text' class='summary__input'>
            <button id='btn-apply' disabled class='summary__btn'>Apply</button>
            <p class = 'summary__subtitle'>Test 'NG2023', 'EPM', 'RS-SCHOOL' </p>
            </div>
            <button class='summary__btn summary__buy'>Buy now</button>
            </div>
        </div>
        `;
        const inputPromo = app.querySelector('.summary__input');
        inputPromo?.removeEventListener('input', handleInputPromo);
        inputPromo?.addEventListener('input', handleInputPromo);
    }

    const div = document.createDocumentFragment();
    const data = await pageCartRender();
    const divTemp = data.reduce(function (div_1, template) {
        div_1.appendChild(template.content.cloneNode(true));
        return div_1;
    }, div);
    if (app) {
        const cartWrapper = app.querySelector('.cart__items');
        if (cartWrapper) {
            cartWrapper.innerHTML = '';
            if (divTemp.children.length == 0) {
                cartWrapper.innerHTML = cartEmpty;
            } else {
                cartWrapper.append(divTemp);
            }
        }
    }
    renderApplyPromo();
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
            cartItems.innerHTML = cartEmpty;
        }
    }
}
function setSummaryInfo() {
    const summaryProductCount = document.querySelector('.summary__product-value');
    if (summaryProductCount) {
        summaryProductCount.textContent = `${cart.getSummaryCount()}`;
    }
    const summaryNotDiscount = document.querySelector('.summary__not-promo');
    const summaryProductAmount = document.querySelector('.summary__total-value');
    if (promo.getPromos().length !== 0) {
        const summaryDiscount = promo.getSummaryDiscount();
        if (summaryNotDiscount) {
            summaryNotDiscount.textContent = `$${cart.getSummaryAmount()}`;
        }
        const discount = cart.getSummaryAmount() - (cart.getSummaryAmount() * summaryDiscount) / 100;
        if (summaryProductAmount) {
            summaryProductAmount.textContent = `$${discount}`;
        }
    } else {
        if (summaryProductAmount) {
            summaryProductAmount.textContent = `$${cart.getSummaryAmount()}`;
        }
        if (summaryNotDiscount) {
            summaryNotDiscount.textContent = '';
        }
    }
}

function handleInputPromo(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const btnApply = document.querySelector('#btn-apply') as HTMLButtonElement;
    if (e.currentTarget as HTMLInputElement) {
        const promoKey = input.value.toUpperCase();
        if (promo.isPromoExists(promoKey) && !promo.isPromoAlreadyApplied(promoKey)) {
            btnApply.disabled = false;
            btnApply.addEventListener('click', handleApplyPromo);
        } else {
            btnApply.disabled = true;
            btnApply.removeEventListener('click', handleApplyPromo);
        }
    }
}

function handleApplyPromo() {
    const input = document.querySelector('.summary__input') as HTMLInputElement;
    const promoKey = input.value.toUpperCase();
    const btnApply = document.querySelector('#btn-apply') as HTMLButtonElement;
    if (promo.isPromoExists(promoKey) && !promo.isPromoAlreadyApplied(promoKey)) {
        promo.addPromo(promoKey);
        renderApplyPromo();
        btnApply.disabled = true;
        btnApply.removeEventListener('click', handleApplyPromo);
        input.value = '';
    }
}

export default pageCart;
