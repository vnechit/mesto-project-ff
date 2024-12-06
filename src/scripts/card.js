//  Функция создания карточки
function createCard (card, deleteCardFunc, cardTemplate, likeCardFunc, onOpenImagePopup) {
    const clonedCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    clonedCard.querySelector('.card__title').textContent = card.name;
    const image = clonedCard.querySelector('.card__image');
    image.src = card.link;
    image.alt = card.name;
    clonedCard.querySelector('.card__delete-button').addEventListener('click', (event) => {
        deleteCardFunc(event);
    });
    clonedCard.querySelector('.card__like-button').addEventListener('click', (event) => {
        likeCardFunc(event);
    });
    image.addEventListener('click', (event) => {
        onOpenImagePopup({description: image.alt, link: image.src});
    });
    return clonedCard;
}
// Функция удаления карточки
function deleteCard (event) {
    const itemToDelete = event.target.closest('.places__item');
    itemToDelete.remove();
}

// Функция лайка карточки
function likeCard (event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };