import CartStorage from "./cart-storage";

export default class CartItem {
    constructor(context, product, productData) {
        this.cartPage = context;
        this.product = product;
        this.data = productData;
        this.html = '';
        this.evListeners = [];
        this.createMarkup()

    }

    createMarkup() {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("uk-card", "uk-card-default", "uk-animation-fade", "uk-grid-collapse", "uk-child-width-1-4@s", "uk-margin-bottom");
        let gridAttr = this.createAttribute("uk-grid", "");
        cardDiv.attributes.setNamedItem(gridAttr);
        let productAttr = this.createAttribute("product-id", this.data.id);
        cardDiv.attributes.setNamedItem(productAttr);

        let mediaDiv = this.createImageContainer();
        cardDiv.appendChild(mediaDiv);

        let expDiv = this.createPurchaseDetails();
        cardDiv.appendChild(expDiv);

        this.html = cardDiv;
    }

    createImageContainer() {
        let imgDiv = document.createElement("div");
        imgDiv.classList.add("uk-card-media-left", "uk-cover-container");

        let picture = document.createElement("img");
        let srcAttr = this.createAttribute("src", `assets/images/${this.data.image}`);
        picture.attributes.setNamedItem(srcAttr);
        let coverAttr = this.createAttribute("uk-cover", "");
        picture.attributes.setNamedItem(coverAttr);

        imgDiv.appendChild(picture);

        let canvas = document.createElement("canvas");
        let wAttr = this.createAttribute("width", "600");
        canvas.attributes.setNamedItem(wAttr);
        let hAttr = this.createAttribute("height", "400");
        canvas.attributes.setNamedItem(hAttr);

        imgDiv.appendChild(canvas);

        return imgDiv;
    }

    createPurchaseDetails() {
        let div = document.createElement("div");
        div.classList.add("uk-width-expand");

        let body = this.prepareCardBodyMarkup();
        div.appendChild(body);

        let footer = this.prepareCardFooterMarkup();
        div.appendChild(footer);

        return div;
    }

    prepareCardBodyMarkup() {
        let ukCardBody = document.createElement("div");
        ukCardBody.classList.add("uk-card-body");

        let ukCardHeding = document.createElement("h3");
        ukCardHeding.classList.add("uk-card-title");
        ukCardHeding.innerText = this.data.title;

        ukCardBody.appendChild(ukCardHeding);

        let ukDescription = document.createElement("p");
        ukDescription.classList.add("uk-text-justify");
        ukDescription.innerText = this.data.description;
        ukCardBody.appendChild(ukDescription);

        return ukCardBody;
    }

    prepareCardFooterMarkup() {
        let footer = document.createElement("div");
        footer.classList.add("uk-card-footer");

        let ukFlex = document.createElement("div");
        ukFlex.classList.add("uk-flex", "uk-flex-between", "dish-footer");
        let gridAttr = this.createAttribute("uk-grid", "");
        ukFlex.attributes.setNamedItem(gridAttr);

        let quantityControl = document.createElement("div");

        let minus = this.createMinusBtn();
        quantityControl.appendChild(minus);

        let quantity = document.createElement("span");
        quantity.innerText = (this.product.count ? this.product.count : 0) + " pcs.";
        quantityControl.appendChild(quantity);

        let plus = this.createPlusBtn();
        quantityControl.appendChild(plus);

        let priceContainer = document.createElement("div");
        let price = document.createElement("span");
        price.classList.add("uk-text-middle", "uk-margin-small-right");

        let usdSpan = document.createElement("span");
        usdSpan.classList.add("usd", "product-price");
        usdSpan.innerText = (+this.data.price_usd * (+this.product.count)).toFixed(2);
        price.append("$");
        price.appendChild(usdSpan);

        let eurSpan = document.createElement("span");
        eurSpan.classList.add("eur", "product-price");
        eurSpan.innerText = (+this.data.price_eur * (+this.product.count)).toFixed(2);
        price.append(" (€");
        price.appendChild(eurSpan);
        price.append(")");

        priceContainer.appendChild(price);

        let trashBtn = this.createTrashButton();
        priceContainer.appendChild(trashBtn);

        ukFlex.appendChild(quantityControl);
        ukFlex.appendChild(priceContainer);

        footer.appendChild(ukFlex);

        return footer;
    }

    createTrashButton() {
        let trashBtn = document.createElement("button");
        trashBtn.classList.add("uk-icon-link");
        let trashAttr = this.createAttribute("uk-icon", "trash");
        trashBtn.attributes.setNamedItem(trashAttr);

        let productId = this.createAttribute("product-id", this.data.id);
        trashBtn.attributes.setNamedItem(productId);

        trashBtn.addEventListener('click', this.removeFromCart.bind(null, this), false);

        this.evListeners.push({target: trashBtn, fn: trashBtn});

        return trashBtn;
    }

    createMinusBtn() {
        let minus = document.createElement("button");
        minus.classList.add("uk-icon-button", "uk-margin-small-right", "uk-hidden");
        let minusAttr = this.createAttribute("uk-icon", "minus");
        minus.attributes.setNamedItem(minusAttr);

        let productId = this.createAttribute("product-id", this.data.id);
        minus.attributes.setNamedItem(productId);

        // this.eventListeners.push(minus);

        return minus;
    }

    createPlusBtn() {
        let plus = document.createElement("button");
        plus.classList.add("uk-icon-button", "uk-margin-small-left", "uk-hidden");
        let plusAttr = this.createAttribute("uk-icon", "plus");
        plus.attributes.setNamedItem(plusAttr);

        let productId = this.createAttribute("product-id", this.data.id);
        plus.attributes.setNamedItem(productId);

        // this.eventListeners.push(plus);

        return plus;
    }

    createAttribute(name, value) {
        let attr = document.createAttribute(name);
        attr.value = value;

        return attr;
    }

    removeFromCart(ctx, ev) {
        let target = ev.currentTarget;
        let productId = target.attributes.getNamedItem('product-id').value;

        let storage = new CartStorage();
        storage.removeFromCart(ctx, productId);
    }

    remove() {
        for (let i = 0; i < this.evListeners.length; i++) {
            let listener = this.evListeners[i];

            listener.target.removeEventListener('click', listener.fn);
        }

        this.html.remove();

        this.cartPage.updateTotal();
    }

    getHtml() {
        return this.html;
    }
}
