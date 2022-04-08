import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import {PopupCardDelete} from "../components/PopupCardDelete.js";
import { Api } from '../components/Api.js'
import { settingsCard, settingsPopUpProfile, settingsPopUpCard,
  settingsPopUpCardView, settingsPopupEditAvatar, settingsValidate,
  settingsProfile, settingsPopupCardDelete} from '../scripts/constants.js';
import { optionsApi } from '../scripts/config.js'
import './index.css';

const popupCardElement = document.querySelector(`#${settingsPopUpCard.nameIdPopUp}`);
const popUpCardValidator = new FormValidator(settingsValidate, popupCardElement);

const popupProfileElement = document.querySelector(`#${settingsPopUpProfile.nameIdPopUp}`);
const popUpProfileValidator = new FormValidator(settingsValidate, popupProfileElement);

const popupEditAvatarElement = document.querySelector(`#${settingsPopupEditAvatar.nameIdPopUp}`);
const popUpEditAvatarValidator = new FormValidator(settingsValidate, popupEditAvatarElement);

const buttonOpenPopupCardElement = document.querySelector(`.${settingsPopUpCard.nameClassButtonOpenPopUp}`);
const buttonOpenPopupProfileElement = document.querySelector(`.${settingsPopUpProfile.nameClassButtonOpenPopUp}`);
const buttonOpenPopupEditAvatarElement = document.querySelector(`.${settingsPopupEditAvatar.nameClassButtonOpenPopUp}`);

const api = new Api(optionsApi);
const checkCatch = (err) => {console.log(err);}

Promise.all([api.getProfile(), api.getInitialCards()])
  .then((arr)=>{
    userInfo.setUserInfo({
      name : arr[0].name, job : arr[0].about,
      url: arr[0].avatar, idUser: arr[0]._id
    });
    const tempArr = arr[1].map((item)=>{return item});
    section.renderItems(tempArr);
  })
  .catch(checkCatch)

popUpCardValidator.enableValidation();
popUpProfileValidator.enableValidation();
popUpEditAvatarValidator.enableValidation();

const popupCardDelete = new PopupCardDelete(`#${settingsPopupCardDelete.nameIdPopUp}`)
popupCardDelete.setEventListeners();

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

const callbackSubmitAddCard = function(data, callbackClose) {
  api.addNewCard({name: data.cardName, link: data.cardLink })
    .then((res)=>{
      const cardElement = renderCard(res)
      section.addItem(cardElement);
      callbackClose();
    })
    .catch(checkCatch)
}
const popupFormAddCard = new PopupWithForm( `#${settingsPopUpCard.nameIdPopUp}`, callbackSubmitAddCard);
popupFormAddCard.setEventListeners();

const callbackOpenEditProfile = function() {
  const {name, job} = userInfo.getUserInfo();
  popupFormEditProfile.setInputValues({name, job});
}
const callbackSubmitEditProfile = function(data, callbackClose) {
  api.editProfile({name: data.profileName, about: data.profileJob})
    .then((res)=>{
      userInfo.setUserInfo({
        name: res.name, job: res.about,
        url: res.avatar, idUser: res._id
      });
      callbackClose();
    })
    .catch(checkCatch)
}
const popupFormEditProfile = new PopupWithForm(
  `#${settingsPopUpProfile.nameIdPopUp}`,
  callbackSubmitEditProfile,
  callbackOpenEditProfile);
popupFormEditProfile.setEventListeners();

const callbackSubmitEditAvatar = function(data, callbackClose) {
  api.editAvatar(data.avatarLink)
    .then((res)=>{
      userInfo.setImgAvatar(res.avatar);
      callbackClose();
    })
    .catch(checkCatch)
}
const popupFormEditAvatar = new PopupWithForm( `#${settingsPopupEditAvatar.nameIdPopUp}`, callbackSubmitEditAvatar);
popupFormEditAvatar.setEventListeners();

buttonOpenPopupCardElement.addEventListener('click', ()=>{
  popUpCardValidator.resetValidation();
  popupFormAddCard.open();
});
buttonOpenPopupProfileElement.addEventListener('click', ()=>{
  popUpProfileValidator.resetValidation();
  popupFormEditProfile.open();
});
buttonOpenPopupEditAvatarElement.addEventListener('click', ()=>{
  popUpEditAvatarValidator.resetValidation();
  popupFormEditAvatar.open();
});

function renderCard(item) {
  const card = new Card(
    item,
    settingsCard,
    (name, link, alt) => {popupWithImage.open(name, link, alt)},
    (deleteElement, id) => {
      popupCardDelete.open((callbackClose) => {
        api.deleteCard(id)
          .then(() => {deleteElement(); callbackClose();})
          .catch(checkCatch)
      })
    },
    (id, updateCard) => {
      api.addLike(id)
        .then((res) => {updateCard(res);})
        .catch(checkCatch)
    },    (id, updateCard) => {
      api.deleteLike(id)
        .then((res) => {updateCard(res);})
        .catch(checkCatch)
    },
    userInfo.getIdUser()
  );
  return card.setCardElement();
}

