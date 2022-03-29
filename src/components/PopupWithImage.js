import {settingsPopUpCardView} from "../scripts/constants.js";
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link, alt) {
    const popupCardViewImgElement = this._popupElement.querySelector(`.${settingsPopUpCardView.nameClassPopUpImg}`);
    const popupCardViewTitleElement = this._popupElement.querySelector(`.${settingsPopUpCardView.nameClassPopUpTitle}`);
    popupCardViewImgElement.src = link;
    popupCardViewImgElement.alt = alt;
    popupCardViewTitleElement.textContent = name;
    super.open();
  }
}
