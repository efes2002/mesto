let formElement = document.querySelector('.popup__form');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonX = document.querySelector('.popup__button-x');

let nameElement = document.querySelector('.profile__name');
let jobElement = document.querySelector('.profile__job');

let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');

// При запуске страницы устанавливаем плейсхолдеры для формы отправки
nameInput.setAttribute('placeholder', nameElement.textContent);
jobInput.setAttribute('placeholder', jobElement.textContent);

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;

  if ((typeof newName === 'string') && (newName.length > 0)) {
    nameElement.textContent = newName;
    nameInput.setAttribute('placeholder', newName);
  }
  if ((typeof newJob === 'string') && (newJob.length > 0)) {
    jobElement.textContent = newJob;
    jobInput.setAttribute('placeholder', newJob);
  }

  togglePopUp();
}

function togglePopUp() {
  document.querySelector('.popup').classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', togglePopUp);
buttonX.addEventListener('click', togglePopUp);

