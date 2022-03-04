const placesElements = document.querySelector('.places__elements');
const cardTemplateElement = document.querySelector('#template-card').content;

const valueValidate = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settingsPopUpProfile = {
  nameClassPopUp: 'popup-edit-profile',
  nameClassPopUpOpen: 'popup_opened',
  nameClassPopUpButtonX: 'popup__button-x',
  nameClassButtonOpenPopUp:'profile__edit-button',
  nameClassPopUpForm: 'form',
  nameClassPopUpFormButton: 'form__button',
  nameClassPopUpFormInput1: '#profileName',
  nameClassPopUpFormInput2: '#profileJob',

  openFunction: () => {
    const profileName = document.querySelector(`${this.nameClassPopUpFormInput1}`);
    const profileJob = document.querySelector(`${this.nameClassPopUpFormInput2}`);
    profileName.value = nameProfileElement.textContent;
    profileJob.value = jobProfileElement.textContent;
    hideInputError(valueValidate, profileName);
    hideInputError(valueValidate, profileJob);
  },

  submitFunction: (event) => {
    nameProfileElement.textContent = event.target.profileName.value;
    jobProfileElement.textContent = event.target.profileJob.value;
  }
};

const settingsPopUpCard = {
  nameClassPopUp: 'popup-add-card',
  nameClassPopUpOpen: 'popup_opened',
  nameClassPopUpButtonX: 'popup__button-x',
  nameClassButtonOpenPopUp:'profile__add-button',
  nameClassPopUpForm: 'form',
  nameClassPopUpFormButton: 'form__button',
  nameClassPopUpFormButtonDisabled: 'disabled',
  nameClassPopUpFormInput1: '#cardName',
  nameClassPopUpFormInput2: '#cardLink',

  openFunction: () => {
    const cardName = document.querySelector(`${this.nameClassPopUpFormInput1}`);
    const cardLink = document.querySelector(`${this.nameClassPopUpFormInput2}`);
    cardName.value = '';
    cardLink.value = '';
    hideInputError(valueValidate, cardName);
    hideInputError(valueValidate, cardLink);
  },

  submitFunction: (event) => {
    renderCard ({
      name: event.target.cardName.value,
      link: event.target.cardLink.value
    }, placesElements);
  }
};

const settingsPopUpCardView = {
  nameClassPopUp: 'popup-card-view',
  nameClassPopUpOpen: 'popup_opened',
  nameClassPopUpButtonX: 'popup__button-x',
}

/*Создаем классы для попапов*/

class PopUp {

  constructor(settings) {
    this._popupElement = document.querySelector(`.${settings.nameClassPopUp}`);
    this._buttonXElement = this._popupElement.querySelector(`.${settings.nameClassPopUpButtonX}`);
    this._nameClassPopUpOpen = settings.nameClassPopUpOpen;
    this._arg = settings;
  }

  _openPopup() {
    this._popupElement.classList.toggle(this._nameClassPopUpOpen);
    this._popupElement.addEventListener('click', this._listenerClickOverlayPopupElement);
    document.addEventListener('keydown', this._listenerKeydownPopupElement);
    this._buttonXElement.addEventListener('click', this._listenerPushButtonXElement);
  }

  _closePopup() {
    this._popupElement.classList.toggle(this._nameClassPopUpOpen);
    document.removeEventListener('keydown', this._listenerKeydownPopupElement);
    this._popupElement.removeEventListener('click', this._listenerClickOverlayPopupElement);
    this._buttonXElement.removeEventListener('click', this._listenerPushButtonXElement);
  }

  _listenerClickOverlayPopupElement(event) {
    if ((this._popupElement) && (this._popupElement === event.target)) {
      this._closePopup();
    }
  }

  _listenerKeydownPopupElement(event) {
    if (event.key === "Escape") {
      this._closePopup();
    }
  }

  _listenerPushButtonXElement() {
    this._closePopup();
  }

}

class PopUpCardView extends PopUp {

  constructor(settings) {
    super(settings);
  }

  openPopupCardView(name, link, alt) {
    cardViewImg.src = link;
    cardViewImg.alt = alt;
    cardViewTitle.textContent = name;
    super._openPopup();
  }

}

class PopUpForm extends PopUp {

  constructor(settings) {
    super(settings);
    this._formElement = this._popupElement.querySelector(`.${settings.nameClassPopUpForm}`);
    this._formButtonElement = this._popupElement.querySelector(`.${settings.nameClassPopUpFormButton}`);
    this._buttonOpenElement = document.querySelector(`.${settings.nameClassButtonOpenPopUp}`);
    this._nameClassPopUpFormButtonDisabled = settings.nameClassPopUpFormButtonDisabled;
  }

  _submitPopupForm(event) {
    event.preventDefault();
    this._arg.submitFunction(event);
    super._closePopup();
    this._formButtonElement.toggleAttribute(`${this._nameClassPopUpFormButtonDisabled}`);
    this._formButtonElement.classList.toggle(valueValidate.inactiveButtonClass);
  }

  _openPopupForm() {
    this._arg.openFunction();
    super._openPopup();
  }

  setPopUp() {
    this._buttonOpenElement.addEventListener('click', this._openPopupForm);
    this._formElement.addEventListener('submit', this._submitPopupForm);
  }
}

/*Наполняем свойствами наши попапы используя классы*/

const popUpCardView = new PopUpCardView(settingsPopUpCardView);

const popUpProfile = new PopUpForm(settingsPopUpProfile);
popUpProfile.setPopUp();

const popUpCard = new PopUpForm(settingsPopUpCard);
popUpCard.setPopUp();


/*Создаем классы для карточек мест*/

class Card {
  constructor(data, cardTemplateElement){
    this._cardElement = cardTemplateElement.querySelector('.element').cloneNode(true);
    this._name = data.name;
    this._link = data.link;
    this._alt = `Фотография ${data.name}`;
  }

  _fillCardElement() {
    this._cardElement.querySelector('.element__img').src = this._link;
    this._cardElement.querySelector('.element__img').alt = this._alt;
    this._cardElement.querySelector('.element__title').textContent = this._name;
  }

  _openPopup() {
    popUpCardView.openPopupCardView(this._name, this._link, this._alt);
  }

  _deleteElement(event) {
    event.target.closest('.element').remove();
  }

  _toggleLike(event) {
    event.target.classList.toggle('element__like_action');
  }

  _addEventListener() {
    const cardImgElement = this._cardElement.querySelector('.element__img');
    const cardButtonDelete = this._cardElement.querySelector('.element__delete');
    const cardButtonLike = this._cardElement.querySelector('.element__like');

    cardImgElement.addEventListener('click', this._openPopup);
    cardButtonDelete.addEventListener('click', this._deleteElement);
    cardButtonLike.addEventListener('click', this._toggleLike);
  }

  setCardElement() {
    this._fillCardElement();
    this._addEventListener();
    return this._cardElement;
  }
}


function renderCard(item, parentElement) {
  const card = new Card(item, cardTemplateElement);
  parentElement.prepend(card.setCardElement());
}

function startInitialCards() {
  initialCards.forEach((item)=>{
    renderCard(item, placesElements);
  });
}

startInitialCards();
