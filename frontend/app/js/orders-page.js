import axios from "axios";
import OrdersList from "./orders-list";

import errorHandler from "../error-handler";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default class OrdersPage {
    constructor() {
        this.productsContainer = document.getElementById('orders-list');

        window.onbeforeunload = function() {
            source.cancel('Operation canceled by the user.');
        };
    }

    async loadOrders() {
        let context = this;

        axios.get("/orders", {
            cancelToken: source.token
        })
            .then(function (response) {
                console.log(response.data);
                let item = new OrdersList(response.data);

                let spinner = document.getElementById("loading-spinner");
                if (!!context.productsContainer && !!spinner)
                    spinner.classList.add('uk-hidden');

                if (!!!response.data.length && !!document.getElementById("empty-message")) {
                    document.getElementById("empty-message").classList.remove('uk-hidden');
                }

                context.productsContainer.appendChild(item.getHtml());
            })
            .catch(errorHandler);
    }
}
