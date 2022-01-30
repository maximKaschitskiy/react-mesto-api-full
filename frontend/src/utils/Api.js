class Api {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Credentials': 'true',
                  "Authorization" : `Bearer ${this._getJwt()}`
                }
            })
            .then(this._checkResponse.bind(this))
          } 
    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Credentials': 'true',
                  "Authorization" : `Bearer ${this._getJwt()}`
                }
            })
            .then(this._checkResponse.bind(this))
          } 
    setUserInfo(nameValue, aboutValue) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              "Authorization" : `Bearer ${this._getJwt()}`
            },
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
        .then(this._checkResponse.bind(this))
      } 
    setUserPic(linkValue) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              "Authorization" : `Bearer ${this._getJwt()}`
            },
            body: JSON.stringify({
                avatar: linkValue
            })
        })
        .then(this._checkResponse.bind(this))
      } 
    postCard(values) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              "Authorization" : `Bearer ${this._getJwt()}`
            },
            body: JSON.stringify({
                name: values.name,
                link: values.link
            })
        })
        .then(this._checkResponse.bind(this))
      } 
    deleteCard(value) {
        return fetch(`${this.baseUrl}/cards/${value}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              "Authorization" : `Bearer ${this._getJwt()}`
            },
        })
        .then(this._checkResponse.bind(this))
      } 
    likeCard(value) {
        return fetch(`${this.baseUrl}/cards/${value}/likes`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              "Authorization" : `Bearer ${this._getJwt()}`
            },
        })
        .then(this._checkResponse.bind(this))
      } 
    unLikeCard(value) {
        return fetch(`${this.baseUrl}/cards/${value}/likes`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
              "Authorization" : `Bearer ${this._getJwt()}`
            },
        })
        .then(this._checkResponse.bind(this))
      }
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    _getJwt() {
      return localStorage.jwt;
    }
}

const baseUrl = 'https://wet-kitty.nomoredomains.work';

const addApi = new Api(baseUrl);
export default addApi;