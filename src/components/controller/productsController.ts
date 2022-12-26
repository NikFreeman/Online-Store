import { Product } from '../../models/Product';

export class ProductsController {
    static urlBase = 'https://dummyjson.com/products';
    static async getProductDetails(id: number) {
        const url = `${this.urlBase}/${id}`;
        const res = await fetch(url);
        const data: Product = await res.json();
        return data;
    }
}
