import { Card } from './Card.js';
import {initialCards, settingsCard,
  settingsPopUpProfile, settingsPopUpCard,
  settingsPopUpCardView,settingsValidate} from './constants.js';
import {FormValidator} from "./FormValidator.js";

function openPopup(popupElement) {
  const buttonXElement = popupElement.querySelector('.popup__button-x');
  popupElement.addEventListener('click', listenerClickOverlayPopupElement);
  document.addEventListener('keydown', listenerKeydownPopupElement);
  buttonXElement.addEventListener('click', listenerPushButtonXElement);
  popupElement.classList.toggle('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
  document.removeEventListener('keydown', listenerKeydownPopupElement);
  popupElement.removeEventListener('click', listenerClickOverlayPopupElement);
  popupElement.removeEventListener('click', listenerPushButtonXElement);
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
  const elementPopUpPopUpCardView = document.querySelector(`#${settingsPopUpCardView.nameIdPopUp}`);
  const elementPopUpImg = elementPopUpPopUpCardView.querySelector(`.${settingsPopUpCardView.nameClassPopUpImg}`);
  const elementPopUpTitle = elementPopUpPopUpCardView.querySelector(`.${settingsPopUpCardView.nameClassPopUpTitle}`);
  const name = this._elementCardText.textContent;
  const link = this._elementCardImg.src;
  const alt = this._elementCardImg.alt;

  elementPopUpImg.src = link;
  elementPopUpImg.alt = alt;
  elementPopUpTitle.textContent = name;
  openPopup(elementPopUpPopUpCardView);
}

function submitPopupForm(popupElement, formButtonElement, nameClassPopUpFormButtonDisabled) {
  closePopup(popupElement);
  formButtonElement.toggleAttribute(`${nameClassPopUpFormButtonDisabled}`);
  formButtonElement.classList.toggle(settingsValidate.inactiveButtonClass);
}

/* Настройка PopupFormCard элемента */

const popupCardElement = document.querySelector(`#${settingsPopUpCard.nameIdPopUp}`);
const popupCardButtonElement = popupCardElement.querySelector(`.${settingsPopUpCard.nameClassPopUpFormButton}`);
const buttonOpenPopupCardElement = document.querySelector(`.${settingsPopUpCard.nameClassButtonOpenPopUp}`);
const popupCardFormElement = popupCardElement.querySelector(`.${settingsPopUpCard.nameClassPopUpForm}`);

function submitPopupFormCard(event) {
  const nameIdPopUpFormName = settingsPopUpCard.nameIdPopUpFormName;
  const nameIdPopUpFormLink = settingsPopUpCard.nameIdPopUpFormLink;
  event.preventDefault();
  renderCard ({
    name: event.target[nameIdPopUpFormName].value,
    link: event.target[nameIdPopUpFormLink].value
  });
  submitPopupForm(popupCardElement, popupCardButtonElement, settingsPopUpCard.nameClassPopUpFormButtonDisabled);
}

function openPopupFormCard() {
  const elementPopUpProfileName = document.querySelector(`#${settingsPopUpCard.nameIdPopUpFormName}`);
  const elementPopUpprofileLink = document.querySelector(`#${settingsPopUpCard.nameIdPopUpFormLink}`);
  elementPopUpProfileName.value = '';
  elementPopUpprofileLink.value = '';
  popUpCardValidator.startHideInputError(elementPopUpProfileName);
  popUpCardValidator.startHideInputError(elementPopUpprofileLink);
  openPopup(popupCardElement);
}

buttonOpenPopupCardElement.addEventListener('click', openPopupFormCard);
popupCardFormElement.addEventListener('submit', submitPopupFormCard);

/* Настройка PopupFormProfile элемента */

const popupProfileElement = document.querySelector(`#${settingsPopUpProfile.nameIdPopUp}`);
const popupProfileButtonElement = popupProfileElement.querySelector(`.${settingsPopUpProfile.nameClassPopUpFormButton}`);
const buttonOpenPopupProfileElement = document.querySelector(`.${settingsPopUpProfile.nameClassButtonOpenPopUp}`);
const popupProfileFormElement = popupProfileElement.querySelector(`.${settingsPopUpProfile.nameClassPopUpForm}`);

function submitPopupFormProfile(event) {
  const elementProfileName = document.querySelector(`.${settingsPopUpProfile.nameClassProfileName}`);
  const elementProfileJob = document.querySelector(`.${settingsPopUpProfile.nameClassProfileJob}`);
  event.preventDefault();
  elementProfileName.textContent = event.target[settingsPopUpProfile.nameIdPopUpFormName].value;
  elementProfileJob.textContent = event.target[settingsPopUpProfile.nameIdPopUpFormJob].value;
  submitPopupForm(popupProfileElement, popupProfileButtonElement, settingsPopUpProfile.nameClassPopUpFormButtonDisabled);
}

function openPopupFormProfile() {
  const elementPopUpProfileName = document.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormName}`);
  const elementPopUpprofileJob = document.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormJob}`);
  const elementProfileName = document.querySelector(`.${settingsPopUpProfile.nameClassProfileName}`);
  const elementProfileJob = document.querySelector(`.${settingsPopUpProfile.nameClassProfileJob}`);
  elementPopUpProfileName.value = elementProfileName.textContent;
  elementPopUpprofileJob.value = elementProfileJob.textContent;
  popUpProfileValidator.startHideInputError(elementPopUpProfileName);
  popUpProfileValidator.startHideInputError(elementPopUpprofileJob);
  //popupProfileFormElement.toggleAttribute(`${settingsPopUpProfile.nameClassPopUpFormButtonDisabled}`);
  openPopup(popupProfileElement);
}

buttonOpenPopupProfileElement.addEventListener('click', openPopupFormProfile);
popupProfileFormElement.addEventListener('submit', submitPopupFormProfile);

/* Настройка Валидации PopupForm */

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
