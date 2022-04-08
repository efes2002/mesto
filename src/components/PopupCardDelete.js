import {settingsPopupCardDelete} from "../scripts/constants.js";
import { Popup } from './Popup.js';

export class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popupElement.querySelector(`.${settingsPopupCardDelete.nameClassPopupButton}`);
  }

  setEventListeners() {
    this._button.addEventListener('click', (event)=>{
      event.preventDefault();
      this._button.textContent = "Удаление..."
      this._callbackCardDelete(()=>{
        super.close();
        this._button.textContent = "Да"
      });
    });
    super.setEventListeners();
  }
  open(callbackCardDelete) {
    this._callbackCardDelete = callbackCardDelete;
    super.open();
  }
}
