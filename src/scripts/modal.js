// Функция открытия модального окна
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeModal);
  document.addEventListener("keydown", closeModal);
}

// Функция закрытия модального окна
function closeModal(event) {
  if (event.type === "keydown" && event.key === "Escape") {
    const opennedPopUp = document.querySelector(".popup_is-opened");
    closeModalAdditional(opennedPopUp);
  } else if (event.target.classList.contains("popup")) {
    closeModalAdditional(event.target);
  } else if (
    event.target.classList.contains("popup__close") ||
    event.type === "submit"
  ) {
    const popup = event.target.closest(".popup");
    closeModalAdditional(popup);
  }
}

function closeModalAdditional(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeModal);
}

export { openModal, closeModal };
