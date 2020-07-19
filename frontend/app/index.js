import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import axios from 'axios';

import CartStorage from "./js/cart-storage";
import MenuPage from './js/menu-page'
import CartPage from "./js/cart-page";

import './scss/site.scss'

// loads the Icon plugin
UIkit.use(Icons);

axios.defaults.baseURL = 'http://localhost:8050/api';
axios.defaults.headers.post['Accept'] = 'application/json, */*; q=0.01';

let cartStorage = new CartStorage();
let cartPage = new CartPage();

cartStorage.configureStorage();
cartStorage.countProductsInCart().then((count) => {
    document.getElementById('cart-counter').innerText = count;
});

if (window.location.pathname === '/') {
    MenuPage.loadPizzas();
    MenuPage.loadBeverages();
} else if (window.location.pathname === '/cart.html') {
    cartPage.loadProducts().then((products) => {
        console.log(products);
    });
}
