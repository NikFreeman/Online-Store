import Cart from '../../models/Cart/Cart';
import ErrorMessage from '../../models/error-message';
import StorageBox from '../../utils/storage';

class CartController {
    public cart: Cart[];
    constructor() {
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
            StorageBox.setStorage(this.cart);
        }
    }
    removeProduct(id: number) {
        const removeIndex = this.getProductIndex(id);
        if (removeIndex !== -1) {
            this.cart.splice(removeIndex, 1);
            StorageBox.setStorage(this.cart);
        }
        return [];
    }

    getProductIndex(id: number) {
        const idx = this.cart.findIndex((elem) => elem.id === id);
        return idx;
    }

    addProductCount(id: number, count: number) {
        const index = this.getProductIndex(id);
        if (index !== -1) {
            this.cart[index].count += count;
            StorageBox.setStorage(this.cart);
        } else {
            throw new Error(ErrorMessage.PRODUCT_NOT_IN_CART);
        }
    }

    reduceProductCount(id: number, count = 1) {
        const index = this.getProductIndex(id);
        if (index !== -1) {
            this.cart[index].count -= count;
            StorageBox.setStorage(this.cart);
            if (this.cart[index].count <= 0) {
                this.removeProduct(id);
            }
        } else {
            throw new Error(ErrorMessage.PRODUCT_NOT_IN_CART);
        }
    }

    getCart() {
        return this.cart;
    }
}
export default CartController;
