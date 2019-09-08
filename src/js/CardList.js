import {api} from "./Api"
import Card from "./Card";

export default class CardList{
    constructor(domRoot, popupBigImage, user){
        this.domRoot = domRoot;
        this.user = user;
        this.cards = [];
        this.initCallback();
        this.popupBigImage = popupBigImage;
    }
    loadInitialCards(){
//        const api = new Api(apiOptions);
        api.getInitialCards(this.addOneCard.bind(this));
    }

    renderOneCard(card){
        this.domRoot.appendChild(card.cardElement);
    }
    renderLastCard(){
        this.renderOneCard(this.cards[this.cards.length-1]);
    }
    addOneCardNoRender(cardFromServer){
        const card = new Card(cardFromServer, this.user);
        this.cards.push(card);
    }
    addOneCard(cardFromServer){
        this.addOneCardNoRender(cardFromServer);
        this.renderLastCard();
    }

    getIndexCard(cardElement){
        for (let i = 0; i < this.cards.length; i++) {
            if(this.cards[i].cardElement===cardElement){
                return i;
            }
        }
        return -1; //не нашли. но такого не может быть, потому что не может быть никогда
    }

    initCallback() {
        this.domRoot.addEventListener("click", this.clickOnCardList.bind(this));
    }
    removeCardFromServerAndClient(idx){
//        const api = new Api(apiOptions);
        api.deleteCard(this.cards[idx], idx, this.removeCardByIdx.bind(this));
    }
    removeCardByIdx(idx){
        this.cards[idx].remove();//удалили из DOM
        this.cards.splice(idx,1);//удалили из массива карточек
    }

    clickOnCardList(event){
        const cardElement = event.target.closest(".place-card");
        if (!cardElement) { //щёлкнули не по карточке
            return;
        }
        const idx = this.getIndexCard(cardElement);
        if(idx===-1){
            return;
        }
        if (event.target.classList.contains("place-card__like-icon")) {// щёлкнули по лайку
            this.cards[idx].like();
        }else{
            if (event.target.classList.contains("place-card__delete-icon")) { // щёлкнули по иконке удаления
                if(window.confirm(`Вы действительно хотите удалить карточку "${this.cards[idx].cardFromServer.name}"?`)){
                    this.removeCardFromServerAndClient(idx);
                }
            }else{
                //вся карточка за исключением иконок лайк и удаления
                if (event.target.classList.contains("place-card__image")){//картинка, а не подписи внизу
                    this.popupBigImage.open(this.cards[idx].cardFromServer.link);
                }
            }
        }
    }
}
