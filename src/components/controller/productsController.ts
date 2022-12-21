import { Product } from '../../models/Product';

export class Products {
    public products: Product[];
    constructor() {
        this.products = [];
    }

    setProducts(arr: Product[]) {
        this.products = arr;
    }

    getProduct() {
        return this.products;
    }

    isProduct(id: number) {
        return this.products.findIndex((elem) => (elem.id = id)) !== -1;
    }

    getProductDetails(id: number) {
        const index = this.products.findIndex((elem) => (elem.id = id));
        if (index !== -1) {
            return this.products[index];
        }
    }
}
