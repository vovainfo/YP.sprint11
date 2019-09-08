import Popup from "./Popup"

export default class PopupBigImage extends Popup{
    constructor(){
        super("#big-size-image");
    }
    open(url){
        this.element.querySelector('.popup__image').src = url;
        super.open();
    }
}
