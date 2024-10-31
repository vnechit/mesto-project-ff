// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// DOM узлы
const placesList = document.querySelector('.places__list');
//  Функция создания карточки
function createCard (card, deleteCardFunc) {
    const clonedCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    clonedCard.querySelector('.card__title').textContent = card.name;
    const image = clonedCard.querySelector('.card__image');
    image.src = card.link;
    image.alt = card.name;
    clonedCard.querySelector('.card__delete-button').addEventListener('click', (event) => {
        deleteCardFunc(event)
    });
    return clonedCard;
}
// Функция удаления карточки
function deleteCard (event) {
    const itemToDelete = event.target.closest('.places__item');
    itemToDelete.remove();
}
// Вывести карточки на страницу
initialCards.forEach((item) => {
    const createdCard = createCard(item, deleteCard);
    placesList.append(createdCard);
});