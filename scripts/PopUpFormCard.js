import { PopUpForm } from './PopUpForm.js';
import { renderCard } from './index.js';

export class PopUpFormCard extends PopUpForm {
  constructor(settings) {
    super(settings);
  }

  _openPopupForm = () => {
    this._elementPopUpProfileInput1.value = '';
    this._elementPopUpprofileInput2.value = '';
    super._openPopUpForm();
  }

  _submitPopupForm = (event) => {
    event.preventDefault();
    renderCard ({
      name: event.target[this._nameIdPopUpFormInput1].value,
      link: event.target[this._nameIdPopUpFormInput2].value
    });
    super._submitPopupForm();
  }

  setPopUp() {
    this._buttonOpenElement.addEventListener('click', this._openPopupForm);
    this._formElement.addEventListener('submit', this._submitPopupForm);
  }
}
