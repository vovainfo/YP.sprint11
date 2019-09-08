export default class Popup{
    constructor(id, formName){
        this.element = document.querySelector(id);
        this.element.querySelector(".popup__close").addEventListener("click", this.close.bind(this));
        if(formName!==undefined){
            this.form = document.forms[formName];
            this.form.addEventListener("input", this.onInputForm.bind(this));
        }
    }
    close(){
        this.element.classList.remove("popup_is-opened");
    }
    open(){
        this.element.classList.add("popup_is-opened");
    }
    onInputForm(){
        this.validate();
    }
    enableButton(){
        this.element.querySelector(".popup__button").classList.add("popup__button_enable");
    }
    disableButton(){
        this.element.querySelector(".popup__button").classList.remove("popup__button_enable");
    }
    setButtonText(text){
        this.element.querySelector(".popup__button").textContent = text;
    }

    validate(){
        let isOk = true;
        for (let i = 0; i < this.form.elements.length; i++) {
            const errorElement = this.element.querySelector(`#error-${this.form.elements[i].id}`);
            if(this.form.elements[i].classList.contains("js-validate-2-30")){
                switch (validateLenghtStr(this.form.elements[i].value, 2, 30)) {
                    case 0: errorElement.textContent = "Это обязательное поле"; isOk = false; break;
                    case 1: errorElement.textContent = ""; break;
                    case 2: errorElement.textContent = "Должно быть от 2 до 30 символов"; isOk = false; break;
                }
            }else{
                if(this.form.elements[i].classList.contains("js-validate-url")) {
                    if (this.form.elements[i].checkValidity()) {
                        errorElement.textContent = "";
                    } else {
                        errorElement.textContent = "Здесь должна быть ссылка";
                        isOk = false;
                    }
                }
            }
        }
        if(isOk){
            this.enableButton();
        }else{
            this.disableButton();
        }
        return isOk;
    }
}

// 0 - пустая строка
// 1 - ок
// 2 - слишком длинная или короткая
function validateLenghtStr(str, min, max) {
    let length = str.trim().length;
    if(length===0)
        return 0;
    if(length >= min && length <= max)
        return 1;
    return 2;
}
