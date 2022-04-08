export class Card {
  constructor(data, settingsCard,
    openPopupCardView, openPopupCardDelete,
    callBackAddLike, callBackDeleteLike, idUser) {
    this._cardElement = document
      .querySelector(`#${settingsCard.nameIdTemplateCard}`)
      .content.querySelector(`.${settingsCard.nameClassCardElement}`)
      .cloneNode(true);
    this._cardImg = this._cardElement.querySelector(`.${settingsCard.nameClassCardImg}`);
    this._cardTitle = this._cardElement.querySelector(`.${settingsCard.nameClassCardTitle}`);
    this._cardButtonDelete = this._cardElement.querySelector(`.${settingsCard.nameClassCardButtonDelete}`);
    this._cardButtonLike = this._cardElement.querySelector(`.${settingsCard.nameClassCardButtonLike}`);
    this._cardLikeNumber = this._cardElement.querySelector(`.${settingsCard.nameClassLikeNumber}`);
    this._nameClassCardButtonLikeAction= settingsCard.nameClassCardButtonLikeAction;
    this._nameClassCardButtonDeleteAction = settingsCard.nameClassCardButtonDeleteAction;
    this._idUser = idUser;
    this._name = data.name;
    this._link = data.link;
    this._alt = `Фотография ${data.name}`;
    this._likeNumber = data.likes.length;
    this._idCard = data._id;
    this._idOwnerCard = data.owner._id;
    this._isMyLike = data.likes.filter(item => item._id === this._idUser).length === 1;
    this._openPopupCardView = openPopupCardView;
    this._openPopupCardDelete = openPopupCardDelete;
    this._callBackAddLike = callBackAddLike;
    this._callBackDeleteLike = callBackDeleteLike;
  }

  _fillCardElement() {
    this._cardImg.src = this._link;
    this._cardImg.alt = this._alt;
    this._cardTitle.textContent = this._name;
    this._updateLikeNumber();
    if (this._idUser ===  this._idOwnerCard) {
      this._cardButtonDelete.classList.add(this._nameClassCardButtonDeleteAction)
    }
    else {this._cardButtonDelete.classList.remove(this._nameClassCardButtonDeleteAction)
    }
    this._toggleLike();
  }

  _openPopup() {
    this._openPopupCardView(this._name, this._link, this._alt);
  }

  _deleteElement() {
    this._cardElement.remove();
  }

  _toggleLike() {
    if (this._isMyLike) {
      this._cardButtonLike.classList.add(this._nameClassCardButtonLikeAction);
    }
    else {
      this._cardButtonLike.classList.remove(this._nameClassCardButtonLikeAction);
    }
  }

  _updateLikeNumber() {
    this._cardLikeNumber.textContent = this._likeNumber;
  }

  _updateCard(item) {
    this._likeNumber = item.likes.length;
    this._isMyLike = item.likes.filter(item => item._id === this._idUser).length === 1;
    this._fillCardElement();
  }

  _addEventListener() {
    this._cardImg.addEventListener('click', () => {this._openPopup()});

    this._cardButtonDelete.addEventListener('click', () => {
      this._openPopupCardDelete(() => {this._deleteElement()}, this._idCard);
    });

    this._cardButtonLike.addEventListener('click', () => {
      if (this._isMyLike) {
        this._callBackDeleteLike(this._idCard, (item)=>{this._updateCard(item)});
      }
      else {
        this._callBackAddLike(this._idCard, (item)=>{this._updateCard(item)});
      }
    });
  }

  setCardElement() {
    this._fillCardElement();
    this._addEventListener();
    return this._cardElement;
  }
}
