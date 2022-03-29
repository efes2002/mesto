import {settingsPopup} from "../scripts/constants.js";

export class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._buttonXElement = this._popupElement.querySelector(`.${settingsPopup.nameClassPopupButtonX}`);
    this._handleEscCloseBind = this._handleEscClose.bind(this)
  }

  open() {
    this._popupElement.classList.toggle(settingsPopup.nameClassPopupOpen);
    document.addEventListener('keydown', this._handleEscCloseBind);
  }

  close() {
    this._popupElement.classList.toggle(settingsPopup.nameClassPopupOpen);
    document.removeEventListener('keydown', this._handleEscCloseBind);
  }

  setEventListeners() {
    this._buttonXElement.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  _handleEscClose(event) {
    if ((this._popupElement.classList.contains('popup_opened'))&&(event.key === "Escape")) {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if ((this._popupElement) && (this._popupElement === event.target)) {
      this.close();
    }
  }
}
