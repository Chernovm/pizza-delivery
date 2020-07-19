export default class PizzaCard {
    constructor(productData) {
        this.data = productData;
        this.html = '';
        this.createMarkup();
    }

    createMarkup() {
        let wrapperDiv = document.createElement("div");

        let ukCard = this.prepareCardMarkup();

        wrapperDiv.appendChild(ukCard);

        this.html = wrapperDiv;
    }

    prepareCardMarkup() {
        let ukCard = document.createElement("div");
        ukCard.classList.add("uk-card", "uk-card-default", "uk-animation-fade");

        let ukCardTop = this.prepareCardHeadingMarkup();
        ukCard.appendChild(ukCardTop);

        let ukCardBody = this.prepareCardBodyMarkup();
        ukCard.appendChild(ukCardBody);

        let ukCardFooter = this.prepareCardFooterMarkup();
        ukCard.appendChild(ukCardFooter);

        return ukCard;
    }

    prepareCardHeadingMarkup() {
        let ukCardTop = document.createElement("div");
        ukCardTop.classList.add("uk-card-media-top");
        let picture = document.createElement("img");
        let srcAttr = document.createAttribute ("src");
        srcAttr.value = `assets/images/${this.data.image}`;
        picture.attributes.setNamedItem(srcAttr);
        ukCardTop.appendChild(picture);

        return ukCardTop;
    }

    prepareCardBodyMarkup() {
        let ukCardBody = document.createElement("div");
        ukCardBody.classList.add("uk-card-body");

        let ukCardHeding = document.createElement("h3");
        ukCardHeding.classList.add("uk-card-title");
        ukCardHeding.innerText = this.data.title;

        ukCardBody.appendChild(ukCardHeding);

        let ukDescriptionContainer = document.createElement("div");
        ukDescriptionContainer.classList.add("uk-margin-small-bottom");
        let ukDescription = document.createElement("small");
        ukDescription.classList.add("uk-text-justify");
        ukDescription.innerText = this.data.description;
        ukDescriptionContainer.appendChild(ukDescription);

        ukCardBody.appendChild(ukDescriptionContainer);

        return ukCardBody;
    }

    prepareCardFooterMarkup() {
        let footer = document.createElement("div");
        footer.classList.add("uk-card-footer");

        let ukFlex = document.createElement("div");
        ukFlex.classList.add("uk-flex", "uk-flex-between", "dish-footer");

        let price = document.createElement("div");
        price.classList.add("uk-text-middle");
        price.innerText = `$${this.data.price_usd}`;
        ukFlex.appendChild(price);

        let div = document.createElement("div");

        let button = document.createElement("button");
        button.classList.add("uk-button", "uk-button-primary", "uk-padding-small", "uk-padding-remove-vertical");

        let buttonText = document.createElement("small");
        buttonText.innerText = "Choose";
        button.appendChild(buttonText);

        div.appendChild(button);

        ukFlex.appendChild(div);

        footer.appendChild(ukFlex);

        return footer;
    }

    getHtml() {
        return this.html;
    }
}
