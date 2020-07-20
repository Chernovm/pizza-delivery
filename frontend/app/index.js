import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import axios from 'axios';

import CartStorage from "./js/cart-storage";
import MenuPage from './js/menu-page'
import CartPage from "./js/cart-page";
import OrdersPage from "./js/orders-page";

import './scss/site.scss'

// loads the Icon plugin
UIkit.use(Icons);

axios.defaults.baseURL = 'http://localhost:8050/api';
axios.defaults.headers.post['Accept'] = 'application/json, */*; q=0.01';

let cartStorage = new CartStorage();

cartStorage.configureStorage();
cartStorage.countProductsInCart().then((count) => {
    document.getElementById('cart-counter').innerText = count;
});

if (window.location.pathname.includes('cart')) {
    let cartPage = new CartPage();
    cartPage.loadProducts().then((products) => {
        console.log(products);
    });

    document.getElementById('checkout-button').addEventListener('click', function(ev) {
        document.getElementById('purchase-details').classList.remove('uk-hidden');
        document.getElementById('products-list').classList.add('uk-hidden');
        document.getElementById('checkout-button').classList.add('uk-hidden');
    });

    document.getElementById('make-order').addEventListener('click', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        cartPage.makeOrder(ev);
    });
} else if (window.location.pathname.includes('orders')) {
    let ordersPage = new OrdersPage();
    ordersPage.loadOrders().then((products) => {
        console.log(products);
    });
} else {
    let menuPage = new MenuPage();
    menuPage.loadPizzas();
    menuPage.loadBeverages();
}
