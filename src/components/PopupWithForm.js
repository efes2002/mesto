import {settingsPopup, settingsValidate} from "./constants.js";
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit, callbackOpen) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._callbackOpen = callbackOpen;
    this._popupButtonElement = this._popupElement.querySelector(`.${settingsPopup.nameClassPopupFormButton}`);
    this._submitPopupFormBind = this._submitPopupForm.bind(this);
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(settingsValidate.inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', this._submitPopupFormBind);
    super.setEventListeners();
  }

  _submitPopupForm(event) {
    event.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this.close();
  }

  open() {
    this._callbackOpen();
    super.open.bind(this)();
  }

  close() {
    this._popupElement.removeEventListener('submit', this._submitPopupFormBind);
    this._popupButtonElement.classList.add(settingsValidate.inactiveButtonClass);
    if (!this._popupButtonElement.hasAttribute('disabled')) {this._popupButtonElement.setAttribute('disabled', '')}
    super.close();
  }
}
