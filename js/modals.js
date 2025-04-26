const closeButtons = document.querySelectorAll(".modal__buttons button")

for (let button of closeButtons) {
  if (button.getAttribute("id") !== "modal-close") continue;
  button.addEventListener("click", () => {
    const modal = button.parentElement.parentElement
    modal.style.display = "none"
    toggleBlur(false)
  })
}

function toggleModal(id) {
  toggleBlur()
  const modal = document.getElementById(id)
  modal.style.display = "block"
}

function toggleBlur(toggle = true) {
  const container = document.querySelector(".container")
  if (toggle) container.classList.add("blur")
  else container.classList.remove("blur")
}