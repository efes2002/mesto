import {settingsPopup} from "../scripts/constants.js";
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit, callbackOpen) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('form');
    this._formButton = this._popupElement.querySelector(`.${settingsPopup.nameClassPopupFormButton}`);
    this._callbackSubmit = callbackSubmit;
    this._callbackOpen = callbackOpen;

  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(settingsPopup.inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (event)=>{
      event.preventDefault();
      this._formButton.textContent = 'Сохранение...'
      this._callbackSubmit(this._getInputValues(), (text)=>{
        this.close();
        this._formButton.textContent = text;
      });
    });
    super.setEventListeners();
  }

  open() {
    if (this._callbackOpen) {this._callbackOpen();}
    super.open();
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}
