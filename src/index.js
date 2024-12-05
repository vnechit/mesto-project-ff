// Импорт главного css файла
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// DOM узлы
const placesList = document.querySelector('.places__list');
// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// PopUp
const editPopUp = document.querySelector('.popup_type_edit');
const addNewCardPopUp = document.querySelector('.popup_type_new-card');
// Forms
const formEdit = document.forms['edit-profile'];
const formAddNewCard = document.forms['new-place'];
const nameBlock = document.querySelector('.profile__title');    
const descriptionBlock = document.querySelector('.profile__description');

// Вывести карточки на страницу при инициализации страницы
initialCards.forEach((item) => {
    const createdCard = createCard(item, deleteCard, cardTemplate, likeCard, openModal);
    placesList.append(createdCard);
});

// Обработчики нажатий
profileEditButton.addEventListener('click', (event) => {
    formEdit.name.value = nameBlock.textContent;
    formEdit.description.value = descriptionBlock.textContent;
    openModal(editPopUp);    
});

addCardButton.addEventListener('click', (event) => {
    openModal(addNewCardPopUp);
});

formEdit.addEventListener('submit', handleEditFormSubmit);
formAddNewCard.addEventListener('submit', handleAddFormSubmit);

function handleEditFormSubmit (event) {
    event.preventDefault();
    nameBlock.textContent = formEdit.name.value;
    descriptionBlock.textContent = formEdit.description.value;
    closeModal(event);
}

function handleAddFormSubmit (event) {
    event.preventDefault();
    const placeName = formAddNewCard['place-name'].value;
    const imageLink = formAddNewCard.link.value;    
    const createdCard = createCard({name: placeName, link: imageLink}, deleteCard, cardTemplate, likeCard, openModal);
    placesList.prepend(createdCard);
    formAddNewCard.reset();
    closeModal(event);
}