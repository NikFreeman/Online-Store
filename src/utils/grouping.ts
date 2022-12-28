import { Product, GroupedBy } from '../models/types';

export function groupByBrand(data: Product[]): GroupedBy {
    const groupedByBrand: GroupedBy = {};
    for (const item of data) {
        if (groupedByBrand[item.brand.toUpperCase()]) {
            groupedByBrand[item.brand.toUpperCase()].push(item);
        } else {
            groupedByBrand[item.brand.toUpperCase()] = [item];
        }
    }
    return groupedByBrand;
}

export function groupByCategory(data: Product[]): GroupedBy {
    const groupedByCategory: GroupedBy = {};
    for (const item of data) {
        if (groupedByCategory[item.category.toLowerCase()]) {
            groupedByCategory[item.category.toLowerCase()].push(item);
        } else {
            groupedByCategory[item.category.toLowerCase()] = [item];
        }
    }
    return groupedByCategory;
}
