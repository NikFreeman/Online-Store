import StorageBox from '../../utils/storage';
import CartController from '../../components/controller/cartController';

const storage = StorageBox.getStorage('cart');
const tempArray = storage ? JSON.parse(storage) : [];
const cart = new CartController(tempArray);

console.log(cart);
