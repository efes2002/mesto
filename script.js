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
  namePopup: 'popupProfile',
  titleText: 'Редактировать профиль',
  placeholder1: 'Имя',
  placeholder2: 'Профессия',
  labelText: 'Сохранить',
  elementButtonOpen: document.querySelector('.profile__edit-button'),
  openFunction: (popupElement) => {
    const input1 = popupElement.querySelector('#input1');
    const input2 = popupElement.querySelector('#input2');
    const nameElement = document.querySelector('.profile__name');
    const jobElement = document.querySelector('.profile__job');
    input1.value = nameElement.textContent;
    input2.value = jobElement.textContent;
  },
  submitFunction: (event) => {
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
  openFunction: (popupElement) => {
    const input1 = popupElement.querySelector('#input1');
    const input2 = popupElement.querySelector('#input2');
    input1.value = '';
    input2.value = '';
  },
  submitFunction: (event) => {
    const card = [  {
      name: event.target.input1.value,
      link: event.target.input2.value,
      alt: 'Новая фотография от пользователя'
    }]
    creatingCard(card);
  }
};

function creatingPopup(contentElement, namePopup) {

  function creatingPopupDom() {
    const scriptElement = document.querySelector('script');
    const popupTemplateElement = document.querySelector('#template-popup').content;
    const popupElement = popupTemplateElement.querySelector('.popup').cloneNode(true);
    const popupContainerElement = popupElement.querySelector('.popup__container');
    popupElement.setAttribute('id', namePopup);
    popupContainerElement.prepend(contentElement);
    scriptElement.before(popupElement);
    return popupElement;
  }

  function closeOpenPopup(event) {
    popupElement.classList.toggle('popup_opened');
    // Если это временный попап то удалим его после закрытия (это относиться к карточкам мест)
    if ((event) && ( event.target.parentElement.parentElement.id === 'card-view'))  {
      event.target.parentElement.parentElement.remove();
    }
  }

  const popupElement = creatingPopupDom();
  const buttonX = popupElement.querySelector('.popup__button-x');
  buttonX.addEventListener('click', closeOpenPopup);

  return {popupElement:popupElement, closeOpenPopup};
}

function creatingPopupForm (arg) {
  const { namePopup, titleText,
    placeholder1, placeholder2,
    labelText, elementButtonOpen,
    openFunction, submitFunction} = arg;

  function creatingForm() {
    const formTemplateElement = document.querySelector('#template-form').content;
    const formElement = formTemplateElement.querySelector('.form').cloneNode(true);
    formElement.querySelector('.form__title').textContent = titleText;
    formElement.querySelector('#input1').placeholder = placeholder1;
    formElement.querySelector('#input2').placeholder = placeholder2;
    formElement.querySelector('.form__button').setAttribute('aria-label', labelText);
    formElement.querySelector('.form__button').textContent = labelText;
    return formElement;
  }

  const formElement = creatingForm();
  const {popupElement, closeOpenPopup} = creatingPopup(formElement, namePopup);
  const newFormElement = popupElement.querySelector('.form');

  function openPopup() {
    openFunction(popupElement);
    closeOpenPopup();
  }

  function formSubmit(event) {
    event.preventDefault();
    submitFunction(event);
    closeOpenPopup();
  }

  elementButtonOpen.addEventListener('click', openPopup);
  newFormElement.addEventListener('submit', formSubmit);
}

function creatingPopupCardView (cardElement) {

  function creatingCardViewDom() {
    const link = cardElement.querySelector('.element__img').src;
    const alt = cardElement.querySelector('.element__img').alt;
    const name = cardElement.querySelector('.element__title').textContent;
    const cardViewTemplateElement = document.querySelector('#template-card-view').content;
    const cardViewElement = cardViewTemplateElement.querySelector('.element-view').cloneNode(true);
    cardViewElement.querySelector('.element-view__img').setAttribute('src', link);
    cardViewElement.querySelector('.element-view__img').alt = alt;
    cardViewElement.querySelector('.element-view__title').textContent = name;
    return cardViewElement;
  }

  const cardViewElement = creatingCardViewDom();
  const {popupElement, closeOpenPopup} = creatingPopup(cardViewElement, 'card-view');
  closeOpenPopup();
}

function creatingCard (arg) {

  function creatingCardDom(item) {
    const {name, link, alt} = item;
    const placesElements = document.querySelector('.places__elements');
    const cardTemplateElement = document.querySelector('#template-card').content;
    const cardElement = cardTemplateElement.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__img').src = link;
    cardElement.querySelector('.element__img').alt = alt;
    cardElement.querySelector('.element__title').textContent = name;
    placesElements.prepend(cardElement);

    function openPopup() {
      creatingPopupCardView(cardElement)
    }
    function deleteElement(event) {
      event.target.parentElement.remove();
    }
    function toggleLike(event) {
      event.target.classList.toggle('element__like_action');
    }

    const cardImgElement = cardElement.querySelector('.element__img');
    const cardButtonDelete = cardElement.querySelector('.element__delete');
    const cardButtonLike = cardElement.querySelector('.element__like');

    cardImgElement.addEventListener('click', openPopup);
    cardButtonDelete.addEventListener('click', deleteElement);
    cardButtonLike.addEventListener('click', toggleLike);
  }

  arg.forEach((item)=>{creatingCardDom(item)});
}

creatingPopupForm(popupProfile);
creatingPopupForm(popupCard);
creatingCard(initialCards);

