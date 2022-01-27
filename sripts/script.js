const nameProfileElement = document.querySelector('.profile__name');
const jobProfileElement = document.querySelector('.profile__job');
const placesElements = document.querySelector('.places__elements');
const cardViewElement = document.querySelector('#popup-card-view');
const buttonXCardViewElement = cardViewElement.querySelector('.popup__button-x');

const popupProfile = {
  popupName: 'popup-edit-profile',
  elementButtonOpen: document.querySelector('.profile__edit-button'),
  profileName: document.querySelector('#profileName'),
  profileJob: document.querySelector('#profileJob'),
  openFunction: () => {
    this.profileName.value = nameProfileElement.textContent;
    this.profileJob.value = jobProfileElement.textContent;
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
  },
  submitFunction: (event) => {
    const cardElement =  createCard ({
      name: event.target.cardName.value,
      link: event.target.cardLink.value
    });
    renderCard(cardElement);
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
    event.target.parentElement.remove();
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

function renderCard(cardElement) {
  placesElements.prepend(cardElement);
}

function editPopupCardView (name, link, alt) {
  const cardViewImg = cardViewElement.querySelector('.element-view__img');
  const cardViewTitle = cardViewElement.querySelector('.element-view__title');
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
    event.preventDefault();
    arg.submitFunction(event);
    closePopup(popupElement);
  }

  arg.elementButtonOpen.addEventListener('click', openPopupForm);
  buttonXElement.addEventListener('click', closePopupForm);
  buttonSubmit.addEventListener('submit', submitPopupForm);
}

function openPopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

function startInitialCards(){
  initialCards.forEach((item)=>{
    const cardElement = createCard(item);
    renderCard(cardElement);
  });
}

startInitialCards();
setPopupForm(popupProfile);
setPopupForm(popupCard);
setPopupCardView();
