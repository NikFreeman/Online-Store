import { promoCodes } from '../../utils/promo-codes';
import { Keys } from '../../models/types';
import StorageBox from '../../utils/storage';
import Promo from '../../models/Cart/Promo';

class PromoController {
    public appliedPromos: Promo[];
    private storageKey: Keys = 'promo';
    constructor() {
        StorageBox.key = this.storageKey;
        this.appliedPromos = StorageBox.getStorage();
    }
    addPromo(value: string) {
        const idx = this.getPromoIndex(value);
        if (idx !== -1) {
            const tempPromo = {
                id: value,
                discount: promoCodes[idx].discount,
            };
            if (this.isPromoExists(value)) {
                this.appliedPromos.push(tempPromo);
                StorageBox.key = this.storageKey;
                StorageBox.setStorage(this.appliedPromos);
            }
        }
    }
    removePromo(value: string) {
        const removeIndex = this.getAppliedPromosIndex(value);
        if (removeIndex !== -1) {
            this.appliedPromos.splice(removeIndex, 1);
            StorageBox.key = this.storageKey;
            StorageBox.setStorage(this.appliedPromos);
            return true;
        }
        return false;
    }
    getPromoIndex(value: string) {
        return promoCodes.findIndex((el) => el.id === value);
    }
    getAppliedPromosIndex(value: string) {
        return this.appliedPromos.findIndex((el) => el.id === value);
    }
    getPromos() {
        return this.appliedPromos;
    }
    getSummaryDiscount() {
        return this.appliedPromos.reduce((acc, item) => acc + item.discount, 0);
    }
    isPromoExists(value: string) {
        return promoCodes.findIndex((el) => el.id === value) !== -1;
    }

    isPromoAlreadyApplied(value: string) {
        return this.appliedPromos.findIndex((el) => el.id === value) !== -1;
    }
}

export default PromoController;
