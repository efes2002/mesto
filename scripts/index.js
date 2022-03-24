import { Card } from './Card.js';
import {initialCards, settingsCard,
  settingsPopUpProfile, settingsPopUpCard,
  settingsPopUpCardView,settingsValidate} from './constants.js';
import {FormValidator} from "./FormValidator.js";

const profileNameElement = document.querySelector(`.${settingsPopUpProfile.nameClassProfileName}`);
const profileJobElement = document.querySelector(`.${settingsPopUpProfile.nameClassProfileJob}`);

const popupCardViewElement = document.querySelector(`#${settingsPopUpCardView.nameIdPopUp}`);
const popupCardViewImgElement = popupCardViewElement.querySelector(`.${settingsPopUpCardView.nameClassPopUpImg}`);
const popupCardViewTitleElement = popupCardViewElement.querySelector(`.${settingsPopUpCardView.nameClassPopUpTitle}`);

const popupCardElement = document.querySelector(`#${settingsPopUpCard.nameIdPopUp}`);
const popupCardFormElement = popupCardElement.querySelector(`.${settingsPopUpCard.nameClassPopUpForm}`);
const popupCardNameElement = popupCardFormElement.querySelector(`#${settingsPopUpCard.nameIdPopUpFormName}`);
const popupCardLinkElement = popupCardFormElement.querySelector(`#${settingsPopUpCard.nameIdPopUpFormLink}`);
const popupCardButtonElement = popupCardElement.querySelector(`.${settingsPopUpCard.nameClassPopUpFormButton}`);
const buttonOpenPopupCardElement = document.querySelector(`.${settingsPopUpCard.nameClassButtonOpenPopUp}`);

const popupProfileElement = document.querySelector(`#${settingsPopUpProfile.nameIdPopUp}`);
const popupProfileFormElement = popupProfileElement.querySelector(`.${settingsPopUpProfile.nameClassPopUpForm}`);
const popupProfileNameElement = popupProfileFormElement.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormName}`);
const popupProfileJobElement = popupProfileFormElement.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormJob}`);
const popupProfileButtonElement = popupProfileElement.querySelector(`.${settingsPopUpProfile.nameClassPopUpFormButton}`);
const buttonOpenPopupProfileElement = document.querySelector(`.${settingsPopUpProfile.nameClassButtonOpenPopUp}`);
/*
function openPopup(popupElement) {
  const buttonXElement = popupElement.querySelector('.popup__button-x');
  popupElement.addEventListener('click', listenerClickOverlayPopupElement);
  document.addEventListener('keydown', listenerKeydownPopupElement);
  buttonXElement.addEventListener('click', listenerPushButtonXElement);
  popupElement.classList.toggle('popup_opened');
}

function closePopup(popupElement) {
  const buttonXElement = popupElement.querySelector('.popup__button-x');
  popupElement.classList.toggle('popup_opened');
  document.removeEventListener('keydown', listenerKeydownPopupElement);
  popupElement.removeEventListener('click', listenerClickOverlayPopupElement);
  buttonXElement.removeEventListener('click', listenerPushButtonXElement);
}

function listenerClickOverlayPopupElement(event) {
  const popupElement = document.querySelector('.popup_opened');
  if ((popupElement) && (popupElement === event.target)) {
    closePopup(popupElement);
  }
}

function listenerKeydownPopupElement(event) {
  const popupElement = document.querySelector('.popup_opened');
  if (event.key === "Escape") {
    closePopup(popupElement);
  }
}

function listenerPushButtonXElement() {
  const popupElement = document.querySelector('.popup_opened');
  closePopup(popupElement);
}

function openPopupCardView() {
  const name = this._elementCardText.textContent;
  const link = this._elementCardImg.src;
  const alt = this._elementCardImg.alt;
  popupCardViewImgElement.src = link;
  popupCardViewImgElement.alt = alt;
  popupCardViewTitleElement.textContent = name;
  openPopup(popupCardViewElement);
}

function submitPopupForm(popupElement, formButtonElement, nameClassPopUpFormButtonDisabled) {
  closePopup(popupElement);
  formButtonElement.toggleAttribute(`${nameClassPopUpFormButtonDisabled}`);
  formButtonElement.classList.toggle(settingsValidate.inactiveButtonClass);
}

function submitPopupFormCard(event) {
  event.preventDefault();
  renderCard ({
    name: event.target[settingsPopUpCard.nameIdPopUpFormName].value,
    link: event.target[settingsPopUpCard.nameIdPopUpFormLink].value
  });
  submitPopupForm(popupCardElement, popupCardButtonElement, settingsPopUpCard.nameClassPopUpFormButtonDisabled);
}

function openPopupFormCard() {
  popupCardNameElement.value = '';
  popupCardLinkElement.value = '';
  popUpCardValidator.startHideInputError(popupCardNameElement);
  popUpCardValidator.startHideInputError(popupCardLinkElement);
  openPopup(popupCardElement);
}


//popupCardFormElement.addEventListener('submit', submitPopupFormCard);

function submitPopupFormProfile(event) {
  event.preventDefault();
  profileNameElement.textContent = event.target[settingsPopUpProfile.nameIdPopUpFormName].value;
  profileJobElement.textContent = event.target[settingsPopUpProfile.nameIdPopUpFormJob].value;
  submitPopupForm(popupProfileElement, popupProfileButtonElement, settingsPopUpProfile.nameClassPopUpFormButtonDisabled);
}

function openPopupFormProfile() {
  popupProfileNameElement.value = profileNameElement.textContent;
  popupProfileJobElement.value = profileJobElement.textContent;
  popUpProfileValidator.startHideInputError(popupProfileNameElement);
  popUpProfileValidator.startHideInputError(popupProfileJobElement);
  openPopup(popupProfileElement);
}


//popupProfileFormElement.addEventListener('submit', submitPopupFormProfile);
*/




