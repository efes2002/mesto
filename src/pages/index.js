import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js'
import {
  settingsCard, settingsPopUpProfile, settingsPopUpCard,
  settingsPopUpCardView, settingsValidate, settingsProfile, settingsPopupCardDelete
} from '../scripts/constants.js';
import { optionsApi } from '../scripts/config.js'
import './index.css';

const api = new Api(optionsApi);

api.getProfile()
  .then((res)=>{
    userInfo.initialProfile({
      name : res.name,
      job : res.about,
      url: res.avatar,
      idUser: res._id
    })
  })

api.getInitialCards()
  .then((res)=>{
    const tempArr = res.map((item)=>{return {
      name: item.name,
      link: item.link,
      likeNumber: item.likes.length,
      idCard: item._id,
      idOwnerCard: item.owner._id
    }});
    section.renderItems(tempArr);
  })


const popupCardElement = document.querySelector(`#${settingsPopUpCard.nameIdPopUp}`);
const popUpCardValidator = new FormValidator(settingsValidate, popupCardElement);

const popupProfileElement = document.querySelector(`#${settingsPopUpProfile.nameIdPopUp}`);
const popUpProfileValidator = new FormValidator(settingsValidate, popupProfileElement);

popUpCardValidator.enableValidation();
popUpProfileValidator.enableValidation();

const popupCardDeleteElement = document.querySelector(`#${settingsPopupCardDelete.nameIdPopUp}`);



const userInfo = new UserInfo({
  nameSelector: `.${settingsPopUpProfile.nameClassProfileName}`,
  jobSelector : `.${settingsPopUpProfile.nameClassProfileJob}`,
  imgAvatar : `.${settingsProfile.nameClassProfileAvatar}`
});

const section = new Section(
  {renderer: (item) => {section.addItem(renderCard(item));}},
  '.places__elements'
);

export const popupWithImage = new PopupWithImage(`#${settingsPopUpCardView.nameIdPopUp}`);
popupWithImage.setEventListeners();

const callbackSubmitAddCard = function(data) {
  api.addNewCard({name: data.cardName, link: data.cardLink }).then((res)=>{
    const cardElement = renderCard({
      name: res.name,
      link: res.link,
      likeNumber: 0,
      idCard: res._id,
      idOwnerCard: res.owner._id
    })
    section.addItem(cardElement);
  })
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
  api.editeProfile({name: data.profileName, about: data.profileJob})
    .then((res)=>{
      userInfo.setUserInfo({name: res.name, job: res.about})
    })

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
  const card = new Card(
    item,
    settingsCard,
    (name, link, alt)=>{popupWithImage.open(name, link, alt)},
    userInfo.getIdUser()
  );
  return card.setCardElement();
}

