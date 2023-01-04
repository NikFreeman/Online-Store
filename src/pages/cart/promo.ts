import PromoController from '../../components/controller/promoController';

export const promo = new PromoController();

export function renderApplyPromo() {
    let promoKey = document.querySelector('.promo__items');
    if (!promoKey) {
        promoKey = document.createElement('div');
        promoKey.className = 'promo__items';
        promoKey.addEventListener('click', handlePromoRemote);
    }
    promo.getPromo().map((item) => {
        const promo = document.querySelector(`#${item.id}`);
        console.log(promo);
        if (!promo) {
            const promo = document.createElement('div');
            promo.className = 'promo__item';
            promo.setAttribute('id', item.id);

            const promoName = document.createElement('span');
            promoName.className = 'promo__item-name';
            promoName.textContent = `${item.id}`;

            const promoDiscount = document.createElement('span');
            promoDiscount.className = 'promo__item-discount';
            promoDiscount.textContent = ` - ${item.discount}%`;

            const promoRemove = document.createElement('button');
            promoRemove.className = 'promo__item-remove';
            promoRemove.textContent = 'X';

            promo.append(promoName, promoDiscount, promoRemove);

            promoKey?.append(promo);
        }
    });

    const blockPromo = document.querySelector('.summary__promo');
    const buttonsPromo = document.querySelector('.summary__buttons');
    blockPromo?.insertBefore(promoKey, buttonsPromo);
}
function handlePromoRemote(e: Event) {
    if (e.target instanceof HTMLButtonElement) {
        const promoItems = document.querySelector('.promo__items');
        const btn = e.target;
        const removeItem = btn.closest('div') as HTMLDivElement;
        console.log(removeItem);
        const id = removeItem.getAttribute('id');
        console.log(id);
        if (id) {
            promo.removePromo(id);
        }
        if (promoItems) {
            promoItems.removeChild(removeItem);
        }
    }
}
