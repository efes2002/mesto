export class Card {
  constructor(data, settingsCard, openPopupCardView, idUser){
    this._cardElement = document
      .querySelector(`#${settingsCard.nameIdTemplateCard}`)
      .content.querySelector(`.${settingsCard.nameClassCardElement}`)
      .cloneNode(true);
    this._elementCardImg = this._cardElement.querySelector(`.${settingsCard.nameClassCardImg}`);
    this._elementCardText = this._cardElement.querySelector(`.${settingsCard.nameClassCardTitle}`);
    this._elementCardButtonDelete = this._cardElement.querySelector(`.${settingsCard.nameClassCardButtonDelete}`);
    this._elementCardButtonLike = this._cardElement.querySelector(`.${settingsCard.nameClassCardButtonLike}`);
    this._elementCardLikeNumber = this._cardElement.querySelector(`.${settingsCard.nameClassLikeNumber}`);
    this._nameClassCardButtonLikeAction= settingsCard.nameClassCardButtonLikeAction;
    this._nameClassCardButtonDeleteAction = settingsCard.nameClassCardButtonDeleteAction;
    this._idUser = idUser;
    this._name = data.name;
    this._link = data.link;
    this._alt = `Фотография ${data.name}`;
    this._likeNumber = data.likeNumber;
    this._idCard = data.idCard;
    this._idOwnerCard = data.idOwnerCard;
    this.nameClassInsertForCard = settingsCard.nameClassInsertForCard;
    this._openPopupCardView = openPopupCardView;
  }

  _fillCardElement() {
    this._elementCardImg.src = this._link;
    this._elementCardImg.alt = this._alt;
    this._elementCardText.textContent = this._name;
    this._elementCardLikeNumber.textContent = this._likeNumber;
    if (this._idUser ===  this._idOwnerCard) {
      this._elementCardButtonDelete.classList.toggle(this._nameClassCardButtonDeleteAction)
    }
  }

  _openPopup() {
    this._openPopupCardView(this._name, this._link, this._alt);
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
