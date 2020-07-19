import localforage from "localforage";
import CartView from "./cart-view";

const cartKey = 'products-in-cart';

export default class CartStorage {
    constructor() {
        this.view = new CartView();
        this.configureStorage();
    }

    configureStorage() {
        localforage.config({
            name        : 'ChernovPizzaDelivery',
            storeName   : 'chrn-pizza-storage',
            description : 'Shopping card storage for sample app'
        });
    }

    async countProductsInCart() {
        try {
            const productsArr = await this.loadCart();

            // Get cart counter
            const productsCount = this.calculateProducts(productsArr);

            return productsCount;
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
            return 0;
        }
    }

    async loadCart() {
        try {
            const productsArr = await localforage.getItem(cartKey);

            if (productsArr === null)
                return [];

            return productsArr;
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
            return [];
        }
    }

    async addToCart(productId) {
        let cartStorage = this;
        try {
            let productsArr = await this.loadCart();

            if (productsArr === null || !!!productsArr.length) {
                productsArr = [];
            }

            let product = null;
            let i = 0;

            if (productsArr.length > 0) {
                for (; i < productsArr.length; i++) {
                    if (productsArr[i]['productId'] === productId) {
                        product = productsArr[i];
                        break;
                    }
                }

                if (product !== null)
                    product['count']++;
                else
                    product = {productId: productId, count: 1};
            } else {
                product = {productId: productId, count: 1};
            }

            productsArr[i] = product;

            localforage.setItem(cartKey, productsArr).then(function () {
                return localforage.getItem(cartKey);
            }).then(function (value) {
                console.log("value verified: ", value);
                const productsCount = cartStorage.calculateProducts(value);
                cartStorage.view.updateProductsCount(productsCount);
                // we got our value
            }).catch(function (err) {
                // we got an error
                console.log(err);
            });
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
        }
    }

    calculateProducts(productsArr) {
        let productsCount = 0;
        for (let i = 0; i < productsArr.length; i++) {
            if (!!productsArr[i]['count']) {
                productsCount += parseInt(productsArr[i]['count']);
            }
        }

        return productsCount;
    }

    clearStorage() {
        localforage.clear().then(function() {
            // Run this code once the database has been entirely deleted.
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }

    static get cartKey() {
        return cartKey;
    }
}
