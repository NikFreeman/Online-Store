import Cart from '../models/Cart/Cart';

class StorageBox {
    static key = 'cart';
    static setStorage(value: Cart[]) {
        localStorage.setItem(StorageBox.key, JSON.stringify(value));
    }
    static getStorage() {
        const storage = localStorage.getItem(StorageBox.key);
        return storage ? JSON.parse(storage) : [];
    }
}
export default StorageBox;
