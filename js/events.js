document.addEventListener("DOMContentLoaded", () => {
  let localStrg = localStorage.getItem("sections")
  if (!localStrg) localStrg = JSON.stringify(randomSections())

  let storage = JSON.parse(localStrg)
  if (Object.values(storage).length < 5) return randomSections()

  loadColors(storage)
})

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase()
  console.log(key)
  switch (key) {
    case " ": // SPACE
      randomSections()
      break;
    case "r":
      randomSections(true) // reset
      break;
    case "к": // reset
      randomSections(true)
      break;

    default:
      break;
  }
})