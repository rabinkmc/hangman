// import {
//   getRandomWord,
//   createWordDiv,
//   makeOnlyNlettersVisible,
// } from "./utils.js";
//
let WORDS = ["hello", "hangman", "world", 
		     "Penguin", "Nepal", "Rabin", 
			 "kathmandu", "Pokhara", "django", "gunicorn"
];

let GAME = document.getElementById("game");
let randomWord = getRandomWord(WORDS);
let input = document.getElementById("input");
let btn = document.querySelector("#btn")
let lives = 9;

let gamestart = document.getElementById("gameStart");
let main = document.querySelector("#main")

let result = document.getElementById("result");
let counterElement = document.createElement("div");
counterElement.classList.add("btn", "btn-primary");
counterElement.innerText = "lives:" + lives;
result.append(counterElement)

gamestart.addEventListener("click", ()=>{
		document.location.reload();
	}
)

btn.addEventListener("click", btnEvent)
main.addEventListener("keypress", (event)=>{
	if (event.code == "Enter"){
		btnEvent(event);
	}
})

function showLostMessage(){
	result.classList.add("btn", "btn-danger")
	result.innerText = 'You lost'
	main.append(result)
}

function showWinMessage(){
	result.classList.add("btn","btn-success")
	result.innerText = 'You won'
	main.append(result)
}

gameSetup();
function countVisibleLetters(){
	let visibleChildrens = 0  ;
	let childrens = GAME.querySelectorAll("button")
	for (let children of childrens){
		if (children.style.visibility === "visible"){
			visibleChildrens++;
		}
	}
	return visibleChildrens;
}

function getIndex(){
	let letter = input.value;
	let indices = []
	for (let i in randomWord){
		if (letter == randomWord[i]){
			indices.push(i)
		}
	}
	return indices
}
function makeIndexVisible(){
	indices = getIndex()
	for(let i of indices){
		button = document.getElementById("btn"+i)	
		if(button){
			button.style.visibility = "visible"
		}
	 }
	return indices;
}


function gameSetup() {
  createWordDiv(randomWord);
  makeOnlyNlettersVisible(randomWord, 3);
}

function getRandomWord(words) {
  let index = Math.floor(Math.random() * words.length);
  return words[index];
}

function createLetterDiv(randomWord, index) {
  let span = document.createElement("span")
  let divletter = document.createElement("button");
  let properties = { type: "button", id: "btn" + index };
  setAttributes(divletter, properties);
  divletter.classList.add("btn", "btn-success");
  divletter.innerHTML = randomWord[index];
  divletter.style.visibility = "hidden";
  span.append(divletter)
  return span;

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
      indexMemory[index] = randomWord[index];
      counter = counter + 1;
      let divletter = document.getElementById("btn" + index);
      divletter.style.visibility = "visible";
    }
  }
  return indexMemory
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function btnEvent(event){
	console.log(event.code, typeof(event.code));
	if(lives>0){
		makeIndexVisible();
		let lettersGuessed = countVisibleLetters();
		if(lettersGuessed == randomWord.length){
			showWinMessage();
		 }
	}else showLostMessage();
	lives--;
	counterElement.innerText = "lives:" + lives
}
