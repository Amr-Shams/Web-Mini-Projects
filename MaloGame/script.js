const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('.Time')
const score = document.querySelector('#result')

let result = 0
let hitPosition
let currentTime = 10
let timerId = null

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole')
  })
  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add('mole')
  hitPosition = randomSquare.id
}
function Movmol(){
    let timerId=setInterval(randomSquare, 800);
}
Movmol();
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id == hitPosition) {
        result++
        score.textContent = result
        hitPosition = null
      }
    })
  })
  function countdown(){
currentTime--
timeLeft.textContent=`Time Left is :${currentTime}`
if(currentTime===0){
    clearInterval(countdown)
    clearInterval(timerId)
    alert("Game is Over and Your Score is "+result)
    }
}
  let counterdownId=setInterval(countdown,1000)
// now we need to hit the mol
// now we need to move the mole randl=omly