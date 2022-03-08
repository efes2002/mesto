export class PopUp {

  constructor(settings) {
    this._popupElement = document.querySelector(`#${settings.nameIdPopUp}`);
    this._buttonXElement = this._popupElement.querySelector(`.${settings.nameClassPopUpButtonX}`);
    this._nameClassPopUpOpen = settings.nameClassPopUpOpen;
  }

  _openPopup() {
    this._popupElement.addEventListener('click', this._listenerClickOverlayPopupElement);
    document.addEventListener('keydown', this._listenerKeydownPopupElement);
    this._buttonXElement.addEventListener('click', this._listenerPushButtonXElement);
    this._popupElement.classList.toggle(this._nameClassPopUpOpen);
  }

  _closePopup() {
    this._popupElement.classList.toggle(this._nameClassPopUpOpen);
    document.removeEventListener('keydown', this._listenerKeydownPopupElement);
    this._popupElement.removeEventListener('click', this._listenerClickOverlayPopupElement);
    this._popupElement.removeEventListener('click', this._listenerPushButtonXElement);
  }

  _listenerClickOverlayPopupElement = (event) => {
    if ((this._popupElement) && (this._popupElement === event.target)) {
      this._closePopup(this._popupElement);
    }
  }

  _listenerKeydownPopupElement = (event) => {
    if (event.key === "Escape") {
      this._closePopup(this._popupElement);
    }
  }

  _listenerPushButtonXElement = ()=> {
    this._closePopup();
  }

}
