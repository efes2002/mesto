import { Card } from './Card.js';
import { PopUpFormProfile } from './PopUpFormProfile.js';
import { PopUpFormCard } from './PopUpFormCard.js';
import { initialCards, settingsCard, settingsPopUpProfile, settingsPopUpCard } from './constants.js';


const popUpProfile = new PopUpFormProfile(settingsPopUpProfile);
popUpProfile.setPopUp();

const popUpCard = new PopUpFormCard(settingsPopUpCard);
popUpCard.setPopUp();

export function renderCard(item) {
  const card = new Card(item, settingsCard);
  const parentElement = document.querySelector(`.${card.nameClassInsertForCard}`);
  parentElement.prepend(card.setCardElement());
}

function startInitialCards() {
  initialCards.forEach((item)=>{
    renderCard(item);
  });
}

startInitialCards();
