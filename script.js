const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Фотография от пользователя'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Фотография от пользователя'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Фотография от пользователя'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Фотография от пользователя'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Фотография от пользователя'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Фотография от пользователя'
  }
];
const popupProfile = {
  popupName: 'popup-edit-profile',
  elementButtonOpen: document.querySelector('.profile__edit-button'),
  openFunction: (popupElement) => {
    const input1 = popupElement.querySelector('#profileName');
    const input2 = popupElement.querySelector('#profileJob');
    const nameElement = document.querySelector('.profile__name');
    const jobElement = document.querySelector('.profile__job');
    input1.value = nameElement.textContent;
    input2.value = jobElement.textContent;
  },
  submitFunction: (event) => {
    const nameElement = document.querySelector('.profile__name');
    const jobElement = document.querySelector('.profile__job');
    nameElement.textContent = event.target.profileName.value;
    jobElement.textContent = event.target.profileJob.value;
  }
};
const popupCard = {
  popupName: 'popup-add-card',
  elementButtonOpen: document.querySelector('.profile__add-button'),
  openFunction: (popupElement) => {
    const input1 = popupElement.querySelector('#cardName');
    const input2 = popupElement.querySelector('#cardLink');
    input1.value = '';
    input2.value = '';
  },
  submitFunction: (event) => {
    const card = [  {
      name: event.target.cardName.value,
      link: event.target.cardLink.value,
      alt: 'Новая фотография от пользователя'
    }]
    creatingCards(card);
  }
};

function creatingCards (arg) {
  function creatingCardDom(item) {
    const {name, link, alt} = item;
    const placesElements = document.querySelector('.places__elements');
    function creatingCardElement() {
      const cardTemplateElement = document.querySelector('#template-card').content;
      const cardElement = cardTemplateElement.querySelector('.element').cloneNode(true);
      cardElement.querySelector('.element__img').src = link;
      cardElement.querySelector('.element__img').alt = alt;
      cardElement.querySelector('.element__title').textContent = name;
      return cardElement;
    }
    function openPopup() {
      settingPopupCardView(name, link, alt);
    }
    function deleteElement(event) {
      event.target.parentElement.remove();
    }
    function toggleLike(event) {
      event.target.classList.toggle('element__like_action');
    }

    const cardElement = creatingCardElement();
    const cardImgElement = cardElement.querySelector('.element__img');
    const cardButtonDelete = cardElement.querySelector('.element__delete');
    const cardButtonLike = cardElement.querySelector('.element__like');
    cardImgElement.addEventListener('click', openPopup);
    cardButtonDelete.addEventListener('click', deleteElement);
    cardButtonLike.addEventListener('click', toggleLike);

    placesElements.prepend(cardElement);
  }

  arg.forEach((item)=>{creatingCardDom(item)});
}

function settingPopupCardView (name, link, alt) {
  const cardViewElement = document.querySelector('#popup-card-view');
  const buttonXCardViewElement = cardViewElement.querySelector('.popup__button-x');
  function openPopup() {
    const cardViewElement = document.querySelector('#popup-card-view');
    cardViewElement.querySelector('.element-view__img').src = link;
    cardViewElement.querySelector('.element-view__img').alt = alt;
    cardViewElement.querySelector('.element-view__title').textContent = name;
    toggleCardView();
  }
  buttonXCardViewElement.addEventListener('click', toggleCardView);
  openPopup();
}

function toggleCardView() {
  const cardViewElement = document.querySelector('#popup-card-view');
  cardViewElement.classList.toggle('popup_opened');
}

function settingPopup(arg) {
  const {popupName, elementButtonOpen, openFunction, submitFunction} = arg;
  const popupElement = document.querySelector(`#${popupName}`);
  const buttonXElement = popupElement.querySelector('.popup__button-x');
  const buttonSubmit = popupElement.querySelector('.form');

  function togglePopupForm() {
    popupElement.classList.toggle('popup_opened');
  }

  function openPopup() {
    openFunction(popupElement);
    togglePopupForm();
  }

  function submitPopup(event) {
    event.preventDefault();
    submitFunction(event);
    togglePopupForm();
  }

  elementButtonOpen.addEventListener('click', openPopup);
  buttonXElement.addEventListener('click', togglePopupForm);
  buttonSubmit.addEventListener('submit', submitPopup);
}

creatingCards(initialCards);
settingPopup(popupProfile);
settingPopup(popupCard);
