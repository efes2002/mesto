const nameProfileElement = document.querySelector('.profile__name');
const jobProfileElement = document.querySelector('.profile__job');
const placesElements = document.querySelector('.places__elements');
const cardViewElement = document.querySelector('#popup-card-view');
const cardViewImg = cardViewElement.querySelector('.element-view__img');
const cardViewTitle = cardViewElement.querySelector('.element-view__title');
const buttonXCardViewElement = cardViewElement.querySelector('.popup__button-x');

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

function createCard(item) {
  const {name, link, alt = `Фотография ${name}`} = item;
  const cardTemplateElement = document.querySelector('#template-card').content;
  const cardElement = cardTemplateElement.querySelector('.element').cloneNode(true);

  function openPopup() {
    editPopupCardView(name, link, alt);
  }
  function deleteElement(event) {
    event.target.closest('.element').remove();
  }
  function toggleLike(event) {
    event.target.classList.toggle('element__like_action');
  }

  cardElement.querySelector('.element__img').src = link;
  cardElement.querySelector('.element__img').alt = alt;
  cardElement.querySelector('.element__title').textContent = name;

  const cardImgElement = cardElement.querySelector('.element__img');
  const cardButtonDelete = cardElement.querySelector('.element__delete');
  const cardButtonLike = cardElement.querySelector('.element__like');

  cardImgElement.addEventListener('click', openPopup);
  cardButtonDelete.addEventListener('click', deleteElement);
  cardButtonLike.addEventListener('click', toggleLike);

  return cardElement;
}

function renderCard(item, parentElement) {
  const cardElement = createCard(item);
  parentElement.prepend(cardElement);
}

function editPopupCardView (name, link, alt) {
  cardViewImg.src = link;
  cardViewImg.alt = alt;
  cardViewTitle.textContent = name;
  openPopup(cardViewElement);
}

function setPopupCardView() {
  function closePopupCardView() {
    closePopup(cardViewElement)
  }
  buttonXCardViewElement.addEventListener('click', closePopupCardView);
}

function setPopupForm(arg) {
  const popupElement = document.querySelector(`#${arg.popupName}`);
  const buttonXElement = popupElement.querySelector('.popup__button-x');
  const buttonSubmit = popupElement.querySelector('.form');

  function closePopupForm() {
    closePopup(popupElement);
  }
  function openPopupForm() {
    arg.openFunction();
    openPopup(popupElement);
  }
  function submitPopupForm(event) {
    const buttonElement = popupElement.querySelector("button");
    event.preventDefault();
    arg.submitFunction(event);
    closePopup(popupElement);
    toggleButtonAttributeDisabled(buttonElement);
    toggleButtonClassInactive(valueValidate.inactiveButtonClass, buttonElement)
  }

  arg.elementButtonOpen.addEventListener('click', openPopupForm);
  buttonXElement.addEventListener('click', closePopupForm);
  buttonSubmit.addEventListener('submit', submitPopupForm);
}

function openPopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
  popupElement.addEventListener('click', listenerClickOverlayPopupElement);
  document.addEventListener('keydown', listenerKeydownPopupElement);
}

function closePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
  document.removeEventListener('keydown', listenerKeydownPopupElement);
  popupElement.removeEventListener('click', listenerClickOverlayPopupElement);
}

function startInitialCards(){
  initialArds.forEach((item)=>{
    renderCard(item, placesElements);
  });
}

function listenerClickOverlayPopupElement(event) {
  const popupElement = document.querySelector('.popup_opened')
  if ((popupElement)&&(popupElement === event.target)) {
    closePopup(popupElement);
    popupElement.removeEventListener('click', listenerClickOverlayPopupElement);
    document.removeEventListener('keydown', listenerKeydownPopupElement);
  }
}
function listenerKeydownPopupElement(event) {
  if (event.key === "Escape") {
    const popupElement = document.querySelector('.popup_opened')
    closePopup(popupElement);
    document.removeEventListener('keydown', listenerKeydownPopupElement);
    popupElement.removeEventListener('click', listenerClickOverlayPopupElement);
  }
}

startInitialCards();
setPopupForm(popupProfile);
setPopupForm(popupCard);
setPopupCardView();
