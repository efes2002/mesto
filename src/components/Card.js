export class Card {
  constructor(data, settingsCard, openPopupCardView){
    this._cardElement = document
      .querySelector(`#${settingsCard.nameIdTemplateCard}`)
      .content.querySelector(`.${settingsCard.nameClassCardElement}`)
      .cloneNode(true);
    this._elementCardImg = this._cardElement.querySelector(`.${settingsCard.nameClassCardImg}`);
    this._elementCardText = this._cardElement.querySelector(`.${settingsCard.nameClassCardTitle}`);
    this._elementCardButtonDelete = this._cardElement.querySelector(`.${settingsCard.nameClassCardButtonDelete}`);
    this._elementCardButtonLike = this._cardElement.querySelector(`.${settingsCard.nameClassCardButtonLike}`);
    this._nameClassCardButtonLikeAction= settingsCard.nameClassCardButtonLikeAction;
    this._name = data.name;
    this._link = data.link;
    this._alt = `Фотография ${data.name}`;
    this.nameClassInsertForCard = settingsCard.nameClassInsertForCard;
    this._openPopupCardView = openPopupCardView;
  }

  _fillCardElement() {
    this._elementCardImg.src = this._link;
    this._elementCardImg.alt = this._alt;
    this._elementCardText.textContent = this._name;
  }

  _openPopup() {
    this._openPopupCardView();
  }

  _deleteElement() {
    this._cardElement.remove();
  }

  _toggleLike() {
    this._elementCardButtonLike.classList.toggle(this._nameClassCardButtonLikeAction);
  }

  _addEventListener() {
    this._elementCardImg.addEventListener('click', ()=>{this._openPopup()});
    this._elementCardButtonDelete.addEventListener('click', ()=>{this._deleteElement()});
    this._elementCardButtonLike.addEventListener('click', ()=>{this._toggleLike()});
  }

  setCardElement() {
    this._fillCardElement();
    this._addEventListener();
    return this._cardElement;
  }
}
