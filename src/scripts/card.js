//  Функция создания карточки
function createCard(
  card,
  deleteCardFunc,
  cardTemplate,
  likeCardFunc,
  onOpenImagePopup,
  myId,
  likeRequest,
  deleteLike,
  deleteCardRequest
) {
  const clonedCard = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  clonedCard.querySelector(".card__title").textContent = card.name;
  const image = clonedCard.querySelector(".card__image");
  image.src = card.link;
  image.alt = card.name;

  const deleteButton = clonedCard.querySelector(".card__delete-button");
  if (card.owner._id === myId) {
    deleteButton.addEventListener("click", (event) => {
      deleteCardFunc(event, deleteCardRequest, card._id);
    });
  } else {
    deleteButton.classList.add("d-none");
  }
  const likeCountField = clonedCard.querySelector(".card__like-count");
  likeCountField.textContent = card.likes.length;
  const likeButton = clonedCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", (event) => {
    likeCardFunc(event, likeRequest, deleteLike, card._id, likeCountField);
  });
  if (card.likes.some((e) => e._id === myId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  image.addEventListener("click", (event) => {
    onOpenImagePopup({ description: image.alt, link: image.src });
  });
  return clonedCard;
}
// Функция удаления карточки
async function deleteCard(event, deleteCardRequest, id) {
  await deleteCardRequest(id);
  const itemToDelete = event.target.closest(".places__item");
  itemToDelete.remove();
}

// Функция лайка карточки
async function likeCard(event, likeRequest, deleteLike, id, likeCountField) {
  let ans = [];
  if (event.target.classList.contains("card__like-button_is-active")) {
    ans = await deleteLike(id);
  } else {
    ans = await likeRequest(id);
  }
  event.target.classList.toggle("card__like-button_is-active");
  likeCountField.textContent = ans.length;
}

export { createCard, deleteCard, likeCard };
