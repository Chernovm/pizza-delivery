export default class OrderItem {
    constructor(orderData) {
        this.data = orderData;
        this.html = '';
        this.createMarkup()
    }

    createMarkup() {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("uk-description-list", "uk-description-list-divider");

        for (let orderId in this.data) {
            let order = this.data[orderId];
            let date = new Date(order.created_at)
            console.log(order);

            let dt = document.createElement("dt");
            dt.innerHTML = `${order.client_name} (${order.address}) Phone: ${order.phone} // ${date.toUTCString()}`;
            cardDiv.appendChild(dt);

            let dd = document.createElement("dd");
            dd.innerHTML = `$${order.sum_usd} (€${order.sum_eur}) POSITIONS:`;
            cardDiv.appendChild(dd);

            let ul = document.createElement("ul");

            for (let positionId in order.positions) {
                let position = order.positions[positionId];
                let li = document.createElement("li");

                let priceUsd = (position.quantity * position.price_usd).toFixed(2);
                let priceEur = (position.quantity * position.price_eur).toFixed(2);
                li.innerHTML = `${position.quantity} x ${position.product.title} // PRICE: $${priceUsd} (€${priceEur})`;
                ul.appendChild(li);
            }

            cardDiv.appendChild(ul);
        }

        this.html = cardDiv;
    }

    getHtml() {
        return this.html;
    }
}
