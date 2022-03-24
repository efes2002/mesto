import {settingsValidate} from "./constants";
import {FormValidator} from "./FormValidator";

class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._buttonXElement = this._popupElement.querySelector('.popup__button-x');
    this._handleClickXBind = this._handleClickX.bind(this);
    this._handleOverlayCloseBind = this._handleOverlayClose.bind(this);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popupElement.classList.toggle('popup_opened');
  }

  close() {
    this._popupElement.classList.toggle('popup_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    this._buttonXElement.addEventListener('click', this._handleClickXBind);
    this._popupElement.addEventListener('click', this._handleOverlayCloseBind);
    document.addEventListener('keydown', this._handleEscCloseBind);
  }

  _removeEventListeners() {
    this._buttonXElement.removeEventListener('click', this._handleClickXBind);
    this._popupElement.removeEventListener('click', this._handleOverlayCloseBind);
    document.removeEventListener('keydown', this._handleEscCloseBind);

  }
  _handleClickX() {
    this.close();
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this._handleClickX();
    }
  }

  _handleOverlayClose(event) {
    if ((this._popupElement) && (this._popupElement === event.target)) {
      this._handleClickX();
    }
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupButtonElement = this._popupElement.querySelector('.form__button');
  }

  _getInputValues() {/*Содержит приватный метод _getInputValues, который собирает данные всех полей формы.*/
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() { /*добавлять обработчик сабмита формы*/
    this._popupElement.addEventListener('submit', this._callbackSubmit);
    super.open();
  }

  close() {/*при закрытии попапа форма должна ещё и сбрасываться*/
    this._popupElement.removeEventListener('submit', this._callbackSubmit);
    this._popupButtonElement.toggleAttribute('disabled');
    this._popupButtonElement.classList.toggle('form__button_disabled');
    super.close();
  }

}

class UserInfo{
  constructor({nameSelector, jobSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
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
}
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector : '.profile__job'});



const callbackSubmitEditProfile = function() {
  const data = this._getInputValues();
  userInfo.setUserInfo({name: data.profileName, job: data.profileJob});
  this.close();
}

const popupFormEditProfile = new PopupWithForm('#popup-edit-profile', callbackSubmitEditProfile);

const popUpProfileValidator = new FormValidator(settingsValidate, popupProfileElement);
popUpProfileValidator.enableValidation();

buttonOpenPopupProfileElement.addEventListener('click', popupFormEditProfile.setEventListeners.bind(popupFormEditProfile));
