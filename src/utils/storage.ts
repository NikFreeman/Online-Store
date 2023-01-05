import { Keys } from '../models/types';
class StorageBox {
    static key: Keys;
    static setStorage<T>(value: T) {
        localStorage.setItem(StorageBox.key, JSON.stringify(value));
    }
    static getStorage() {
        const storage = localStorage.getItem(StorageBox.key);
        return storage ? JSON.parse(storage) : [];
    }
}
export default StorageBox;
