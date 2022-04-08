import {settingsPopup} from "../scripts/constants.js";
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit, callbackOpen) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('form');
    this._submitButton = this._popupElement.querySelector(`.${settingsPopup.nameClassPopupFormButton}`);
    this._inputList = this._form.querySelectorAll(settingsPopup.inputSelector);
    this._textSubmitButton = this._submitButton.textContent;
    this._callbackSubmit = callbackSubmit;
    this._callbackOpen = callbackOpen;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitButton.textContent = 'Сохранение...'
      this._callbackSubmit(
        this._getInputValues(),
        () => {this.close(); this._submitButton.textContent = this._textSubmitButton;}
      );
    });
    super.setEventListeners();
  }

  open() {
    if (this._callbackOpen) {this._callbackOpen();}
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