class Section {
  constructor({items, renderer}, containerSelector){
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {

    this._initialArray.forEach(item => {
      this.addItem(this._renderer(item))
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._buttonXElement = this._popupElement.querySelector('.popup__button-x');
    this._handleClickXBind = this._handleClickX.bind(this);
    this._handleOverlayCloseBind = this._handleOverlayClose.bind(this);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popupElement.classList.toggle('popup_opened');
  }

  close() {
    this._popupElement.classList.toggle('popup_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    this._buttonXElement.addEventListener('click', this._handleClickXBind);
    this._popupElement.addEventListener('click', this._handleOverlayCloseBind);
    document.addEventListener('keydown', this._handleEscCloseBind);
  }

  _removeEventListeners() {
    this._buttonXElement.removeEventListener('click', this._handleClickXBind);
    this._popupElement.removeEventListener('click', this._handleOverlayCloseBind);
    document.removeEventListener('keydown', this._handleEscCloseBind);

  }
  _handleClickX() {
    this.close();
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this._handleClickX();
    }
  }

  _handleOverlayClose(event) {
    if ((this._popupElement) && (this._popupElement === event.target)) {
      this._handleClickX();
    }
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    const name = this._elementCardText.textContent;
    const link = this._elementCardImg.src;
    const alt = this._elementCardImg.alt;
    popupCardViewImgElement.src = link;
    popupCardViewImgElement.alt = alt;
    popupCardViewTitleElement.textContent = name;
    super.open.bind(popupWithImage)();
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit, callbackOpen) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._callbackOpen = callbackOpen;
    this._popupButtonElement = this._popupElement.querySelector('.form__button');
  }

  _getInputValues() {/*Содержит приватный метод _getInputValues, который собирает данные всех полей формы.*/
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() { /*добавлять обработчик сабмита формы*/
    this._popupElement.addEventListener('submit', this._submitPopupForm);
    super.setEventListeners();
  }

  _submitPopupForm(event) { /* fdfdfdfdfdf*/
    event.preventDefault();
    console.log(this._getInputValues)
    this._callbackSubmit(this._getInputValues());
    this.close();
  }

  open() {
    this._callbackOpen();
    this.setEventListeners();
    super.open();
  }

  close() {/*при закрытии попапа форма должна ещё и сбрасываться*/
    this._popupButtonElement.toggleAttribute('disabled');
    this._popupButtonElement.classList.toggle(settingsValidate.inactiveButtonClass);
    super.close();
  }

}

class UserInfo{
  constructor({nameSelector, jobSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const name = this._nameElement.textContent;
    const job = this._jobElement.textContent;
    return {name: name, job: job}
  }

  setUserInfo({name, job}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}


const popUpCardValidator = new FormValidator(settingsValidate, popupCardElement);
const popUpProfileValidator = new FormValidator(settingsValidate, popupProfileElement);
popUpCardValidator.enableValidation();
popUpProfileValidator.enableValidation();

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector : '.profile__job'});

const popupWithImage = new PopupWithImage('#popup-card-view');


const callbackOpenAddCard = function() {
  const popupCardNameElement = this._popupElement.querySelector('#cardName');
  const popupCardLinkElement = this._popupElement.querySelector('#cardLink');
  popupCardNameElement.value = '';
  popupCardLinkElement.value = '';
  popUpCardValidator.startHideInputError(popupCardNameElement);
  popUpCardValidator.startHideInputError(popupCardLinkElement);
}
const callbackSubmitAddCard = function(data) {
  const items = [{name: data[cardName], link: data[cardLink] }];
  const section = new Section({items, renderCard},'.places__elements');
  section.renderItems();
}
const popupFormAddCard = new PopupWithForm('#popup-add-card', callbackSubmitAddCard, callbackOpenAddCard);


const callbackOpenEditProfile = function() {
  const {name, job} = userInfo.getUserInfo();
  const popupProfileNameElement = this._popupElement.querySelector(`#profileName`);
  const popupProfileJobElement = this._popupElement.querySelector(`#profileJob`);
  popupProfileNameElement.value = name;
  popupProfileJobElement.value = job;
  popUpProfileValidator.startHideInputError(popupProfileNameElement);
  popUpProfileValidator.startHideInputError(popupProfileJobElement);
}
const callbackSubmitEditProfile = function(data) {
  userInfo.setUserInfo({name: data.profileName, job: data.profileJob})
}
const popupFormEditProfile = new PopupWithForm('#popup-edit-profile', callbackSubmitEditProfile, callbackOpenEditProfile);


buttonOpenPopupCardElement.addEventListener('click', popupFormAddCard.open.bind(popupFormAddCard));
buttonOpenPopupProfileElement.addEventListener('click', popupFormEditProfile.open.bind(popupFormEditProfile));


function renderCard(item) {
  const card = new Card(item, settingsCard, popupWithImage.open);
  return card.setCardElement();
}

const section3 = new Section({items: initialCards, renderer: renderCard},'.places__elements');
section3.renderItems();
