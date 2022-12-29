import { Product } from '../../models/types';
import { searchParams } from './products';

export const searchCont = document.createElement('div');
searchCont.className = 'filter__search';

export const searchIn = document.createElement('input');
searchIn.type = 'search';
searchIn.id = 'search';
searchIn.className = 'filter__search-input';
searchIn.placeholder = 'Search product';

searchCont.append(searchIn);

export function searchProducts(data: Product[]) {
    const searchValue: string | null = searchParams.get('search');
    if (searchValue) {
        searchIn.value = searchValue;
    }
    let prodItems: Product[] = data;
    prodItems = data.filter(
        (item) =>
            item.title.toLowerCase().includes(searchIn.value.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchIn.value.toLowerCase()) ||
            item.category.toLowerCase().includes(searchIn.value.toLowerCase()) ||
            item.description.toLowerCase().includes(searchIn.value.toLowerCase()) ||
            item.price.toString().includes(searchIn.value) ||
            item.stock.toString().includes(searchIn.value) ||
            item.discountPercentage.toString().includes(searchIn.value)
    );
    return prodItems;
}

function setSearchValueToSearchParams() {
    searchParams.set('search', searchIn.value);
    if (!searchIn.value) {
        searchParams.delete('search');
    }
}

searchIn.addEventListener('input', setSearchValueToSearchParams);
