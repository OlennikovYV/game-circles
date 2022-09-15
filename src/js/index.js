import "../sass/style.scss";

!(function () {
  let currentScreen = 0;
  let selectedTime = 0;
  let scores = 0;
  let themes = "light";
  let timerID;

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

            if (pressedElement.classList.contains("menu")) {
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
    titleScores.innerHTML = `READY !`;
    titleScores.style.display = "block";
    document.getElementsByClassName("restart")[0].disabled = true;

    timerID = setTimeout(runGame, 1500);
  }

  function runGame() {
    let remainingTime = selectedTime;

    setTime(remainingTime);
    timerID = setInterval(decreaseTime(remainingTime), 1000);

    scores = 0;
    titleScores.style.display = "none";
    document.getElementsByClassName("restart")[0].disabled = false;
    board.addEventListener("click", clickCirle);
    createRandomCircle();
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
    circle.style.backgroundColor = "#e9e5d8";
    circle.style.boxShadow = "0px 0px 3px 2px #c9c5b8";

    board.append(circle);
  }

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function decreaseTime(time) {
    return () => {
      time -= 1;

      if (time > 0) {
        setTime(time);
      } else {
        setTime(time);
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

    titleScores.innerHTML = `YOUR SCORES: ${scores}`;
    titleScores.style.display = "block";
    setTime(0);
  }

  function addZero(num) {
    return String(num).padStart(2, "0");
  }

  function convertToHuman(time) {
    const min = Math.trunc(time / 60);
    const sec = time - min * 60;

    return `${addZero(min)}:${addZero(sec)}`;
  }

  function setTime(time) {
    titleTimer.innerHTML = convertToHuman(time);
  }

  for (let i = 0; i < menus.length; i += 1) {
    menus[i].addEventListener("click", screenUp);
  }
})();
