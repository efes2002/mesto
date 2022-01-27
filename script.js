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
    popupElement.querySelector('#cardName').value = '';
    popupElement.querySelector('#cardLink').value = '';
  },
  submitFunction: (event) => {
    createCard ({
      name: event.target.cardName.value,
      link: event.target.cardLink.value
    });
  }
};

function createCard(item) {
  const {name, link, alt = `Фотография ${name}`} = item;
  const placesElements = document.querySelector('.places__elements');

  function creatCardElement() {
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

  const cardElement = creatCardElement();
  const cardImgElement = cardElement.querySelector('.element__img');
  const cardButtonDelete = cardElement.querySelector('.element__delete');
  const cardButtonLike = cardElement.querySelector('.element__like');
  cardImgElement.addEventListener('click', openPopup);
  cardButtonDelete.addEventListener('click', deleteElement);
  cardButtonLike.addEventListener('click', toggleLike);

  placesElements.prepend(cardElement);
}

function settingPopupCardView (name, link, alt) {
  const cardViewElement = document.querySelector('#popup-card-view');
  const buttonXCardViewElement = cardViewElement.querySelector('.popup__button-x');
  function openPopup() {
    const cardViewElement = document.querySelector('#popup-card-view');
    cardViewElement.querySelector('.element-view__img').src = link;
    cardViewElement.querySelector('.element-view__img').alt = alt;
    cardViewElement.querySelector('.element-view__title').textContent = name;
    togglePopupCardView();
  }
  buttonXCardViewElement.addEventListener('click', togglePopupCardView);
  openPopup();
}

function togglePopupCardView() {
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

initialCards.forEach((item)=>{createCard(item)});
settingPopup(popupProfile);
settingPopup(popupCard);
