import axios from "axios";
import CartStorage from "./cart-storage";
import CartItem from "./cart-item";
import errorHandler from "../error-handler";

export default class CartPage {
    constructor() {
        this.storage = new CartStorage();

        this.productsContainer = document.getElementById('products-list');
    }

    async loadProducts() {
        let context = this;
        try {
            let productsArr = await this.storage.loadCart();
            console.log(productsArr);

            if (!!!productsArr.length) {
                document.getElementById('loading-spinner').remove();
                document.getElementById('empty-message').classList.remove('uk-hidden');
            }

            for (let i = 0; i < productsArr.length; i++) {
                const product = productsArr[i];
                const productId = product.productId;

                axios.get(`/products/${productId}`)
                    .then(function (response) {
                        console.log(response.data);
                        let item = new CartItem(product, response.data);

                        if (!!context.productsContainer && !!document.getElementById("loading-spinner"))
                            context.productsContainer.innerHTML = '';

                        context.productsContainer.appendChild(item.getHtml());
                    })
                    .catch(errorHandler);
            }

            return productsArr;
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
        }
    }
}
