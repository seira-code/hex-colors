const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`

function setColorsInSection(section, color, isLock, index) {
  const sectionText = section.getElementsByTagName("p")[0]
  const sectionLock = section.getElementsByTagName("img")[0]

  const lumine = chroma(color).luminance() > 0.5 ? "black" : "white"

  sectionText.innerHTML = color
  sectionText.style.color = lumine

  sectionLock.style.filter = lumine == "black" ? "brightness(0) invert(0)" : "brightness(0) invert(1)"
  sectionLock.src = isLock ? "../assets/lock.svg" : "../assets/unlock.svg"
  section.style.backgroundColor = color

  sectionText.setAttribute("onclick", `handleTextClick("${color}")`)
  sectionLock.setAttribute("onclick", `handleLockerClick(${index})`)
}

function randomSections(reset = false) {
  let store = JSON.parse(localStorage.getItem("sections")) ?? {}
  if (reset) store = {}

  for (let i = 1; i < 6; i++) {
    if (!reset && store[i]?.lock) continue;
    const section = document.getElementById(`section${i}`)
    const color = randomColor()

    store[i] = { color, lock: false }

    if (reset) lockOrUnlock(section, store[i], true)
    setColorsInSection(section, color, false, i)

  }

  localStorage.setItem("sections", JSON.stringify(store))
  return store
}

function loadColors(store) {
  const values = Object.values(store)
  for (let i = 0; i < 5; i++) {
    const section = document.getElementById(`section${i + 1}`)
    const sectionObj = values[i]

    lockOrUnlock(section, sectionObj)
    setColorsInSection(section, sectionObj.color, sectionObj.lock, i + 1)
  }
}

function lockOrUnlock(section, store, reset = false) {
  if (reset) return section.classList.remove("lock")
  if (store.lock) section.classList.add("lock")
  else section.classList.remove("lock")
}

function handleLockerClick(index) {
  const store = JSON.parse(localStorage.getItem("sections"))
  store[index] = { ...store[index], lock: !store[index].lock }
  localStorage.setItem("sections", JSON.stringify(store))
  loadColors(store)
}

async function handleTextClick(text) {
  await navigator.clipboard.writeText(text)
  alert(`Copied: ${text}`)
}