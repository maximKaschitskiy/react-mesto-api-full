class Api {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
    postCard(values, items) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Credentials': 'true',
              "Authorization" : `Bearer ${this._getJwt()}`
            },
            body: values, items
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

const baseUrl = 'http://localhost:3001';

const api = new Api(baseUrl);
export default api;