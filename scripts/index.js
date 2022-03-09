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

export function openPopupCardView(elementCard, nameClassCardImg, nameClassCardTitle) {
  const settings = settingsPopUpCardView;
  const elementPopUpPopUpCardView = document.querySelector(`#${settings.nameIdPopUp}`);
  const elementPopUpImg = elementPopUpPopUpCardView.querySelector(`.${settings.nameClassPopUpImg}`);
  const elementPopUpTitle = elementPopUpPopUpCardView.querySelector(`.${settings.nameClassPopUpTitle}`);
  const elementCardImg = elementCard.querySelector(`.${nameClassCardImg}`);
  const elementCardText = elementCard.querySelector(`.${nameClassCardTitle}`);
  const name = elementCardText.textContent;
  const link = elementCardImg.src;
  const alt = elementCardImg.alt;

  elementPopUpImg.src = link;
  elementPopUpImg.alt = alt;
  elementPopUpTitle.textContent = name;
  openPopup(elementPopUpPopUpCardView);
}

function submitPopupForm(settings) {
  const popupElement = document.querySelector(`#${settings.nameIdPopUp}`);
  const formButtonElement = popupElement.querySelector(`.${settings.nameClassPopUpFormButton}`);
  const nameClassPopUpFormButtonDisabled = settings.nameClassPopUpFormButtonDisabled;
  closePopup(popupElement);
  formButtonElement.toggleAttribute(`${nameClassPopUpFormButtonDisabled}`);
  formButtonElement.classList.toggle(settingsValidate.inactiveButtonClass);
}

function setPopupCard(settings) {
  const popupElement = document.querySelector(`#${settings.nameIdPopUp}`);
  const buttonOpenElement = document.querySelector(`.${settings.nameClassButtonOpenPopUp}`);
  const formElement = popupElement.querySelector(`.${settings.nameClassPopUpForm}`);

  function submitPopupFormCard(event) {
    const nameIdPopUpFormInput1 = settings.nameIdPopUpFormInput1;
    const nameIdPopUpFormInput2 = settings.nameIdPopUpFormInput2;
    event.preventDefault();
    renderCard ({
      name: event.target[nameIdPopUpFormInput1].value,
      link: event.target[nameIdPopUpFormInput2].value
    });
    submitPopupForm(settings);
  }

  function openPopupFormCard() {
    const elementPopUpProfileInput1 = document.querySelector(`#${settings.nameIdPopUpFormInput1}`);
    const elementPopUpprofileInput2 = document.querySelector(`#${settings.nameIdPopUpFormInput2}`);
    elementPopUpProfileInput1.value = '';
    elementPopUpprofileInput2.value = '';
    popUpCardValidator.startHideInputError(elementPopUpProfileInput1);
    popUpCardValidator.startHideInputError(elementPopUpprofileInput2);
    openPopup(popupElement);
  }

  buttonOpenElement.addEventListener('click', openPopupFormCard);
  formElement.addEventListener('submit', submitPopupFormCard);
}

function setPopupProfile(settings) {
  const popupElement = document.querySelector(`#${settings.nameIdPopUp}`);
  const buttonOpenElement = document.querySelector(`.${settings.nameClassButtonOpenPopUp}`);
  const formElement = popupElement.querySelector(`.${settings.nameClassPopUpForm}`);

  function submitPopupFormProfile(event) {
    const elementProfileInput1 = document.querySelector(`.${settings.nameClassProfileInput1}`);
    const elementProfileInput2 = document.querySelector(`.${settings.nameClassProfileInput2}`);
    event.preventDefault();
    elementProfileInput1.textContent = event.target[settings.nameIdPopUpFormInput1].value;
    elementProfileInput2.textContent = event.target[settings.nameIdPopUpFormInput2].value;
    submitPopupForm(settings);
  }

  function openPopupFormProfile() {
    const elementPopUpProfileInput1 = document.querySelector(`#${settings.nameIdPopUpFormInput1}`);
    const elementPopUpprofileInput2 = document.querySelector(`#${settings.nameIdPopUpFormInput2}`);
    const elementProfileInput1 = document.querySelector(`.${settings.nameClassProfileInput1}`);
    const elementProfileInput2 = document.querySelector(`.${settings.nameClassProfileInput2}`);
    elementPopUpProfileInput1.value = elementProfileInput1.textContent;
    elementPopUpprofileInput2.value = elementProfileInput2.textContent;
    popUpProfileValidator.startHideInputError(elementPopUpProfileInput1);
    popUpProfileValidator.startHideInputError(elementPopUpprofileInput2);
    openPopup(popupElement);
  }

  buttonOpenElement.addEventListener('click', openPopupFormProfile);
  formElement.addEventListener('submit', submitPopupFormProfile);
}

setPopupCard(settingsPopUpCard);
setPopupProfile(settingsPopUpProfile);

const popUpCardFormElement = document.querySelector(`#${settingsPopUpCard.nameIdPopUp}`);
const popUpProfileFormElement = document.querySelector(`#${settingsPopUpProfile.nameIdPopUp}`);
const popUpCardValidator = new FormValidator(settingsValidate, popUpCardFormElement);
const popUpProfileValidator = new FormValidator(settingsValidate, popUpProfileFormElement);
popUpCardValidator.enableValidation();
popUpProfileValidator.enableValidation();

function renderCard(item) {
  const card = new Card(item, settingsCard);
  const parentElement = document.querySelector(`.${card.nameClassInsertForCard}`);
  parentElement.prepend(card.setCardElement());
}

function startInitialCards() {
  initialCards.forEach((item)=>{
    renderCard(item);
  });
}

startInitialCards();
