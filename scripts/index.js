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

buttonOpenPopupCardElement.addEventListener('click', openPopupFormCard);
popupCardFormElement.addEventListener('submit', submitPopupFormCard);

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

buttonOpenPopupProfileElement.addEventListener('click', openPopupFormProfile);
popupProfileFormElement.addEventListener('submit', submitPopupFormProfile);

const popUpCardValidator = new FormValidator(settingsValidate, popupCardElement);
const popUpProfileValidator = new FormValidator(settingsValidate, popupProfileElement);
popUpCardValidator.enableValidation();
popUpProfileValidator.enableValidation();

function renderCard(item) {
  const card = new Card(item, settingsCard, openPopupCardView);
  const parentElement = document.querySelector(`.${card.nameClassInsertForCard}`);
  parentElement.prepend(card.setCardElement());
}

function startInitialCards() {
  initialCards.forEach((item)=>{
    renderCard(item);
  });
}

startInitialCards();

class Section {
  constructor({items, renderer}, containerSelector){
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
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
    this._popupElement.addEventListener('click', this._handleOverlayClose);
    this._buttonXElement.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('click', this._handleOverlayClose);
    this._buttonXElement.removeEventListener('click', this.close);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if ((this._popupElement) && (this._popupElement === event.target)) {
      this.close();
    }
  }
}

class PopupWithImage extends Popup{
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
    super.open();
  }
}

class PopupWithForm extends Popup{
  constructor(popupSelector, function1) {
    super(popupSelector);
    this._function1 = function1;
    this._popupButtonElement = this._popupElement.querySelector('form__button');
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

  _submitPopupForm(event) {
    event.preventDefault();
    this._function1(this._getInputValues());
    /*
    (data) => {
      renderCard ({
        name: data[cardName],
        link: data[cardLink]
      });
    }

    */
    /*
     (data) => {
        const profileNameElement = document.querySelector(`.${settingsPopUpProfile.nameClassProfileName}`);
        const profileJobElement = document.querySelector(`.${settingsPopUpProfile.nameClassProfileJob}`);
        profileNameElement.textContent = data[profileName];
        profileJobElement.textContent = data[profileJob];
     }

    */
    this.close();
  }

  close() {/*при закрытии попапа форма должна ещё и сбрасываться*/
    this._popupButtonElement.toggleAttribute('disabled');
    this._popupButtonElement.classList.toggle(settingsValidate.inactiveButtonClass);
    super.close();

  }

}
