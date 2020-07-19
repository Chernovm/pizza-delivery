import CartStorage from "./cart-storage";

export default class CartPage {
    constructor() {
        this.storage = new CartStorage();
    }

    async loadProducts() {
        try {
            let productsArr = await this.storage.loadCart();
            console.log(productsArr);

            return productsArr;
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
        }
    }
}
