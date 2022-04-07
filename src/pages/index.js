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
  .catch((err) => {console.log(err);})

api.getInitialCards()
  .then((res)=>{
    const tempArr = res.map((item)=>{return item});
    section.renderItems(tempArr);
  })
  .catch((err) => {console.log(err);})

const popupCardElement = document.querySelector(`#${settingsPopUpCard.nameIdPopUp}`);
const popUpCardValidator = new FormValidator(settingsValidate, popupCardElement);

const popupProfileElement = document.querySelector(`#${settingsPopUpProfile.nameIdPopUp}`);
const popUpProfileValidator = new FormValidator(settingsValidate, popupProfileElement);

const popupEditAvatarElement = document.querySelector(`#${settingsPopupEditAvatar.nameIdPopUp}`);
const popUpEditAvatarValidator = new FormValidator(settingsValidate, popupEditAvatarElement);

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
      callbackClose("Создать");
    })
    .catch((err) => {console.log(err);})
}
const popupFormAddCard = new PopupWithForm( `#${settingsPopUpCard.nameIdPopUp}`, callbackSubmitAddCard);
popupFormAddCard.setEventListeners();

const callbackOpenEditProfile = function() {
  const {name, job} = userInfo.getUserInfo();
  const popupProfileNameElement = this._popupElement.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormName}`);
  const popupProfileJobElement = this._popupElement.querySelector(`#${settingsPopUpProfile.nameIdPopUpFormJob}`);
  popupProfileNameElement.value = name;
  popupProfileJobElement.value = job;
}
const callbackSubmitEditProfile = function(data, callbackClose) {
  api.editeProfile({name: data.profileName, about: data.profileJob})
    .then((res)=>{
      userInfo.setUserInfo({name: res.name, job: res.about});
      callbackClose("Сохранить");
    })
    .catch((err) => {console.log(err);})

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
      callbackClose("Сохранить");
    })
    .catch((err) => {console.log(err);})
}
const popupFormEditAvatar = new PopupWithForm( `#${settingsPopupEditAvatar.nameIdPopUp}`, callbackSubmitEditAvatar);
popupFormEditAvatar.setEventListeners();

const buttonOpenPopupCardElement = document.querySelector(`.${settingsPopUpCard.nameClassButtonOpenPopUp}`);
const buttonOpenPopupProfileElement = document.querySelector(`.${settingsPopUpProfile.nameClassButtonOpenPopUp}`);
const buttonOpenPopupEditAvatarElement = document.querySelector(`.${settingsPopupEditAvatar.nameClassButtonOpenPopUp}`);


buttonOpenPopupCardElement.addEventListener('click', ()=>{
  popUpCardValidator.startHideInputError();
  popupFormAddCard.open();
});
buttonOpenPopupProfileElement.addEventListener('click', ()=>{
  popUpProfileValidator.startHideInputError();
  popupFormEditProfile.open();
});
buttonOpenPopupEditAvatarElement.addEventListener('click', ()=>{
  popUpEditAvatarValidator.startHideInputError();
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
          .catch((err) => {console.log(err);})
      })
    },
    (id, updateCard) => {
      api.addLike(id)
        .then((res) => {updateCard(res);})
        .catch((err) => {console.log(err);})
    },
    (id, updateCard) => {
      api.deleteLike(id)
        .then((res) => {updateCard(res);})
        .catch((err) => {console.log(err);})
    },
    userInfo.getIdUser()
  );
  return card.setCardElement();
}

