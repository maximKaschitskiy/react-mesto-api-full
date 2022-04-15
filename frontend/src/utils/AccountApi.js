class AccountApi {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }

    register(values) {
      console.log('register');
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                      'Access-Control-Allow-Credentials': 'true'},
            body: JSON.stringify({
              login: values.login,
              password: values.password
            })
        })
        .then(this._checkResponse.bind(this))
      } 

    auth(values) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                      'Access-Control-Allow-Credentials': 'true'},
            body: JSON.stringify({
              login: values.login,
              password: values.password
            })
        })
        .then(this._checkResponse.bind(this))
      }

    validation(values) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${values}`,
                'Access-Control-Allow-Credentials': 'true'
            }
        })
        .then(this._checkResponse.bind(this))
      } 

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const baseUrl = 'http://localhost:3001';

const accountApi = new AccountApi(baseUrl);
export default accountApi;