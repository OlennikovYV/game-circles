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
  const board = document.getElementsByClassName("board__field")[0];

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
          titleScores.style.display = "none";

          setTimeout(startGame, 1000);
          break;
        case "game":
          for (let i = 0; i < screens.length; i += 1) {
            screens[i].classList.remove("up");
          }
          currentScreen = 0;
          titleScores.style.display = "none";

          finishGame();
          break;
      }
    }
  }

  function startGame() {
    intervalID = setInterval(decreaseTime, 1000);
    scores = 0;
    board.addEventListener("click", clickCirle);
    createRandomCircle();
    setTime();
  }

  function clickCirle(event) {
    if (event.target.classList.contains("board__circle")) {
      event.target.remove();
      scores += 1;
      createRandomCircle();
    }
  }

  function createRandomCircle() {
    let circle = document.createElement("div");

    let diameter = getRandomNumber(40, 60);
    let { width, height } = board.getBoundingClientRect();
    let x = getRandomNumber(diameter, width - diameter);
    let y = getRandomNumber(diameter, height - diameter);

    circle.classList.add("board__circle");
    circle.style.position = "absolute";
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.backgroundColor = "#8e8e8e";

    board.append(circle);
  }

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

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
    const circles = document.getElementsByClassName("board__circle");
    for (let i = 0; i < circles.length; i += 1) {
      circles[i].remove();
    }

    if (intervalID) clearInterval(intervalID);
    board.removeEventListener("click", clickCirle);

    titleScores.innerHTML = `YOUR SCORES: ${scores}`;
    titleScores.style.display = "block";
  }

  function addZero(num) {
    return String(num).padStart(2, "0");
  }

  function convertToHuman(time) {
    const min = Math.trunc(time / 60);
    const sec = time - min * 60;

    return `${addZero(min)}:${addZero(sec)}`;
  }

  function setTime() {
    titleTimer.innerHTML = convertToHuman(time);
  }

  for (let i = 0; i < menus.length; i += 1) {
    menus[i].addEventListener("click", screenUp);
  }
})();
