import { Product, GroupeBy } from '../models/types';

export function groupeByBrand(data: Product[]): GroupeBy {
    const groupedByBrand: GroupeBy = {};
    for (const item of data) {
        if (groupedByBrand[item.brand.toUpperCase()]) {
            groupedByBrand[item.brand.toUpperCase()].push(item);
        } else {
            groupedByBrand[item.brand.toUpperCase()] = [item];
        }
    }
    return groupedByBrand;
}

export function groupeByCategory(data: Product[]): GroupeBy {
    const groupedByCategory: GroupeBy = {};
    for (const item of data) {
        if (groupedByCategory[item.category.toLowerCase()]) {
            groupedByCategory[item.category.toLowerCase()].push(item);
        } else {
            groupedByCategory[item.category.toLowerCase()] = [item];
        }
    }
    return groupedByCategory;
}
