import "../sass/style.scss";
import { setTime, setScores, getRandomNumber } from "./helper/utils";

!(function () {
  let currentScreen = 0;
  let selectedTime = 0;
  let scores = 0;
  let themes = "light";
  let timerID;

  const screens = document.getElementsByClassName("screens");
  const menus = document.getElementsByClassName("menu");
  const titleTimer = document.getElementsByClassName(
    "game-information__timer"
  )[0];
  const titleScores = document.getElementsByClassName(
    "game-information__scores"
  )[0];
  const titleGame = document.getElementsByClassName("board__game-title")[0];
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
          selectedTime = Number(e.target.getAttribute("data-time"));
          screens[currentScreen].classList.add("up");
          currentScreen += 1;

          starGame();

          break;
        case "game":
          let pressedElement = e.target;

          if (pressedElement.classList.contains("button")) {
            if (pressedElement.classList.contains("restart")) {
              finishGame();
              starGame();
            }

            if (pressedElement.classList.contains("start")) {
              for (let i = 0; i < screens.length; i += 1) {
                screens[i].classList.remove("up");
              }
              currentScreen = 0;

              finishGame();
            }
          }

          break;
      }
    }
  }

  function starGame() {
    titleGame.innerHTML = `READY !`;
    titleGame.style.display = "block";
    document.getElementsByClassName("restart")[0].disabled = true;

    setTimeout(readyGame, 1250);
  }

  function readyGame() {
    titleGame.innerHTML = `GO !`;
    setTimeout(goGame, 1250);
  }

  function goGame() {
    let remainingTime = selectedTime;

    setTime(titleTimer, remainingTime);
    timerID = setInterval(decreaseTime(remainingTime), 1000);

    scores = 0;
    setScores(titleScores, scores);
    titleGame.style.display = "none";
    document.getElementsByClassName("restart")[0].disabled = false;
    board.addEventListener("click", clickCirle);
    createRandomCircle();
  }

  function clickCirle(event) {
    if (
      event.target.classList.contains("board__circle") &&
      !event.target.classList.contains("anim-death")
    ) {
      const circleClikced = event.target;

      circleClikced.classList.add("anim-death");
      circleClikced.addEventListener("animationend", (event) => {
        event.target.remove();
      });

      scores += 1;
      setScores(titleScores, scores);
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
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;

    board.append(circle);
  }

  function decreaseTime(time) {
    return () => {
      time -= 1;

      if (time > 0) {
        setTime(titleTimer, time);
      } else {
        setTime(titleTimer, time);
        finishGame();
      }
    };
  }

  function finishGame() {
    const circles = document.getElementsByClassName("board__circle");
    for (let i = 0; i < circles.length; i += 1) {
      circles[i].remove();
    }

    if (timerID) clearInterval(timerID);
    board.removeEventListener("click", clickCirle);

    titleGame.innerHTML = `GAME OVER !`;
    titleGame.style.display = "block";
    setTime(titleTimer, 0);
  }

  for (let i = 0; i < menus.length; i += 1) {
    menus[i].addEventListener("click", screenUp);
  }
})();
