import '../../components/elements/cart-item';
import StorageBox from '../../utils/storage';
import CartController from '../../components/controller/cartController';

const storage = StorageBox.getStorage('cart');
const tempArray = storage ? JSON.parse(storage) : [];
const cart = new CartController(tempArray);

console.log(cart);
function pageCart() {
    const counts = `<div>
                      <cart-item src='https://i.dummyjson.com/data/products/1/thumbnail.jpg' count='3'>
                       <span slot='title'>IPhone 9</span>
                       <slot='src'></slot>
                      </cart-item>
                      <cart-item></cart-item>
                    </div>`;
    return counts;
}
export default pageCart;
