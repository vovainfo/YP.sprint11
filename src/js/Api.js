const apiOptions = {
    baseUrl: (process.env.NODE_ENV==="production")? 'https://praktikum.tk/cohort1': 'http://praktikum.tk/cohort1',
    headers: {
        authorization: 'a4937801-d36e-4ddf-94b5-e4bb4d55a7f9',
        'Content-Type': 'application/json'
    }
};

class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    getUser(callbackRender){
        fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }else{
                    const error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .then((res) => {
                callbackRender(res);
                return res;
            })
            .catch((err) => {
                alert(err.response);
            });
    }
    getInitialCards(callbackAddCard){
        fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }else{
                    const error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .then((res) => {

                for (let i = 0; i < res.length; i++) {
                    callbackAddCard(res[i]);
                }
                return res;
            })
            .catch((err) => {
                alert(err.response);
            });
    }

    updateProfile(name, about, callbackRestoreButton, callbackUpdateDom){
        fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => {
                if (res.ok) {
                    callbackUpdateDom();
                }else{
                    let error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .catch((err) => {
                alert(err.response);
            })
            .finally( () => {
                callbackRestoreButton();
            });
    }
    addCard(name, link, callbackRestoreButton, callbackUpdateDom){
        fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }else{
                    let error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .then((res) => {
                callbackUpdateDom(res);
            })
            .catch((err) => {
                alert(err.response);
            })
            .finally( () => {
                callbackRestoreButton();
            });
    }
    deleteCard(card, idx, callbackRemoveCard){
        fetch(`${this.baseUrl}/cards/${card.cardFromServer._id}`, {
            method: "DELETE",
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }else{
                    const error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .then(() => {
                callbackRemoveCard(idx);
            })
            .catch((err) => {
                alert(err.response);
            })

    }
    setLike(card, callbackUpdateCardAndDOM){
        fetch(`${this.baseUrl}/cards/like/${card.cardFromServer._id}`, {
            method: "PUT",
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }else{
                    const error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .then((res) => {
                callbackUpdateCardAndDOM(res);
            })
            .catch((err) => {
                alert(err.response);
            })
    }
    deleteLike(card, callbackUpdateCardAndDOM){
        fetch(`${this.baseUrl}/cards/like/${card.cardFromServer._id}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }else{
                    const error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .then((res) => {
                callbackUpdateCardAndDOM(res);
            })
            .catch((err) => {
                alert(err.response);
            })
    }
    updateAvatar(link, callbackRestoreButton, callbackUpdateDom){
        fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }else{
                    const error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .then(() => {
                callbackUpdateDom(link);
            })
            .catch((err) => {
                alert(err.response);
            })
            .finally( () => {
                callbackRestoreButton();
            });
    }
}

export const api = new Api(apiOptions);
