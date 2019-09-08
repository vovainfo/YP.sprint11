import {api} from "./Api"

export default class Card{
    constructor(cardFromServer, user){
        this.user = user;
        this.cardFromServer = cardFromServer;
        this.cardElement = this.create();
        this.updateLike();
    }
    create(){
        //формируем все элементы
        const oneCard = document.createElement("div");
        oneCard.classList.add("place-card");

        const imgCard = document.createElement("div");
        imgCard.classList.add("place-card__image");
        imgCard.style.backgroundImage = `url(${this.cardFromServer.link})`;

        const btnImgCard = document.createElement("button");
        btnImgCard.classList.add("place-card__delete-icon");

        const descCard = document.createElement("div");
        descCard.classList.add("place-card__description");

        const h3Card = document.createElement("h3");
        h3Card.classList.add("place-card__name");
        h3Card.textContent = this.cardFromServer.name;

        const likeAndCount = document.createElement("div");
        likeAndCount.classList.add("place-card__like-and-count");

        const btnLike = document.createElement("button");
        btnLike.classList.add("place-card__like-icon");

        const countLike = document.createElement("p");
        countLike.classList.add("place-card__like-count");
        countLike.textContent = this.cardFromServer.likes.length;

        //сливаем их в один
        oneCard.appendChild(imgCard);
        if(this.cardFromServer.owner._id===this.user._id){ //это я создал карточку. показать иконку удаления;
            imgCard.appendChild(btnImgCard);
        }
        oneCard.appendChild(descCard);
        descCard.appendChild(h3Card);
        descCard.appendChild(likeAndCount);
        likeAndCount.appendChild(btnLike);
        likeAndCount.appendChild(countLike);

        //возвращаем элемент для встраивания в страницу
        return oneCard;
    }
    like(){
        if(this.isLiked()){
            api.deleteLike(this, this.updateCardFromServerAndLike.bind(this));
        }else{
            api.setLike(this, this.updateCardFromServerAndLike.bind(this));
        }
    }
    updateCardFromServerAndLike(cardFromServer){
        this.cardFromServer = cardFromServer;
        this.updateLike();
    }
    updateLike(){
        if(this.isLiked()){
            this.cardElement.querySelector('.place-card__like-icon').classList.add("place-card__like-icon_liked");
        }else{
            this.cardElement.querySelector('.place-card__like-icon').classList.remove("place-card__like-icon_liked");
        }
        const countLike = this.cardElement.querySelector(".place-card__like-count");
        countLike.textContent = this.cardFromServer.likes.length;

    }
    isLiked(){
        for (let i = 0; i < this.cardFromServer.likes.length; i++) {
            if(this.cardFromServer.likes[i]._id===this.user._id){
                return true;
            }
        }
        return false;
    }
    remove(){
        this.cardElement.parentNode.removeChild(this.cardElement);
    }
}
