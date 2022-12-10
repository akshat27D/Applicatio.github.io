const cards = document.querySelectorAll(".memory-card");
const refresh = document.querySelector(".refresh img");
const final = document.querySelector(".final");
const again = document.querySelector(".again");
let clicks=6;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; 
let interval;
let finalTime;
let click = -1;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;
  if(isMatch!==true)
    {   clicks--;
        document.querySelector("#click").innerHTML=clicks;
    }
  isMatch ? disableCards() : unFlipCards();
  if(clicks===0)
    {
        alert("you have lost the game");
        clicks=6;
        document.querySelector("#click").innerHTML=clicks;
    }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  gameWon();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function gameWon() {

  if (document.getElementsByClassName("flip").length === 12) {
    alert("you won");
    document.querySelector("#click").innerHTML=6;
    window.reload();
  }
  click = 0;
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));