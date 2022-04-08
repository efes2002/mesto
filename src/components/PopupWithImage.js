import {settingsPopUpCardView} from "../scripts/constants.js";
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImg = this._popupElement.querySelector(`.${settingsPopUpCardView.nameClassPopUpImg}`);
    this._cardTitle = this._popupElement.querySelector(`.${settingsPopUpCardView.nameClassPopUpTitle}`);
  }

  open(name, link, alt) {
    this._cardImg.src = link;
    this._cardImg.alt = alt;
    this._cardTitle.textContent = name;
    super.open();
  }
}
