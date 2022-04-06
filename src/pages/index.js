import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import {PopupCardDelete} from "../components/PopupCardDelete.js";
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
    const tempArr = res.map((item)=>{return item});
    section.renderItems(tempArr);
  })


const popupCardElement = document.querySelector(`#${settingsPopUpCard.nameIdPopUp}`);
const popUpCardValidator = new FormValidator(settingsValidate, popupCardElement);

const popupProfileElement = document.querySelector(`#${settingsPopUpProfile.nameIdPopUp}`);
const popUpProfileValidator = new FormValidator(settingsValidate, popupProfileElement);

popUpCardValidator.enableValidation();
popUpProfileValidator.enableValidation();

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

const callbackSubmitAddCard = function(data) {
  api.addNewCard({name: data.cardName, link: data.cardLink }).then((res)=>{
    const cardElement = renderCard(res)
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
    (name, link, alt) => {popupWithImage.open(name, link, alt)},
    (deleteElement, id) => {
      popupCardDelete.open(()=>{
        api.deleteCard(id)
          .then(()=>{deleteElement()})
      })
    },
    (id, updateCard)=>{
      api.addLike(id)
        .then((res)=> {
          updateCard(res);
        })
    },
    (id, updateCard)=>{
      api.deleteLike(id)
        .then((res)=> {
          updateCard(res);
        })
    },
    userInfo.getIdUser()
  );
  return card.setCardElement();
}

