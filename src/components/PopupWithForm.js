import {settingsPopup, settingsValidate} from "../scripts/constants.js";
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit, callbackOpen, callStartHideInputError) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._callbackOpen = callbackOpen;
    this._callStartHideInputError = callStartHideInputError;
    this._popupButtonElement = this._popupElement.querySelector(`.${settingsPopup.nameClassPopupFormButton}`);
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
    this._popupElement.addEventListener('submit', this._submitPopupForm.bind(this));
    super.setEventListeners();
  }

  _submitPopupForm(event) {
    event.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this.close();
  }

  open() {
    this._callbackOpen();
    this._inputList = this._popupElement.querySelectorAll(settingsValidate.inputSelector);
    this._inputList.forEach(input => {
      this._callStartHideInputError(input);
    });
    super.open();
  }

  close() {
    this._popupButtonElement.classList.add(settingsPopup.inactiveButtonClass);
    if (!this._popupButtonElement.hasAttribute('disabled')) {this._popupButtonElement.setAttribute('disabled', '')}
    super.close();
  }
}
