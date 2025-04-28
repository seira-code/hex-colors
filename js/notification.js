const element = document.querySelector(".notification")
const textElement = element.querySelector("p")

function sendNotification(text) {
  textElement.innerHTML = text

  element.classList.add("active")
  element.style.display = "flex"
  console.log(element.classList)

  setTimeout(() => {
    element.classList.remove("active")
    element.classList.add("hidden")
  }, 2000);
}

element.addEventListener('animationend', () => {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden")
    element.style.display = "none"
  }
})
