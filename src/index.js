import "@babel/polyfill";
import "./pages/index.css";
import "./images/logo.svg";
import "./images/close.svg";

import User from "./js/User"
import PopupBigImage from "./js/PopupBigImage";
import CardList from "./js/CardList";
import PopupAddCard from "./js/PopupAddCard";
import PopupProfile from "./js/PopupProfile";
import PopupUpdateAvatar from "./js/PopupUpdateAvatar";

const user = new User();
user.loadFromServer();

const popupBigImage = new PopupBigImage();
const cardList = new CardList(document.querySelector('.places-list'), popupBigImage, user);
cardList.loadInitialCards();

const popupAddCard = new PopupAddCard(cardList);
const popupProfile = new PopupProfile(user);
const popupUpdateAvatar = new PopupUpdateAvatar(user);

document.querySelector(".button.user-info__edit").addEventListener("click", popupProfile.open.bind(popupProfile));
document.querySelector(".user-info__button").addEventListener("click", popupAddCard.open.bind(popupAddCard));
document.querySelector(".user-info__photo").addEventListener("click", popupUpdateAvatar.open.bind(popupUpdateAvatar));
