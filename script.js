let formElement = document.querySelector('.popup__form');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonX = document.querySelector('.popup__button-x');
let popupElement = document.querySelector('.popup');
let nameElement = document.querySelector('.profile__name');
let jobElement = document.querySelector('.profile__job');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameElement.textContent = evt.target.name.value;
  jobElement.textContent = evt.target.job.value;
  togglePopUp();
}

function togglePopUp() {
  popupElement.classList.toggle('popup_opened');
}

function openPopUp() {
  nameInput.setAttribute('value', nameElement.textContent);
  jobInput.setAttribute('value', jobElement.textContent);
  togglePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', openPopUp);
buttonX.addEventListener('click', togglePopUp);

