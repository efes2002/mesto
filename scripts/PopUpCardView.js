import { PopUp } from './PopUp.js';

export class PopUpCardView extends PopUp {

  constructor(settings) {
    super(settings);
    this._elementPopUpPopUpCardView = document.querySelector(`#${settings.nameIdPopUp}`);
    this._elementPopUpImg = this._elementPopUpPopUpCardView.querySelector(`.${settings.nameClassPopUpImg}`);
    this._elementPopUpTitle = this._elementPopUpPopUpCardView.querySelector(`.${settings.nameClassPopUpTitle}`);
  }

  openPopupCardView(elementCard, nameClassCardImg, nameClassCardTitle) {
    const elementCardImg = elementCard.querySelector(`.${nameClassCardImg}`);
    const elementCardText = elementCard.querySelector(`.${nameClassCardTitle}`);
    const name = elementCardText.textContent;
    const link = elementCardImg.src;
    const alt = elementCardImg.alt;
    this._elementPopUpImg.src = link;
    this._elementPopUpImg.alt = alt;
    this._elementPopUpTitle.textContent = name;
    super._openPopup();
  }

}
