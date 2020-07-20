import axios from "axios";
import UIkit from "uikit";
import OrderItem from "./order-item";

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
                let item = new OrderItem(response.data);

                if (!!context.productsContainer && !!document.getElementById("loading-spinner"))
                    context.productsContainer.innerHTML = '';

                context.productsContainer.appendChild(item.getHtml());
            })
            .catch(errorHandler);
    }
}
