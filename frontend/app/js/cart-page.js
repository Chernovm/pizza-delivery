import axios from "axios";
import UIkit from "uikit";
import CartStorage from "./cart-storage";
import CartItem from "./cart-item";
import CartView from "./cart-view";

import errorHandler from "../error-handler";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default class CartPage {
    constructor() {
        this.storage = new CartStorage();

        this.productsContainer = document.getElementById('products-list');

        window.onbeforeunload = function() {
            source.cancel('Operation canceled by the user.');
        };
    }

    async loadProducts() {
        let context = this;
        try {
            let productsArr = await this.storage.loadCart();
            console.log(productsArr);

            if (!!!productsArr.length) {
                document.getElementById('loading-spinner').classList.add('uk-hidden');
                document.getElementById('empty-message').classList.remove('uk-hidden');
            }

            for (let i = 0; i < productsArr.length; i++) {
                const product = productsArr[i];
                const productId = product.productId;

                axios.get(`/products/${productId}`, {
                    cancelToken: source.token
                })
                .then(function (response) {
                    console.log(response.data);
                    let item = new CartItem(context, product, response.data);

                    if (!!context.productsContainer && !!document.getElementById("loading-spinner")) {
                        document.getElementById("loading-spinner").classList.add('uk-hidden');
                    }

                    context.productsContainer.appendChild(item.getHtml());
                    console.log(response.data);
                    context.updateTotal();
                })
                .catch(errorHandler);
            }

            return productsArr;
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
        }
    }

    updateTotal() {
        let totalContainer = document.getElementById("total-container");
        let deliveryContainer = document.getElementById("delivery-container");

        let deliveryCostUsd = +document.querySelector("#delivery-cost > .usd").innerText;
        let deliveryCostEur = +document.querySelector("#delivery-cost > .eur").innerText;

        let usdSumContainer = document.querySelector("#order-sum > .usd");
        let eurSumContainer = document.querySelector("#order-sum > .eur");

        let usdPrices = Array.from(document.querySelectorAll(".usd.product-price")).map((el) => el.innerText);
        let usdSum = !!usdPrices.length ? +usdPrices.reduce((acc, cur) => +acc + +cur) : 0;

        let eurPrices = Array.from(document.querySelectorAll(".eur.product-price")).map((el) => el.innerText);
        let eurSum = !!eurPrices.length ? +eurPrices.reduce((acc, cur) => +acc + +cur) : 0;
        console.log('sums calculated', usdSum, eurSum);

        usdSumContainer.innerText = (usdSum + deliveryCostUsd).toFixed(2);
        eurSumContainer.innerText = (eurSum + deliveryCostEur).toFixed(2);

        if (usdSum > 0) {
            deliveryContainer.classList.remove('uk-hidden');
            totalContainer.classList.remove('uk-hidden');
        } else {
            deliveryContainer.classList.add('uk-hidden');
            totalContainer.classList.add('uk-hidden');
            document.getElementById('empty-message').classList.remove('uk-hidden');
        }
    }

    async makeOrder() {
        let context = this;
        let productsArr = await this.storage.loadCart();

        let name = document.querySelector('input[name="full_name"]');
        let address = document.querySelector('input[name="address"]');
        let phone = document.querySelector('input[name="phone"]');

        let deliveryPriceUsd = document.querySelector('#delivery-cost > .usd');
        let deliveryPriceEur = document.querySelector('#delivery-cost > .eur');
        console.log(name, address, phone);

        let payload = {};

        if (!!!name.value || (!!name.value && name.value.length === 0)) {
            console.log('name is empty');
            name.classList.add('uk-form-danger');
            return;
        } else {
            name.classList.remove('uk-form-danger');
            payload['name'] = name.value;
        }

        if (!!!address.value || (!!address.value && address.value.length === 0)) {
            console.log('address is empty');
            address.classList.add('uk-form-danger');
            return;
        } else {
            address.classList.remove('uk-form-danger');
            payload['address'] = address.value.trim();
        }

        if (!!!phone.value || (!!phone.value && phone.value.length === 0)) {
            console.log('phone is empty');
            phone.classList.add('uk-form-danger');
            return;
        } else {
            phone.classList.remove('uk-form-danger');
            payload['phone'] = phone.value;
        }

        payload['products'] = productsArr;

        payload['delivery'] = {
            usd: deliveryPriceUsd.innerText.trim(),
            eur: deliveryPriceEur.innerText.trim(),
        };

        axios({
            method: 'post',
            url: '/orders',
            data: payload,
            cancelToken: source.token
        })
            .then(function (response) {
                context.storage.clearStorage();
                let cartIcon = new CartView();
                cartIcon.updateProductsCount(0);
                UIkit.notification({message: 'Order registered!', status: 'success'});
                setTimeout(() => {
                    window.location = "/cart.html";
                }, 800);
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                UIkit.notification({message: 'Something went wrong', status: 'danger'});
                console.log(response);
            });
    }
}
