import { promoCodes } from '../../utils/promo-codes';
import { Keys } from '../../models/types';
import StorageBox from '../../utils/storage';
import Promo from '../../models/Cart/Promo';

class PromoController {
    public applyPromo: Promo[];
    private storageKey: Keys = 'promo';
    constructor() {
        StorageBox.key = this.storageKey;
        this.applyPromo = StorageBox.getStorage();
    }
    addPromo(value: string) {
        const idx = this.getPromoIndex(value);
        if (idx !== -1) {
            const tempPromo = {
                id: value,
                discount: promoCodes[idx].discount,
            };
            if (this.getApplyPromoIndex(value) === -1) {
                this.applyPromo.push(tempPromo);
                StorageBox.key = this.storageKey;
                StorageBox.setStorage(this.applyPromo);
            }
        }
    }
    removePromo(value: string) {
        const removeIndex = this.getApplyPromoIndex(value);
        if (removeIndex !== -1) {
            this.applyPromo.splice(removeIndex, 1);
            StorageBox.key = this.storageKey;
            StorageBox.setStorage(this.applyPromo);
        }
    }
    getPromoIndex(value: string) {
        return promoCodes.findIndex((el) => el.id === value);
    }
    getApplyPromoIndex(value: string) {
        return this.applyPromo.findIndex((el) => el.id === value);
    }
    getPromo() {
        return this.applyPromo;
    }
    getSummaryDiscount() {
        return this.applyPromo.reduce((acc, item) => acc + item.discount, 0);
    }
}

export default PromoController;
