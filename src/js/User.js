import {api} from "./Api"

export default class User{
    constructor() {
        this.userInfoName = document.querySelector('.user-info__name');
        this.userInfoJob = document.querySelector('.user-info__job');
        this.userInfoPhoto = document.querySelector('.user-info__photo');
    };
    loadFromServer(){
        api.getUser(this.renderUser.bind(this));
    }
    renderUser(userInfoFromServer){
        this.userInfoName.textContent = userInfoFromServer.name;
        this.userInfoJob.textContent = userInfoFromServer.about;
        if(userInfoFromServer._id !== undefined){
            this._id = userInfoFromServer._id;
        }
        if(userInfoFromServer.avatar !== undefined){
            this.userInfoPhoto.style.backgroundImage = `url(${userInfoFromServer.avatar})`;
        }
    }
    setAvatar(link){
        this.userInfoPhoto.style.backgroundImage = `url(${link})`;
    }
    updateUser(name, about, callbackRestoreButton, callbackUpdateMainDomAndClose){
        api.updateProfile(name, about, callbackRestoreButton, callbackUpdateMainDomAndClose);
    }
}
