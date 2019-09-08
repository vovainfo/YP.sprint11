import Popup from "./Popup"

export default class PopupProfile extends Popup{
    constructor(user){
        super("#profile", "profile");
        this.form.addEventListener("submit", this.onSubmitForm.bind(this));
        this.user = user;
    }
    open(){
        this.form.elements.name.value = this.user.userInfoName.textContent;
        this.form.elements.job.value = this.user.userInfoJob.textContent;
        super.open();
    }
    onSubmitForm(event){
        event.preventDefault();
        if(!this.validate())
            return;
        this.setButtonText("Сохраняется...");

        this.user.updateUser(this.form.elements.name.value,
            this.form.elements.job.value,
            this.restoreButton.bind(this),
            this.updateMainDomAndClose.bind(this));

    }

    updateMainDomAndClose(){
        this.user.renderUser({name: this.form.elements.name.value, about: this.form.elements.job.value});
        this.close();
    }
    restoreButton(){
        this.setButtonText("Сохранить");
    }
}
