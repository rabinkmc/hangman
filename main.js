// import {
//   getRandomWord,
//   createWordDiv,
//   makeOnlyNlettersVisible,
// } from "./utils.js";
let WORDS = ["hello", "hangman", "world", "Penguin", "Nepal", "Rabin"];
let GAME = document.getElementById("game");

gameSetup();

function gameSetup() {
  let randomWord = getRandomWord(WORDS);
  createWordDiv(randomWord);
  makeOnlyNlettersVisible(randomWord, 3);
}

function getRandomWord(words) {
  let index = Math.floor(Math.random() * words.length);
  return words[index];
}

function createLetterDiv(randomWord, index) {
  let divletter = document.createElement("button");
  let properties = { type: "button", id: "btn" + index };
  setAttributes(divletter, properties);
  divletter.classList.add("btn", "btn-success");
  divletter.innerHTML = randomWord[index];
  divletter.style.visibility = "hidden";
  return divletter;
}

function createWordDiv(word) {
  for (let index in word) {
    let divletter = createLetterDiv(word, index);
    GAME.append(divletter);
  }
  return GAME;
}

function makeOnlyNlettersVisible(randomWord, count = 3) {
  let indexMemory = {};
  let counter = 0;
  while (counter < count) {
    let index = Math.floor(Math.random() * randomWord.length);
    if (!(index in indexMemory)) {
      indexMemory[index] = index;
      counter = counter + 1;
      let divletter = document.getElementById("btn" + index);
      divletter.style.visibility = "visible";
    }
  }
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
