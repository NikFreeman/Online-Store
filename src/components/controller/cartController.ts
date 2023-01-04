import Cart from '../../models/Cart/Cart';
import { Keys } from '../../models/types';
import ErrorMessage from '../../models/error-message';
import StorageBox from '../../utils/storage';

class CartController {
    public cart: Cart[];
    private storageKey: Keys = 'cart';
    constructor() {
        StorageBox.key = this.storageKey;
        this.cart = StorageBox.getStorage();
    }
    addProduct(id: number, count = 1, price: number) {
        const product: Cart = {
            id: id,
            count: count,
            price: price,
        };
        if (this.getProductIndex(id)) {
            this.cart.push(product);
            StorageBox.key = this.storageKey;
            StorageBox.setStorage(this.cart);
        }
    }
    removeProduct(id: number) {
        const removeIndex = this.getProductIndex(id);
        if (removeIndex !== -1) {
            this.cart.splice(removeIndex, 1);
            StorageBox.key = this.storageKey;
            StorageBox.setStorage(this.cart);
        }
        return [];
    }

    getProductIndex(id: number) {
        const idx = this.cart.findIndex((elem) => elem.id === id);
        return idx;
    }

    setProductCount(id: number, count: number) {
        const index = this.getProductIndex(id);
        if (index !== -1) {
            this.cart[index].count = count;
            StorageBox.key = this.storageKey;
            StorageBox.setStorage(this.cart);
        } else {
            throw new Error(ErrorMessage.PRODUCT_NOT_IN_CART);
        }
    }
    getSummaryCount() {
        return this.cart.reduce((acc, item) => acc + item.count, 0);
    }
    getSummaryAmount() {
        return this.cart.reduce((acc, item) => acc + item.count * item.price, 0);
    }
    getCart() {
        return this.cart;
    }
}
export default CartController;
