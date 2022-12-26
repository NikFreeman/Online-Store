import Cart from '../../models/Cart/Cart';
import ErrorMessage from '../../models/error-message';
import StorageBox from '../../utils/storage';
class CartController {
    public cart: Cart[];
    constructor() {
        const storage = StorageBox.getStorage('cart');
        const arr = storage ? JSON.parse(storage) : [];
        this.cart = arr;
    }
    addProduct(id: number, count = 1, price: number) {
        const product: Cart = {
            id: id,
            count: count,
            price: price,
        };
        this.cart.push(product);
        StorageBox.setStorage('cart', JSON.stringify(this.cart));
    }
    removeProduct(id: number) {
        const removeIndex = this.indexProduct(id);
        if (removeIndex !== -1) {
            this.cart.splice(removeIndex, 1);
            StorageBox.setStorage('cart', JSON.stringify(this.cart));
        }
        return [];
    }

    indexProduct(id: number) {
        const idx = this.cart.findIndex((elem) => elem.id === id);
        return idx;
    }

    addCountProduct(id: number, count: number) {
        const index = this.indexProduct(id);
        if (index !== -1) {
            this.cart[index].count += count;
            StorageBox.setStorage('cart', JSON.stringify(this.cart));
        } else {
            throw new Error(ErrorMessage.notProductInCart);
        }
    }

    removeCountProduct(id: number, count = 1) {
        const index = this.indexProduct(id);
        if (index !== -1) {
            this.cart[index].count -= count;
            StorageBox.setStorage('cart', JSON.stringify(this.cart));
            if (this.cart[index].count <= 0) {
                this.removeProduct(id);
            }
        } else {
            throw new Error(ErrorMessage.notProductInCart);
        }
    }

    getCart() {
        return this.cart;
    }
}
export default CartController;
