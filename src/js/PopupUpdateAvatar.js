import {api} from "./Api"
import Popup from "./Popup"

export default class PopupUpdateAvatar extends Popup{
    constructor(user){
        super("#update-avatar", "update-avatar");
        this.user = user;

        this.form.addEventListener("submit", this.onSubmitForm.bind(this));
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
        api.updateAvatar(this.form.elements.link.value,
            this.restoreButton.bind(this),
            this.updateMainDomAndClose.bind(this));
    }

    updateMainDomAndClose(link){
        this.user.setAvatar(link);
        this.close();
    }
    restoreButton(){
        this.setButtonText("+");
    }

}
