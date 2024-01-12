import controllerListenersMenu from "./controller/controllerListenersMenu.js"
import viewHome from "./view/viewHome.js"

document.addEventListener("DOMContentLoaded", async function () {
  viewHome()
  await controllerListenersMenu()
})
