import {api} from "./Api"
import Popup from "./Popup"

export default class PopupAddCard extends Popup{
    constructor(cardList){
        super("#add-card", "new");

        this.form.addEventListener("submit", this.onSubmitForm.bind(this));
        this.cardList = cardList;
    }
    open(){
        this.form.reset();
        super.open();
    }
    onSubmitForm(event){
        event.preventDefault();
        if(!this.validate())
            return;
        this.setButtonText("Сохраняется...");
//        const api = new Api(apiOptions);

        api.addCard(this.form.elements.name.value,
            this.form.elements.link.value,
            this.restoreButton.bind(this),
            this.updateMainDomAndClose.bind(this));
    }

    updateMainDomAndClose(cardFromServer){
        this.cardList.addOneCard(cardFromServer);
        this.close();
    }
    restoreButton(){
        this.setButtonText("+");
    }
}
