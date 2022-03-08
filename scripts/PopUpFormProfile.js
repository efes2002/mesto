import { PopUpForm } from './PopUpForm.js';

export class PopUpFormProfile extends PopUpForm {
  constructor(settings) {
    super(settings);
    this._elementProfileInput1 = document.querySelector(`.${settings.nameClassProfileInput1}`);
    this._elementProfileInput2 = document.querySelector(`.${settings.nameClassProfileInput2}`);
  }

  _openPopupForm = () => {
    this._elementPopUpProfileInput1.value = this._elementProfileInput1.textContent;
    this._elementPopUpprofileInput2.value = this._elementProfileInput2.textContent;
    super._openPopUpForm();
  }

  _submitPopupForm = (event) => {
    event.preventDefault();
    this._elementProfileInput1.textContent = event.target[this._nameIdPopUpFormInput1].value;
    this._elementProfileInput2.textContent = event.target[this._nameIdPopUpFormInput2].value;
    super._submitPopupForm();
  }

  setPopUp() {
    this._buttonOpenElement.addEventListener('click', this._openPopupForm);
    this._formElement.addEventListener('submit', this._submitPopupForm);
  }
}
