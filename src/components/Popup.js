import {settingsPopup} from "./constants.js";

export class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._buttonXElement = this._popupElement.querySelector(`.${settingsPopup.nameClassPopupButtonX}`);
    this._handleClickXBind = this._handleClickX.bind(this);
    this._handleOverlayCloseBind = this._handleOverlayClose.bind(this);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popupElement.classList.toggle(settingsPopup.nameClassPopupOpen);
  }

  close() {
    this._popupElement.classList.toggle(settingsPopup.nameClassPopupOpen);
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
