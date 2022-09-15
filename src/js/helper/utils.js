export function setTime(elementTimer, time) {
  elementTimer.innerHTML = convertToHuman(time);
}

export function setScores(elementScores, scores) {
  elementScores.innerHTML = `SCORES: ${scores}`;
}

export function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function convertToHuman(time) {
  const min = Math.trunc(time / 60);
  const sec = time - min * 60;

  return `${addZero(min, 2)}:${addZero(sec, 2)}`;
}

function addZero(num, length) {
  return String(num).padStart(length, "0");
}
