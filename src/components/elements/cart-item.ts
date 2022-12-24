import './counter-element';

const styles = `
* {
    margin-block-end:0;
    margin-block-start:0;
}
.cart__item-thumbnail {
    grid-area: thumbnail;
    width: 160px;
    hight: 80px;
    border-radius: 10px;
  }
  .cart__item {
    margin-top: 10px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 160px auto 100px; 
    grid-template-rows: 20px 30px 20px;
    column-gap: 10px;
    grid-template-areas:
      'thumbnail title close'
      'thumbnail description .'
      'thumbnail amount count';
  }
  .cart__item-title {
    grid-area: title;
  }
  .cart__item-amount {
    grid-area: amount;
  }
  .cart__item-description {
    grid-area: description;
  }
  .cart__item-close {
    grid-area: close;
    justify-self: end;
    border: 1px solid lightblue;
    background: white;
    border-radius: 10px;
  } 
  .cart__item-count {
    grid-area: count;
    justify-self: end;
  }
  .cart__item-image {
    width: 100%;
    height: 100%;
    object-fil: cover;
    border-radius: 10px;
  }`;

const template = `
<style>${styles}</style>
<div class='cart__item'>
  <div class='cart__item-thumbnail'>
    <img class ='cart__item-image'>
  </div>
  <h3 class='cart__item-title'><slot name='title'></slot></h3>
  <p class='cart__item-description'>An apple mobile which is nothing like apple</p>  
  <p class='cart__item-amount'>55455</p>
    <button class='cart__item-close' >X</button>
    <counter-element class='cart__item-count'></counter-element>
    
</div>
<hr> `;

class CartItem extends HTMLElement {
    counter: CounterElement | null;
    imageThumbnail: HTMLImageElement | null;
    static get observedAttributes() {
        return ['count', 'id', 'src'];
    }
    constructor() {
        super();
        this.counter = null;
        this.imageThumbnail = null;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = template;

        if (this.shadowRoot) {
            this.counter = this.shadowRoot.querySelector('counter-element');
            if (this.counter) {
                this.counter.addEventListener('counted', this.countedCount.bind(this));
            }
            this.imageThumbnail = this.shadowRoot.querySelector('.cart__item-image');
        }
    }
    countedCount(e: Event) {
        this.setAttribute('count', String((e as CustomEvent).detail));
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        if (oldVal !== newVal) {
            if (name === 'count') {
                if (this.counter) {
                    this.counter.setAttribute('counter', String(newVal));
                }
            }
        }
    }
    connectedCallback() {
        const countTemp = this.getAttribute('count');
        const src = this.getAttribute('src');
        if (countTemp) {
            this.counter?.setAttribute('counter', countTemp);
        }
        if (src && this.imageThumbnail) {
            this.imageThumbnail.src = src;
        }
    }
}
customElements.define('cart-item', CartItem);
