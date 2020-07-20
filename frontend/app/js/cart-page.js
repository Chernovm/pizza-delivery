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
                    let item = new CartItem(product, response.data);

                    if (!!context.productsContainer && !!document.getElementById("loading-spinner"))
                        context.productsContainer.innerHTML = '';

                    context.productsContainer.appendChild(item.getHtml());
                    console.log(response.data);
                    let totalContainer = document.getElementById("total-container");
                    let deliveryContainer = document.getElementById("delivery-container");

                    let usdSum = document.querySelector("#order-sum > .usd");
                    usdSum.innerText = (+usdSum.innerText + +response.data.price_usd).toFixed(2);
                    let eurSum = document.querySelector("#order-sum > .eur");
                    eurSum.innerText = (+eurSum.innerText + +response.data.price_eur).toFixed(2);

                    deliveryContainer.classList.remove('uk-hidden');
                    totalContainer.classList.remove('uk-hidden');
                })
                .catch(errorHandler);
            }

            return productsArr;
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
        }
    }

    async makeOrder() {
        let context = this;
        let productsArr = await this.storage.loadCart();

        let name = document.querySelector('input[name="full_name"]');
        let address = document.querySelector('textarea[name="address"]');
        let phone = document.querySelector('input[name="phone"]');

        let deliveryPriceUsd = document.querySelector('#delivery-cost > .usd');
        let deliveryPriceEur = document.querySelector('#delivery-cost > .eur');
        console.log(name, address, phone);

        let payload = {};

        if (!!!name) {
            console.log('name is empty');
            name.classList.add('uk-form-danger');
            return;
        } else {
            name.classList.remove('uk-form-danger');
            payload['name'] = name.value;
        }

        if (!!!address) {
            console.log('address is empty');
            address.classList.add('uk-form-danger');
            return;
        } else {
            address.classList.remove('uk-form-danger');
            payload['address'] = address.value.trim();
        }

        if (!!!phone) {
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
