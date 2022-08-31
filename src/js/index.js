import "../sass/style.scss";

!(function () {
  let currentScreen = 0;
  const screens = document.getElementsByClassName("screens");
  const menus = document.getElementsByClassName("menu");

  function screenUp(e) {
    if (e.target.classList.contains("button")) {
      let menuScreen = e.target.parentElement.classList[1];

      switch (menuScreen) {
        case "title":
          screens[currentScreen].classList.add("up");
          currentScreen += 1;
          break;
        case "options":
          screens[currentScreen].classList.add("up");
          currentScreen += 1;
          break;
        case "game":
          for (let i = 0; i < screens.length; i += 1) {
            screens[i].classList.remove("up");
          }
          currentScreen = 0;
          break;
      }
    }
  }

  for (let i = 0; i < menus.length; i += 1) {
    menus[i].addEventListener("click", screenUp);
  }
})();
