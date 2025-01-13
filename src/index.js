// Импорт главного css файла
import './pages/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';

import * as api from './scripts/api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// DOM узлы
const placesList = document.querySelector('.places__list');
// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__image');
// PopUp
const editPopUp = document.querySelector('.popup_type_edit');
const addNewCardPopUp = document.querySelector('.popup_type_new-card');
const imagePopUp = document.querySelector('.popup_type_image');
const photoDescription = imagePopUp.querySelector('.popup__caption');
const imageURL = imagePopUp.querySelector('.popup__image');
const editAvatarPopUp = document.querySelector('.popup_type_edit-avatar');

// Forms
const formEdit = document.forms['edit-profile'];
const formAddNewCard = document.forms['new-place'];
const formEditAvatar = document.forms['edit-avatar'];
// User fields
const nameBlock = document.querySelector('.profile__title');    
const descriptionBlock = document.querySelector('.profile__description');
const avatar = document.querySelector('img.profile__image');
 
// Инициализация данных юзера
let initialCards = [];
let me = {};
await Promise.all([api.getInitialCards(), api.getMyInfo()]).then((values) => {
    initialCards = values[0];
    me = values[1];
    // Вывести карточки на страницу при инициализации страницы
    initialCards.forEach((item) => {
        const createdCard = createCard(item, deleteCard, cardTemplate, likeCard, onOpenImagePopup, me._id, api.putLike, api.deleteLike, api.deleteCard);
        placesList.append(createdCard);
    });
    nameBlock.textContent = me.name;
    descriptionBlock.textContent = me.about;
    avatar.src = me.avatar;
}).catch((err) => {console.log(err)});

// Обработчики нажатий
profileEditButton.addEventListener('click', (event) => {
    formEdit.name.value = nameBlock.textContent;
    formEdit.description.value = descriptionBlock.textContent;
    openModal(editPopUp);    
});

addCardButton.addEventListener('click', (event) => {
    openModal(addNewCardPopUp);
});

editAvatarButton.addEventListener('click', (event) => {
    openModal(editAvatarPopUp);
});

formEdit.addEventListener('submit', handleEditFormSubmit);
formAddNewCard.addEventListener('submit', handleAddFormSubmit);
formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit)


function renderLoading(element, status) {
    if (status) {
        element.textContent = 'Сохранение...';
    } else {
        element.textContent = 'Сохранить';
    }
}

function handleEditFormSubmit (event) {
    event.preventDefault();
    const button = editPopUp.querySelector('.popup__button');
    renderLoading(button, true);
    api.editProfile({name: formEdit.name.value, about: formEdit.description.value}).then((res)=>{
        nameBlock.textContent = res.name;
        descriptionBlock.textContent = res.about;
        // closeModal(event);
    }).finally(()=>{renderLoading(button, false);});
}

function handleAddFormSubmit (event) {
    event.preventDefault();
    const button = addNewCardPopUp.querySelector('.popup__button');
    renderLoading(button, true);
    const placeName = formAddNewCard['place-name'].value;
    const imageLink = formAddNewCard.link.value;   
    api.createCard({name: placeName, link: imageLink}).then((res) => {
        const createdCard = createCard(res, deleteCard, cardTemplate, likeCard, onOpenImagePopup, me._id, api.putLike, api.deleteLike, api.deleteCard);
        placesList.prepend(createdCard);
    }).finally(()=>{renderLoading(button, false);});
    formAddNewCard.reset();
}

function handleEditAvatarFormSubmit (event) {
    event.preventDefault();
    const button = editAvatarPopUp.querySelector('.popup__button');
    renderLoading(button, true);
    api.editAvatar({avatar: formEditAvatar.link.value}).then((res)=>{
        avatar.src = res.avatar;
        // closeModal(event);
    }).finally(()=>{renderLoading(button, false);});
    formEditAvatar.reset();
}

function onOpenImagePopup (data) {
    imageURL.src = data.link;
    imageURL.alt = data.description;
    photoDescription.textContent = data.description;
    openModal(imagePopUp);
}
