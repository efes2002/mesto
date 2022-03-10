export const settingsValidate = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const settingsCard = {
  nameIdTemplateCard: 'template-card',
  nameClassCardElement: 'element',
  nameClassCardImg: 'element__img',
  nameClassCardTitle: 'element__title',
  nameClassCardButtonLike: 'element__like',
  nameClassCardButtonDelete: 'element__delete',
  nameClassCardButtonLikeAction: 'element__like_action',
  nameClassInsertForCard: 'places__elements'
};
export const settingsPopUpProfile = {
  nameIdPopUp: 'popup-edit-profile',
  nameClassPopUpOpen: 'popup_opened',
  nameClassPopUpButtonX: 'popup__button-x',
  nameClassPopUpForm: 'form',
  nameClassPopUpFormButton: 'form__button',
  nameClassPopUpFormButtonDisabled: 'disabled',
  nameIdPopUpFormName: 'profileName',
  nameIdPopUpFormJob: 'profileJob',
  nameClassProfileName: 'profile__name',
  nameClassProfileJob: 'profile__job',
  nameClassButtonOpenPopUp:'profile__edit-button',
};
export const settingsPopUpCard = {
  nameIdPopUp: 'popup-add-card',
  nameClassPopUpOpen: 'popup_opened',
  nameClassPopUpButtonX: 'popup__button-x',
  nameClassPopUpForm: 'form',
  nameClassPopUpFormButton: 'form__button',
  nameClassPopUpFormButtonDisabled: 'disabled',
  nameIdPopUpFormName: 'cardName',
  nameIdPopUpFormLink: 'cardLink',
  nameClassButtonOpenPopUp:'profile__add-button',
};
export const settingsPopUpCardView = {
  nameIdPopUp: 'popup-card-view',
  nameClassPopUpOpen: 'popup_opened',
  nameClassPopUpButtonX: 'popup__button-x',
  nameClassPopUpImg: 'element-view__img',
  nameClassPopUpTitle: 'element-view__title'
};
