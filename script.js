const gameContainer = document.getElementById("game");

const startDiv = document.getElementById("startGame");

const endGame = document.getElementById("endGame");

const score = document.getElementById("counter");



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;


let currentScore = 0;


// TODO: Implement this function!
function handleCardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;


  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard; 
    card2 = currentCard === card1 ? null : currentCard; //basically, card 2 will be currentCard or empty if card 1 exists or not
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let firstCard = card1.className;
    let secondCard = card2.className;

    //so if they equal each other... (or rather, the class name...)
    if (firstCard === secondCard) { 
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick); //you can't click on them now!
      card2.removeEventListener("click", handleCardClick);
      card1 = null; //goes back to empty
      card2 = null;
      currentScore +=10;
      noClicking = false; //you can click again.
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }
  currentScore -= 1;
  score.innerHTML = currentScore;
  
  if (cardsFlipped === COLORS.length) {
    alert("game over!");
    let newGameBtn = document.createElement("button");
    newGameBtn.innerText = 'Play another round!';
    endGame.append(newGameBtn);

    newGameBtn.addEventListener('click', function (e){
      location.reload();
    })
  }

}


// window.addEventListener('DOMContentLoaded', createDivsForColors(shuffledColors));

window.addEventListener('DOMContentLoaded', function(e){
    let startBtn = document.createElement("button");
    startBtn.innerText = "Start the game!";
    startDiv.append(startBtn);

    startBtn.addEventListener('click', function (e){
      createDivsForColors(shuffledColors);
      startDiv.remove(startBtn);
    })

});