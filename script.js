const board = document.querySelector('.game-board');
const restartBtn = document.getElementById('restart');
const images = [
  'assets/1.png', 'assets/2.png', 'assets/3.png', 'assets/4.png',
  'assets/5.png', 'assets/6.png', 'assets/7.png', 'assets/8.png'
];
let cardsArray = [...images, ...images];
cardsArray.sort(() => Math.random() - 0.5);
let firstCard = null;
let secondCard = null;
let lockBoard = false;
cardsArray.forEach((src) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="assets/back.png" alt="Back Side">
      </div>
      <div class="card-back">
        <img src="${src}" alt="Animal">
      </div>
    </div>
  `;
  board.appendChild(card);
  card.addEventListener('click', () => flipCard(card));
});
function flipCard(card) {
  if (lockBoard || card === firstCard) return;
  card.classList.add('flip');
  if (!firstCard) {
    firstCard = card;
    return;
  }
  secondCard = card;
  checkMatch();
}
function checkMatch() {
  const firstImg = firstCard.querySelector('.card-back img').src;
  const secondImg = secondCard.querySelector('.card-back img').src;
  if (firstImg === secondImg) {
    resetBoard();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }
}
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
restartBtn.addEventListener('click', () => {
  location.reload();
});