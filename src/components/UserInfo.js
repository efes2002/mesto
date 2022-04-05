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

  setUserInfo({name, job}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  initialProfile({name, job, url, idUser}) {
    this.setUserInfo({name, job});
    this.setImgAvatar(url);
    this._idUser = idUser;
  }

  setImgAvatar(url) {
    this._imgAvatar.src = url;
  }

  getIdUser() {
    return this._idUser;
  }
}
