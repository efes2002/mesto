export class UserInfo{
  constructor({nameSelector, jobSelector, imgAvatar}) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._imgAvatar = document.querySelector(imgAvatar);
  }

  getUserInfo() {
    const name = this._nameElement.textContent;
    const job = this._jobElement.textContent;
    return {name: name, job: job}
  }

  setUserInfo({name, job, url, idUser}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._idUser = idUser;
    this.setImgAvatar(url);
  }

  setImgAvatar(url) {
    this._imgAvatar.src = url;
  }

  getIdUser() {
    return this._idUser;
  }
}
