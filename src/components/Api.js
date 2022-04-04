export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.authorization;
    this._headers = {headers: {authorization: options.authorization}}
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {authorization: this._authorization}
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {authorization: this._authorization}
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  editeProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: String(name),
        about: String(about)
      })
    }).then(res => {
      if (res.ok) { return res.json(); }
      return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  addNewCard({name, link}) {
    console.log(8, String(name), String(link))
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: String(name),
        link: String(link)
      })
    }).then(res => {
      if (res.ok) { return res.json(); }
      return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

}
