class StorageBox {
    static setStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    static getStorage(key: string) {
        return localStorage.getItem(key);
    }
}
export default StorageBox;
