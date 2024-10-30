// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// DOM узлы
const placesList = document.querySelector('.places__list');
//  Функция создания карточки
function createCard (card) {
    const clonedCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    clonedCard.querySelector('.card__title').textContent = card.name;
    clonedCard.querySelector('.card__image').src = card.link;
    clonedCard.querySelector('.card__delete-button').addEventListener('click', (event) => {
        deleteCard(event)
    });
    return clonedCard;
}
// Функция удаления карточки
function deleteCard (event) {
    const itemToDelete = event.target.parentElement;
    itemToDelete.remove();
}
// Вывести карточки на страницу
initialCards.forEach((item) => {
    const createdCard = createCard(item);
    placesList.append(createdCard);
});