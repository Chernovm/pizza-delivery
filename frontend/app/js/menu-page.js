import axios from "axios";
import PizzaCard from "./pizza-card";
import errorHandler from "../error-handler";
import BeverageCard from "./beverage-card";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default class MenuPage {
    constructor() {
        window.onbeforeunload = function() {
            source.cancel('Operation canceled by the user.');
        };
    }

    loadPizzas() {
        axios.get('/products?type=pizza', {
            cancelToken: source.token
        })
        .then(function (response) {
            let pizzaContainer = document.getElementById('pizza-list');
            pizzaContainer.innerHTML = '';
            for (let i = 0; i < response.data.length; i++) {
                let card = new PizzaCard(response.data[i]);
                pizzaContainer.appendChild(card.getHtml());
            }
        })
        .catch(errorHandler);
    }

    loadBeverages() {
        axios.get('/products?type=beverage', {
            cancelToken: source.token
        })
        .then(function (response) {
            let beverageContainer = document.getElementById('beverage-list');
            beverageContainer.innerHTML = '';
            for (let i = 0; i < response.data.length; i++) {
                let card = new BeverageCard(response.data[i]);
                beverageContainer.appendChild(card.getHtml());
            }
        })
        .catch(errorHandler);
    }
}
