export default class CartView {
    constructor() {
        this.dom = document.getElementById('cart-counter');
    }

    updateProductsCount(count) {
        this.dom.innerText = count;
        this.dom.classList.add('uk-animation-shake');
        let context = this;
        setTimeout(function() {
            context.dom.classList.remove('uk-animation-shake');
        }, 200);
    }
}
