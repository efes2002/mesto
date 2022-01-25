const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'test'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'test'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'test'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'test'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'test'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'test'
  }
];

const popupProfile = {
  popupName: 'popupProfile',
  titleText: 'Редактировать профиль',
  placeholder1: 'Имя',
  placeholder2: 'Профессия',
  labelText: 'Сохранить',
  elementButtonOpen: document.querySelector('.profile__edit-button'),
  openFunction: function (popupElement) {
    const input1 = popupElement.querySelector('#input1');
    const input2 = popupElement.querySelector('#input2');
    const nameElement = document.querySelector('.profile__name');
    const jobElement = document.querySelector('.profile__job');
    input1.value = nameElement.textContent;
    input2.value = jobElement.textContent;
  },
  submitFunction: function (event) {
    const nameElement = document.querySelector('.profile__name');
    const jobElement = document.querySelector('.profile__job');
    nameElement.textContent = event.target.input1.value;
    jobElement.textContent = event.target.input2.value;
  }
};

const popupCard = {
  namePopup: 'popupCard',
  titleText: 'Новое место',
  placeholder1: 'Название',
  placeholder2: 'Ссылка на картинку',
  labelText: 'Создать',
  elementButtonOpen: document.querySelector('.profile__add-button'),
  openFunction: function (popupElement) {
    const input1 = popupElement.querySelector('#input1');
    const input2 = popupElement.querySelector('#input2');
    input1.value = '';
    input2.value = '';
  },
  submitFunction: function (event) {
    const card = [  {
      name: event.target.input1.value,
      link: event.target.input2.value,
      alt: 'Новая фотография от пользователя'
    }]
    createCard (card);
  }
};

function createPopup (arg) {

  const {popupName, titleText,
    placeholder1, placeholder2,
    labelText, elementButtonOpen,
    openFunction, submitFunction} = arg;

  function create () {
    const scriptElement = document.querySelector('script');
    const popupTemplateElement = document.querySelector('#template-popup').content;
    const popupElement = popupTemplateElement.querySelector('.popup').cloneNode(true);
    popupElement.setAttribute('id', popupName);
    popupElement.querySelector('.popup__title').textContent = titleText;
    popupElement.querySelector('#input1').placeholder = placeholder1;
    popupElement.querySelector('#input2').placeholder = placeholder2;
    popupElement.querySelector('.popup__button').setAttribute('aria-label', labelText);
    popupElement.querySelector('.popup__button').textContent = labelText;
    scriptElement.after(popupElement);
    return popupElement;
  }

  function closeOpenPopup() {
    popupElement.classList.toggle('popup_opened');
  }

  function openPopup() {
    openFunction(popupElement);
    closeOpenPopup();
  }

  function formSubmit(event) {
    event.preventDefault();
    submitFunction(event);
    closeOpenPopup();
  }

  const popupElement = create();
  const buttonX = popupElement.querySelector('.popup__button-x');
  const formElement = popupElement.querySelector('.popup__form');

  elementButtonOpen.addEventListener('click', openPopup);
  buttonX.addEventListener('click', closeOpenPopup);
  formElement.addEventListener('submit', formSubmit);
}

function createCard (arg) {

  function create(item) {
    const {name, link, alt} = item;
    const placesElements = document.querySelector('.places__elements');
    const cardTemplateElement = document.querySelector('#template-card').content;
    const cardElement = cardTemplateElement.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__img').setAttribute('src', link);
    cardElement.querySelector('.element__img').setAttribute('alt', alt);
    cardElement.querySelector('.element__title').textContent = name;
    placesElements.prepend(cardElement);
  }

  arg.forEach((item)=>{create(item)});
}

createPopup(popupProfile);
createPopup(popupCard);
createCard(initialCards);

