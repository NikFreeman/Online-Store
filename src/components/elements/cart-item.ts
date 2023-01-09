import './counter-element';

const styles = `

* {
    margin-block-end:0;
    margin-block-start:0;
}
.cart__item-thumbnail {
    grid-area: thumbnail;
    width: 160px;
    height: 80px;
    border-radius: 10px;
  }
  .cart__item {
    margin-top: 10px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 160px 1fr 1fr 120px; 
    grid-template-rows: 20px 30px 30px 30px;
    column-gap: 10px;
    grid-template-areas:
      'thumbnail title title remove'
      'thumbnail description description stock'
      'thumbnail catalog rating count'
      'thumbnail catalog rating amount';
  }
  .cart__item-title {
    grid-area: title;
    font-family: 'Geometria';
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 21px;
    color: #009FDF;
    text-decoration: none;
  }

  .cart__item-amount {
    grid-area: amount;
    justify-self: center;
    align-self: center;    
  }

  .cart__item-amount-item {
    font-weight: bold;
  }

  .cart__item-description {
    grid-area: description;
    margin-bottom: 1rem;
  }

  .cart__item-remove {
    grid-area: remove;
    justify-self: end;    
    background: linear-gradient(90deg, #0099DC 7.09%, #3CC39D 93.66%);
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
    border-radius: 5px;    
    border: 2px solid #009FDF;
    font-family: 'Geometria';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-transform: uppercase;
    color: white;
  } 
  
  .cart__item-remove:hover {
    color:#009FDF;    
    background: white;
    border-radius: 5px;
    border: 2px solid #009FDF;
  }

  .cart__item-stock {
    grid-area: stock;
    justify-self: center;
    align-self: center;
  }
  .cart__item-count {
    grid-area: count;
    justify-self: end;
  }
  .cart__item-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
  .cart__item-description,
  .cart__item-amount, 
  .cart__item-stock,
  .cart__item-category,
  .cart__item-rating {
    font-family: 'Geometria';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #495955;
  }
  .cart__item-category,
  .cart__item-rating {
    margin-top: 1rem;
  }
  `;

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles}</style>
  <div class='cart__item'>
    <div class='cart__item-thumbnail'>
      <img class ='cart__item-image'>
    </div>
    <a class='cart__item-title' id='product-link'><h3 ><slot name='title'></slot></h3></a>
    <p class='cart__item-description'><slot name='description'></slot></p>  
    <p class = 'cart__item-amount'>Amount: $<span class='cart__item-amount-item'></span></p>
    <p class = 'cart__item-stock'>Stock: <span><slot name='stock'></slot></span></p>
    <p class = 'cart__item-category'>Category: <span><slot name='category'></slot></span></p>
    <p class = 'cart__item-rating'>Rating: <span><slot name='rating'></slot></span></p>
      <button class='cart__item-remove'>X</button>
      <counter-element class='cart__item-count'></counter-element>
    </div>
  <hr> `;

class CartItem extends HTMLElement {
    counter: CounterElement | null;
    removeButton: HTMLButtonElement | null;
    imageThumbnail: HTMLImageElement | null;
    amount: HTMLElement | null;
    linkDetails: HTMLAnchorElement | null;
    static get observedAttributes() {
        return ['count', 'id', 'src', 'price', 'stock'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        if (this.shadowRoot) {
            this.counter = this.shadowRoot.querySelector('counter-element');
            if (this.counter) {
                this.counter.addEventListener('counted', this.countedCount.bind(this));
            }
            this.imageThumbnail = this.shadowRoot.querySelector('.cart__item-image');
            this.removeButton = this.shadowRoot.querySelector('.cart__item-remove');
            if (this.removeButton) {
                this.removeButton.addEventListener('click', this.handleRemoveButton.bind(this));
            }
            this.amount = this.shadowRoot.querySelector('.cart__item-amount-item');
            this.linkDetails = this.shadowRoot.querySelector('#product-link');
        } else {
            this.counter = null;
            this.removeButton = null;
            this.imageThumbnail = null;
            this.amount = null;
            this.linkDetails = null;
        }
    }

    countedCount(e: Event) {
        const stock = Number(this.getAttribute('stock'));
        const count = Number((e as CustomEvent).detail);
        if (count > 0 && count <= stock) {
            this.setAttribute('count', String(count));
            this.handleCounted();
        }

        if (count === 0) {
            this.handleRemoveButton();
        }
    }
    handleCounted() {
        const countedEvent = new CustomEvent('counted-id', {
            bubbles: true,
            detail: { id: this.getAttribute('id'), count: this.getAttribute('count') },
        });
        this.dispatchEvent(countedEvent);
    }

    handleRemoveButton() {
        const removeEvent = new CustomEvent('remove-item', { bubbles: true, detail: this.getAttribute('id') });
        this.dispatchEvent(removeEvent);
    }

    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        if (oldVal !== newVal) {
            if (name === 'count') {
                if (this.counter) {
                    this.counter.setAttribute('counter', newVal);
                    this.calculateAmount();
                }
            }
            if (name === 'stock') {
                if (this.counter) {
                    this.counter.setAttribute('stock', newVal);
                }
            }
        }
    }

    connectedCallback() {
        const countTemp = this.getAttribute('count');
        const src = this.getAttribute('src');
        const id = this.getAttribute('id');
        if (this.linkDetails) {
            this.linkDetails.href = `/product-detail/${id}`;
        }
        if (countTemp) {
            this.counter?.setAttribute('counter', countTemp);
        }
        if (src && this.imageThumbnail) {
            this.imageThumbnail.src = src;
        }
        this.calculateAmount();
    }
    calculateAmount() {
        const price = Number(this.getAttribute('price'));
        const count = Number(this.getAttribute('count'));
        if (this.amount) {
            this.amount.textContent = String(price * count);
        }
    }
}
customElements.define('cart-item', CartItem);
