import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import axios from 'axios';

import PizzaCard from './js/pizza-card'
import BeverageCard from "./js/beverage-card";
import errorHandler from "./error-handler";

import './scss/site.scss'

// loads the Icon plugin
UIkit.use(Icons);

axios.defaults.baseURL = 'http://localhost:8050/api';
axios.defaults.headers.post['Accept'] = 'application/json, */*; q=0.01';

loadPizzas();
loadBeverages();

function loadPizzas() {
    axios.get('/pizzas')
        .then(function (response) {
            document.getElementById('pizza-list').innerHTML = '';
            for (let i = 0; i < response.data.length; i++) {
                let card = new PizzaCard(response.data[i]);
                document.getElementById('pizza-list').appendChild(card.getHtml());
            }
        })
        .catch(errorHandler);
}

function loadBeverages() {
    axios.get('/beverages')
        .then(function (response) {
            document.getElementById('beverage-list').innerHTML = '';
            for (let i = 0; i < response.data.length; i++) {
                let card = new BeverageCard(response.data[i]);
                document.getElementById('beverage-list').appendChild(card.getHtml());
            }
        })
        .catch(errorHandler);
}
