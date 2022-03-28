import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import {initialCards, settingsCard,
  settingsPopUpProfile, settingsPopUpCard,
  settingsPopUpCardView,settingsValidate} from '../components/constants.js';
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

export const popupWithImage = new PopupWithImage(`#${settingsPopUpCardView.nameIdPopUp}`);

const callbackOpenAddCard = function() {
  const popupCardNameElement = this._popupElement.querySelector(`#${settingsPopUpCard.nameIdPopUpFormName}`);
  const popupCardLinkElement = this._popupElement.querySelector(`#${settingsPopUpCard.nameIdPopUpFormLink}`);
  popupCardNameElement.value = '';
  popupCardLinkElement.value = '';
  popUpCardValidator.startHideInputError(popupCardNameElement);
  popUpCardValidator.startHideInputError(popupCardLinkElement);
}
const callbackSubmitAddCard = function(data) {
  const items = [{name: data.cardName, link: data.cardLink }];
  const section = new Section({items: items, renderer: renderCard},'.places__elements');
  section.renderItems();
}
const popupFormAddCard = new PopupWithForm(
  `#${settingsPopUpCard.nameIdPopUp}`,
  callbackSubmitAddCard,
  callbackOpenAddCard
);

const callbackOpenEditProfile = function() {
  const {name, job} = userInfo.getUserInfo();
  const popupProfileNameElement = this._popupElement.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormName}`);
  const popupProfileJobElement = this._popupElement.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormJob}`);
  popupProfileNameElement.value = name;
  popupProfileJobElement.value = job;
  popUpProfileValidator.startHideInputError(popupProfileNameElement);
  popUpProfileValidator.startHideInputError(popupProfileJobElement);
}
const callbackSubmitEditProfile = function(data) {
  userInfo.setUserInfo({name: data.profileName, job: data.profileJob})
}
const popupFormEditProfile = new PopupWithForm(
  `#${settingsPopUpProfile.nameIdPopUp}`,
  callbackSubmitEditProfile,
  callbackOpenEditProfile
);

const buttonOpenPopupCardElement = document.querySelector(`.${settingsPopUpCard.nameClassButtonOpenPopUp}`);
const buttonOpenPopupProfileElement = document.querySelector(`.${settingsPopUpProfile.nameClassButtonOpenPopUp}`);
buttonOpenPopupCardElement.addEventListener('click', popupFormAddCard.open.bind(popupFormAddCard));
buttonOpenPopupProfileElement.addEventListener('click', popupFormEditProfile.open.bind(popupFormEditProfile));


function renderCard(item) {
  const card = new Card(item, settingsCard, popupWithImage.open);
  return card.setCardElement();
}

const initialization = new Section({items: initialCards, renderer: renderCard},'.places__elements');
initialization.renderItems();
