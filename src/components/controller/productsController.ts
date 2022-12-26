import { Product } from '../../models/Product';

export class ProductsController {
    // setProducts(arr: Product[]) {
    //     this.products = arr;
    // }

    static async getProductDetails(id: number) {
        const urlBase = 'https://dummyjson.com/products/';
        const url = urlBase + String(id);
        const res = await fetch(url);
        const data: Product = await res.json();
        return data;
        // const index = this.products.findIndex((elem) => (elem.id = id));
        // if (index !== -1) {
        //     return this.products[index];
        // }
    }
}
