import { Card } from './Card.js';
import {initialCards, settingsCard, settingsPopUpProfile, settingsPopUpCard, settingsValidate} from './constants.js';
import {Validator} from "./Validator.js";

function popUp(settings) {


  const popupElement = document.querySelector(`#${settings.nameIdPopUp}`);
  const buttonXElement = popupElement.querySelector(`.${settings.nameClassPopUpButtonX}`);
  const nameClassPopUpOpen = settings.nameClassPopUpOpen;


  function openPopup() {
    popupElement.addEventListener('click', listenerClickOverlayPopupElement);
    document.addEventListener('keydown', listenerKeydownPopupElement);
    buttonXElement.addEventListener('click', listenerPushButtonXElement);
    popupElement.classList.toggle(nameClassPopUpOpen);
  }

  function closePopup() {
    popupElement.classList.toggle(nameClassPopUpOpen);
    document.removeEventListener('keydown', listenerKeydownPopupElement);
    popupElement.removeEventListener('click', listenerClickOverlayPopupElement);
    popupElement.removeEventListener('click', listenerPushButtonXElement);
  }

  function listenerClickOverlayPopupElement (event) {
    if ((popupElement) && (popupElement === event.target)) {
      closePopup(popupElement);
    }
  }

  function listenerKeydownPopupElement (event) {
    if (event.key === "Escape") {
      closePopup(popupElement);
    }
  }

  function listenerPushButtonXElement() {
    closePopup();
  }

}

export class PopUpCardView extends PopUp {

  constructor(settings) {
    super(settings);
    this._elementPopUpPopUpCardView = document.querySelector(`#${settings.nameIdPopUp}`);
    this._elementPopUpImg = this._elementPopUpPopUpCardView.querySelector(`.${settings.nameClassPopUpImg}`);
    this._elementPopUpTitle = this._elementPopUpPopUpCardView.querySelector(`.${settings.nameClassPopUpTitle}`);
  }

  openPopupCardView(elementCard, nameClassCardImg, nameClassCardTitle) {
    const elementCardImg = elementCard.querySelector(`.${nameClassCardImg}`);
    const elementCardText = elementCard.querySelector(`.${nameClassCardTitle}`);
    const name = elementCardText.textContent;
    const link = elementCardImg.src;
    const alt = elementCardImg.alt;
    this._elementPopUpImg.src = link;
    this._elementPopUpImg.alt = alt;
    this._elementPopUpTitle.textContent = name;
    super._openPopup();
  }

}

class PopUpForm extends PopUp {
  constructor(settings) {
    super(settings);
    this._formElement = this._popupElement.querySelector(`.${settings.nameClassPopUpForm}`);
    this._formButtonElement = this._popupElement.querySelector(`.${settings.nameClassPopUpFormButton}`);
    this._buttonOpenElement = document.querySelector(`.${settings.nameClassButtonOpenPopUp}`);
    this._nameClassPopUpFormButtonDisabled = settings.nameClassPopUpFormButtonDisabled;
    this._nameIdPopUpFormInput1 = settings.nameIdPopUpFormInput1;
    this._nameIdPopUpFormInput2 = settings.nameIdPopUpFormInput2;
    this._elementPopUpProfileInput1 = document.querySelector(`#${this._nameIdPopUpFormInput1}`);
    this._elementPopUpprofileInput2 = document.querySelector(`#${this._nameIdPopUpFormInput2}`);
  }

  _submitPopupForm () {
    super._closePopup();
    this._formButtonElement.toggleAttribute(`${this._nameClassPopUpFormButtonDisabled}`);
    this._formButtonElement.classList.toggle(settingsValidate.inactiveButtonClass);
  }

  _openPopUpForm() {
    let firstStart = true;
    let classValidation = {};
    if (firstStart) {
      classValidation = new Validator(settingsValidate, this._formElement);
      classValidation.enableValidation();
      firstStart = false;
    }
    classValidation.startHideInputError(this._elementPopUpProfileInput1);
    classValidation.startHideInputError(this._elementPopUpprofileInput2);
    super._openPopup();
  }
}

class PopUpFormCard extends PopUpForm {
  constructor(settings) {
    super(settings);
  }

  _openPopupForm = () => {
    this._elementPopUpProfileInput1.value = '';
    this._elementPopUpprofileInput2.value = '';
    super._openPopUpForm();
  }

  _submitPopupForm = (event) => {
    event.preventDefault();
    renderCard ({
      name: event.target[this._nameIdPopUpFormInput1].value,
      link: event.target[this._nameIdPopUpFormInput2].value
    });
    super._submitPopupForm();
  }

  setPopUp() {
    this._buttonOpenElement.addEventListener('click', this._openPopupForm);
    this._formElement.addEventListener('submit', this._submitPopupForm);
  }
}

class PopUpFormProfile extends PopUpForm {
  constructor(settings) {
    super(settings);
    this._elementProfileInput1 = document.querySelector(`.${settings.nameClassProfileInput1}`);
    this._elementProfileInput2 = document.querySelector(`.${settings.nameClassProfileInput2}`);
  }

  _openPopupForm = () => {
    this._elementPopUpProfileInput1.value = this._elementProfileInput1.textContent;
    this._elementPopUpprofileInput2.value = this._elementProfileInput2.textContent;
    super._openPopUpForm();
  }

  _submitPopupForm = (event) => {
    event.preventDefault();
    this._elementProfileInput1.textContent = event.target[this._nameIdPopUpFormInput1].value;
    this._elementProfileInput2.textContent = event.target[this._nameIdPopUpFormInput2].value;
    super._submitPopupForm();
  }

  setPopUp() {
    this._buttonOpenElement.addEventListener('click', this._openPopupForm);
    this._formElement.addEventListener('submit', this._submitPopupForm);
  }
}


const popUpProfile = new PopUpFormProfile(settingsPopUpProfile);
popUpProfile.setPopUp();

const popUpCard = new PopUpFormCard(settingsPopUpCard);
popUpCard.setPopUp();

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
