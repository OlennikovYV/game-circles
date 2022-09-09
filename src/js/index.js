import "../sass/style.scss";

!(function () {
  let currentScreen = 0;
  let time = 0;
  let scores = 0;
  let themes = "light";
  let intervalID;

  const screens = document.getElementsByClassName("screens");
  const menus = document.getElementsByClassName("menu");
  const titleTimer = document.getElementsByClassName("board__timer")[0];
  const titleScores = document.getElementsByClassName("board__scores")[0];

  function screenUp(e) {
    if (e.target.classList.contains("button")) {
      let menuScreen = e.target.parentElement.classList[1];

      switch (menuScreen) {
        case "title":
          screens[currentScreen].classList.add("up");
          currentScreen += 1;
          break;
        case "options":
          time = Number(e.target.getAttribute("data-time"));
          screens[currentScreen].classList.add("up");
          currentScreen += 1;
          startGame();
          break;
        case "game":
          for (let i = 0; i < screens.length; i += 1) {
            screens[i].classList.remove("up");
          }
          currentScreen = 0;
          titleScores.style.display = "none";
          break;
      }
    }
  }

  function startGame() {
    intervalID = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime();
  }

  function createRandomCircle() {}

  function decreaseTime() {
    time -= 1;
    if (time > 0) {
      setTime();
    } else {
      setTime();
      finishGame();
    }
  }

  function finishGame() {
    clearInterval(intervalID);
    titleScores.style.display = "block";
  }

  function setTime() {
    titleTimer.innerHTML = time;
  }

  window.addEventListener("resize", getSizes, false);

  function getSizes() {
    screens[currentScreen].clientHeight = document.body.clientHeight + "px";
    screens[currentScreen].clientWidth = document.body.clientWidth + "px";
  }

  for (let i = 0; i < menus.length; i += 1) {
    menus[i].addEventListener("click", screenUp);
  }
})();
