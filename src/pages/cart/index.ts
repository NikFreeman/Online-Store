import '../../components/elements/cart-item';
import StorageBox from '../../utils/storage';
import CartController from '../../components/controller/cartController';
//тестовое значение корзины
const cartTest = new CartController();
cartTest.addProduct(3, 1, 100);
cartTest.addProduct(23, 1, 110);
cartTest.addProduct(26, 5, 112);
cartTest.addProduct(78, 6, 214);
cartTest.addProduct(34, 2, 657);
StorageBox.setStorage('cart', JSON.stringify(cartTest));
//------

const storage = StorageBox.getStorage('cart');
const tempArray = storage ? JSON.parse(storage) : [];
const cart = new CartController(tempArray);

console.log(cart);
function pageCart() {
    const counts = `<div>
                      <cart-item src='https://i.dummyjson.com/data/products/1/thumbnail.jpg' count='4' price ='456'>
                       <span slot='title'>IPhone 9</span>
                       <span slot='description'>The IPhone bad smartphone </span>                       
                      </cart-item>
                      <cart-item></cart-item>
                    </div>`;
    return counts;
}
export default pageCart;
