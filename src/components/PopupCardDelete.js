import {settingsPopupCardDelete} from "../scripts/constants.js";
import { Popup } from './Popup.js';

export class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonElement = this._popupElement.querySelector(`.${settingsPopupCardDelete.nameClassPopupButton}`)
  }

  setEventListeners() {
    this._buttonElement.addEventListener('click', (event)=>{
      event.preventDefault();
      this._callBackCardDelete();
      super.close();
    });
    super.setEventListeners();
  }
  open(callBackCardDelete) {
    this._callBackCardDelete = callBackCardDelete;
    super.open();
  }
}
