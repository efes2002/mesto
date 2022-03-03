const placesElements = document.querySelector('.places__elements');
const cardTemplateElement = document.querySelector('#template-card').content;


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


const popupProfile = {
  popupName: 'popup-edit-profile',
  elementButtonOpen: document.querySelector('.profile__edit-button'),
  profileName: document.querySelector(`#profileName`),
  profileJob: document.querySelector('#profileJob'),
  openFunction: () => {
    this.profileName.value = nameProfileElement.textContent;
    this.profileJob.value = jobProfileElement.textContent;
    hideInputError(valueValidate, this.profileName);
    hideInputError(valueValidate, this.profileJob);
  },
  submitFunction: (event) => {
    nameProfileElement.textContent = event.target.profileName.value;
    jobProfileElement.textContent = event.target.profileJob.value;
  }
};

const popupCard = {
  popupName: 'popup-add-card',
  elementButtonOpen: document.querySelector('.profile__add-button'),
  cardName: document.querySelector('#cardName'),
  cardLink: document.querySelector('#cardLink'),
  openFunction: () => {
    this.cardName.value = '';
    this.cardLink.value = '';
    hideInputError(valueValidate, this.cardName);
    hideInputError(valueValidate, this.cardLink);
  },
  submitFunction: (event) => {
    renderCard ({
      name: event.target.cardName.value,
      link: event.target.cardLink.value
    }, placesElements);
  }
};





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

  _editPopupCardView (name, link, alt) {
    const cardViewElement = document.querySelector('#popup-card-view');
    const cardViewImg = cardViewElement.querySelector('.element-view__img');
    const cardViewTitle = cardViewElement.querySelector('.element-view__title');
    cardViewImg.src = link;
    cardViewImg.alt = alt;
    cardViewTitle.textContent = name;
    this._openPopup(cardViewElement);
  }

  _openPopup() {
    this._editPopupCardView(this._name, this._link, this._alt);
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




class popUp {
  constructor() {}

  openPopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
    popupElement.addEventListener('click', this._listenerClickOverlayPopupElement);
    document.addEventListener('keydown', this._listenerKeydownPopupElement);
  }

  closePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
    document.removeEventListener('keydown', this._listenerKeydownPopupElement);
    popupElement.removeEventListener('click', this._listenerClickOverlayPopupElement);
  }

  _listenerClickOverlayPopupElement(event) {
    const popupElement = document.querySelector('.popup_opened')
    if ((popupElement) && (popupElement === event.target)) {
      this._closePopup(popupElement);
    }
  }

  _listenerKeydownPopupElement(event) {
    if (event.key === "Escape") {
      const popupElement = document.querySelector('.popup_opened')
      this._closePopup(popupElement);
    }
  }
}




class popUpCardView extends popUp {
  constructor() {
    super();
  }
  setPopup() {
    function closePopupCardView() {
      super._closePopup(cardViewElement)
    }
    buttonXCardViewElement.addEventListener('click', closePopupCardView);
  }
}



class popUpForm extends popUp {
  constructor(arg) {
    super();
    this._arg = arg;
  }

  setPopUpForm() {
    const popupElement = document.querySelector(`#${this._arg.popupName}`);
    const buttonXElement = popupElement.querySelector('.popup__button-x');
    const buttonSubmit = popupElement.querySelector('.form');

    function closePopupForm() {
      super._closePopup(popupElement);
    }
    function openPopupForm() {
      this._arg.openFunction();
      super._openPopup(popupElement);
    }
    function submitPopupForm(event) {
      const buttonElement = popupElement.querySelector("button");
      event.preventDefault();
      this._arg.submitFunction(event);
      super._closePopup(popupElement);
      buttonElement.toggleAttribute("disabled");
      buttonElement.classList.toggle(valueValidate.inactiveButtonClass);
    }
    this._arg.elementButtonOpen.addEventListener('click', openPopupForm);
    buttonXElement.addEventListener('click', closePopupForm);
    buttonSubmit.addEventListener('submit', submitPopupForm);
  }
}


class popUpCardForm extends popUpForm {
  constructor() {
    super();

  }
}

class popUpProfileForm extends popUpForm {
  constructor() {
    super();
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
