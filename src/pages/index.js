import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import {initialCards, settingsCard,
  settingsPopUpProfile, settingsPopUpCard,
  settingsPopUpCardView,settingsValidate} from '../scripts/constants.js';
import './index.css';

const popupCardElement = document.querySelector(`#${settingsPopUpCard.nameIdPopUp}`);
const popUpCardValidator = new FormValidator(settingsValidate, popupCardElement);

const popupProfileElement = document.querySelector(`#${settingsPopUpProfile.nameIdPopUp}`);
const popUpProfileValidator = new FormValidator(settingsValidate, popupProfileElement);

popUpCardValidator.enableValidation();
popUpProfileValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: `.${settingsPopUpProfile.nameClassProfileName}`,
  jobSelector : `.${settingsPopUpProfile.nameClassProfileJob}`
});

const section = new Section({items: initialCards, renderer: renderCard},'.places__elements');

export const popupWithImage = new PopupWithImage(`#${settingsPopUpCardView.nameIdPopUp}`);
popupWithImage.setEventListeners();

const callbackOpenAddCard = function() {
  this._popupElement.querySelector('form').reset();
}
const callbackSubmitAddCard = function(data) {
  const cardElement = renderCard({name: data.cardName, link: data.cardLink })
  section.addItem(cardElement);
}
const popupFormAddCard = new PopupWithForm(
  `#${settingsPopUpCard.nameIdPopUp}`,
  callbackSubmitAddCard,
  callbackOpenAddCard,
  popUpCardValidator.startHideInputError.bind(popUpCardValidator)
);
popupFormAddCard.setEventListeners();

const callbackOpenEditProfile = function() {
  const {name, job} = userInfo.getUserInfo();
  const popupProfileNameElement = this._popupElement.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormName}`);
  const popupProfileJobElement = this._popupElement.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormJob}`);
  popupProfileNameElement.value = name;
  popupProfileJobElement.value = job;
}

const callbackSubmitEditProfile = function(data) {
  userInfo.setUserInfo({name: data.profileName, job: data.profileJob})
}
const popupFormEditProfile = new PopupWithForm(
  `#${settingsPopUpProfile.nameIdPopUp}`,
  callbackSubmitEditProfile,
  callbackOpenEditProfile,
  popUpCardValidator.startHideInputError.bind(popUpCardValidator)
);
popupFormEditProfile.setEventListeners();

const buttonOpenPopupCardElement = document.querySelector(`.${settingsPopUpCard.nameClassButtonOpenPopUp}`);
const buttonOpenPopupProfileElement = document.querySelector(`.${settingsPopUpProfile.nameClassButtonOpenPopUp}`);

buttonOpenPopupCardElement.addEventListener('click', popupFormAddCard.open.bind(popupFormAddCard));
buttonOpenPopupProfileElement.addEventListener('click', popupFormEditProfile.open.bind(popupFormEditProfile));
/*Замечание - popupFormAddCard.open.bind(popupFormAddCard) При вызове метода у экземпляра класса, сам этот экземпляр класса и будет контекстом. Его не надо еще перепривязывать.*/
/*Ответ - Если я не привязываю то контекс теряеться*/



function renderCard(item) {
  const card = new Card(item, settingsCard, popupWithImage.open.bind(popupWithImage));
  return card.setCardElement();
}

section.renderItems();
