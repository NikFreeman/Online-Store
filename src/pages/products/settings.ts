import { Product } from '../../models/types';
import { searchParams, sizeContainer, sortContainer } from './products';

export function sortItems(data: Product[]) {
    const sortMethod: string | undefined = sortContainer.querySelector('input:checked')?.id;
    switch (sortMethod) {
        case 'sort-1':
            searchParams.set('sort', '1');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            return data.sort((a, b) => a.price - b.price);
        case 'sort-2':
            searchParams.set('sort', '2');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            return data.sort((a, b) => b.price - a.price);
        case 'sort-3':
            searchParams.set('sort', '3');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            return data.sort((a, b) => a.rating - b.rating);
        case 'sort-4':
            searchParams.set('sort', '4');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            return data.sort((a, b) => b.rating - a.rating);
        default:
            return data;
    }
}

export function switchSizeItems() {
    type SizeMethod = 'Small' | 'Large';
    const sizeMethod = (sizeContainer.querySelector('input:checked') as HTMLInputElement)?.value as SizeMethod;
    switch (sizeMethod) {
        case 'Small':
            searchParams.set('size', 'small');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            document.documentElement.style.setProperty('--cards-multiplier', '1.5');
            document.documentElement.style.setProperty('--direction-for-btns', 'column');
            break;
        case 'Large':
            searchParams.set('size', 'large');
            window.history.replaceState(null, '', '?' + searchParams.toString());
            document.documentElement.style.setProperty('--cards-multiplier', '1');
            document.documentElement.style.removeProperty('--direction-for-btns');
            break;
        default:
            (sizeContainer.querySelector('#size-large') as HTMLInputElement).checked = true;
            document.documentElement.style.setProperty('--cards-multiplier', '1');
            document.documentElement.style.removeProperty('--direction-for-btns');
    }
}

export class RangeSettings {
    data: Product[];
    constructor(data: Product[]) {
        this.data = data;
    }
    minPrice() {
        return this.data.reduce((min, prod) => (prod.price < min ? prod.price : min), this.data[0].price);
    }
    maxPrice() {
        return this.data.reduce((max, prod) => (prod.price > max ? prod.price : max), this.data[0].price);
    }
    minStock() {
        return this.data.reduce((min, prod) => (prod.stock < min ? prod.stock : min), this.data[0].stock);
    }
    maxStock() {
        return this.data.reduce((max, prod) => (prod.stock > max ? prod.stock : max), this.data[0].stock);
    }
}
