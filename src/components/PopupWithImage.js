import {settingsPopUpCardView} from "./constants.js";
import { Popup } from './Popup.js';
import {popupWithImage} from '../pages'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    const popupCardViewElement = document.querySelector(`#${settingsPopUpCardView.nameIdPopUp}`);
    const popupCardViewImgElement = popupCardViewElement.querySelector(`.${settingsPopUpCardView.nameClassPopUpImg}`);
    const popupCardViewTitleElement = popupCardViewElement.querySelector(`.${settingsPopUpCardView.nameClassPopUpTitle}`);
    const name = this._elementCardText.textContent;
    const link = this._elementCardImg.src;
    const alt = this._elementCardImg.alt;
    popupCardViewImgElement.src = link;
    popupCardViewImgElement.alt = alt;
    popupCardViewTitleElement.textContent = name;
    super.open.bind(popupWithImage)();
  }
}
