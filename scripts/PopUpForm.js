import {Validation} from "./Validator.js";
import {settingsValidate} from './constants.js';
import {PopUp} from "./PopUp.js";

export class PopUpForm extends PopUp {
  constructor(settings) {
    super(settings);
    this._formElement = this._popupElement.querySelector(`.${settings.nameClassPopUpForm}`);
    this._formButtonElement = this._popupElement.querySelector(`.${settings.nameClassPopUpFormButton}`);
    this._buttonOpenElement = document.querySelector(`.${settings.nameClassButtonOpenPopUp}`);
    this._nameClassPopUpFormButtonDisabled = settings.nameClassPopUpFormButtonDisabled;
    this._nameIdPopUpFormInput1 = settings.nameIdPopUpFormInput1;
    this._nameIdPopUpFormInput2 = settings.nameIdPopUpFormInput2;
    this._elementPopUpProfileInput1 = document.querySelector(`#${this._nameIdPopUpFormInput1}`);
    this._elementPopUpprofileInput2 = document.querySelector(`#${this._nameIdPopUpFormInput2}`);
  }

  _submitPopupForm () {
    super._closePopup();
    this._formButtonElement.toggleAttribute(`${this._nameClassPopUpFormButtonDisabled}`);
    this._formButtonElement.classList.toggle(settingsValidate.inactiveButtonClass);
  }

  _openPopUpForm() {
    let firstStart = true;
    let classValidation = {};
    if (firstStart) {
      classValidation = new Validation(settingsValidate, this._formElement);
      classValidation.enableValidation();
      firstStart = false;
    }
    classValidation.startHideInputError(this._elementPopUpProfileInput1);
    classValidation.startHideInputError(this._elementPopUpprofileInput2);
    super._openPopup();
  }
}
