// web - component
const styles = `
:host {
    position: relative;
    font-family: sans-serif;
}
.buttons {
    border: 1px solid lightblue;
    background: white;
    border-radius: 10px;
}
#counter-increment, #counter-decrement {
    font-weight: bold;
    font-size: 20px;
    color: gray;
    text-align: center;
    line-height: 20px;
    width: 25px;
    height: 20px;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    background: none;
}

#counter-value {
    font-weight: bold;
}
`;
const template = `<style>${styles}</style>            
<div class='buttons'>
<button id='counter-increment'>-</button>
<span id='counter-value'> 0 </span>
<button id='counter-decrement'>+</button>
</div>
`;

class CounterElement extends HTMLElement {
    counter: number;
    incrementButton: HTMLButtonElement | null;
    decrementButton: HTMLButtonElement | null;
    counterValue: HTMLElement | null;
    static get observedAttributes() {
        return ['counter'];
    }
    constructor() {
        super();
        this.counter = 0;
        this.incrementButton = null;
        this.decrementButton = null;
        this.counterValue = null;

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = template;
        if (this.shadowRoot) {
            this.incrementButton = this.shadowRoot.querySelector('#counter-increment');
            this.decrementButton = this.shadowRoot.querySelector('#counter-decrement');
            this.counterValue = this.shadowRoot.querySelector('#counter-value');
        }
        if (this.incrementButton) {
            this.incrementButton.addEventListener('click', this.decrement.bind(this));
        }
        if (this.decrementButton) {
            this.decrementButton.addEventListener('click', this.increment.bind(this));
        }
    }

    increment() {
        this.counter++;
        this.invalidate();
    }

    decrement() {
        this.counter--;
        this.invalidate();
    }

    invalidate() {
        if (this.counterValue) {
            if (this.counter < 0) this.counter = 0;
            this.counterValue.innerHTML = String(this.counter);
            this.setAttribute('counter', String(this.counter));
        }
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        if (oldVal !== newVal) {
            if (name === 'counter') {
                this.counter = Number(newVal);
                if (this.counterValue) this.counterValue.innerHTML = String(this.counter);
                const event = new CustomEvent('counted', { bubbles: true, detail: this.counter });
                this.dispatchEvent(event);
            }
        }
    }
}

customElements.define('counter-element', CounterElement);
