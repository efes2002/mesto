import {PopUpCardView} from "./PopUpCardView.js";
import {settingsPopUpCardView} from "./constants.js";

const popUpCardView = new PopUpCardView(settingsPopUpCardView);

export class Card {
  constructor(data, settingsCard){
    this._cardElement = document
      .querySelector(`#${settingsCard.nameIdTemplateCard}`)
      .content.querySelector(`.${settingsCard.nameClassCardElement}`)
      .cloneNode(true);
    this._elementCardImg = this._cardElement.querySelector(`.${settingsCard.nameClassCardImg}`);
    this._elementCardText = this._cardElement.querySelector(`.${settingsCard.nameClassCardTitle}`);
    this._elementCardButtonDelete = this._cardElement.querySelector(`.${settingsCard.nameClassCardButtonDelete}`);
    this._elementCardButtonLike = this._cardElement.querySelector(`.${settingsCard.nameClassCardButtonLike}`);
    this._nameClassCardImg = settingsCard.nameClassCardImg;
    this._nameClassCardTitle = settingsCard.nameClassCardTitle;
    this._nameClassCardElement = settingsCard.nameClassCardElement;
    this._nameClassCardButtonLikeAction= settingsCard.nameClassCardButtonLikeAction;
    this._name = data.name;
    this._link = data.link;
    this._alt = `Фотография ${data.name}`;
    this.nameClassInsertForCard = settingsCard.nameClassInsertForCard;
  }

  _fillCardElement() {
    this._elementCardImg.src = this._link;
    this._elementCardImg.alt = this._alt;
    this._elementCardText.textContent = this._name;
  }

  _openPopup(event) {
    const cardElement = event.target.parentElement;
    popUpCardView.openPopupCardView(cardElement, this._nameClassCardImg, this._nameClassCardTitle);
  }

  _deleteElement(event) {
    event.target.closest(`.${this._nameClassCardElement}`).remove();
  }

  _toggleLike(event) {
    event.target.classList.toggle(this._nameClassCardButtonLikeAction);
  }

  _addEventListener() {
    this._elementCardImg.addEventListener('click', (event)=>{this._openPopup(event)});
    this._elementCardButtonDelete.addEventListener('click', (event)=>{this._deleteElement(event)});
    this._elementCardButtonLike.addEventListener('click', (event)=>{this._toggleLike(event)});
  }

  setCardElement() {
    this._fillCardElement();
    this._addEventListener();
    return this._cardElement;
  }
}
