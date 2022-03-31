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

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(renderCard(item));
    }
  },
  '.places__elements'
);

export const popupWithImage = new PopupWithImage(`#${settingsPopUpCardView.nameIdPopUp}`);
popupWithImage.setEventListeners();

const callbackSubmitAddCard = function(data) {
  const cardElement = renderCard({name: data.cardName, link: data.cardLink })
  section.addItem(cardElement);
}
const popupFormAddCard = new PopupWithForm( `#${settingsPopUpCard.nameIdPopUp}`,callbackSubmitAddCard);
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
  callbackOpenEditProfile);
popupFormEditProfile.setEventListeners();

const buttonOpenPopupCardElement = document.querySelector(`.${settingsPopUpCard.nameClassButtonOpenPopUp}`);
const buttonOpenPopupProfileElement = document.querySelector(`.${settingsPopUpProfile.nameClassButtonOpenPopUp}`);

buttonOpenPopupCardElement.addEventListener('click', ()=>{
  popUpCardValidator.startHideInputError();
  popupFormAddCard.open();
});
buttonOpenPopupProfileElement.addEventListener('click', ()=>{
  popUpProfileValidator.startHideInputError();
  popupFormEditProfile.open();
});

function renderCard(item) {
  const card = new Card(item, settingsCard, (name, link, alt)=>{popupWithImage.open(name, link, alt)});
  return card.setCardElement();
}

section.renderItems();
