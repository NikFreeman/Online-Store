import Cart from '../../models/Cart/Cart';
import ErrorMessage from '../../models/error-message';
class CartController {
    public cart: Cart[];
    constructor(arr = []) {
        this.cart = arr;
    }
    addProduct(id: number, count = 1, price: number) {
        // const addIndex = this.indexProduct(id);
        // if (addIndex === -1) {
        const product: Cart = {
            id: id,
            count: count,
            price: price,
        };
        this.cart.push(product);
        // } else {
        //     this.addCountProduct(id, count);
        // }
    }
    removeProduct(id: number) {
        const removeIndex = this.indexProduct(id);
        if (removeIndex !== -1) {
            return this.cart.splice(removeIndex, 1);
        }
        return [];
    }

    indexProduct(id: number) {
        return this.cart.findIndex((elem) => (elem.id = id));
    }

    addCountProduct(id: number, count: number) {
        const index = this.indexProduct(id);
        if (index !== -1) {
            this.cart[index].count += count;
        } else {
            throw new Error(ErrorMessage.notProductInCart);
        }
    }

    removeCountProduct(id: number, count = 1) {
        const index = this.indexProduct(id);
        if (index !== -1) {
            this.cart[index].count -= count;
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
