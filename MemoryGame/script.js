document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
      {
        name: 'fries',
        img: '  fries.png'
      },
      {
        name: 'cheeseburger',
        img: '  cheeseburger.png'
      },
      {
        name: 'ice-cream',
        img: '  ice-cream.png'
      },
      {
        name: 'pizza',
        img: '  pizza.png'
      },
      {
        name: 'milkshake',
        img: '  milkshake.png'
      },
      {
        name: 'hotdog',
        img: '  hotdog.png'
      },
      {
        name: 'fries',
        img: '  fries.png'
      },
      {
        name: 'cheeseburger',
        img: '  cheeseburger.png'
      },
      {
        name: 'ice-cream',
        img: '  ice-cream.png'
      },
      {
        name: 'pizza',
        img: '  pizza.png'
      },
      {
        name: 'milkshake',
        img: '  milkshake.png'
      },
      {
        name: 'hotdog',
        img: '  hotdog.png'
      }
    ]
  
    cardArray.sort(() => 0.5 - Math.random())
  
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', '  blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      if(cardsChosenId[0] ==cardsChosenId[1] ) {
        cards[cardsChosenId[0]].setAttribute('src', '  blank.png')
        cards[cardsChosenId[1]].setAttribute('src', '  blank.png')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        cards[cardsChosenId[0]].setAttribute('src', '  white.png')
        cards[cardsChosenId[1]].setAttribute('src', '  white.png')
        cards[cardsChosenId[0]].style.cursor='default'
        cards[cardsChosenId[1]].style.cursor='default'
        cards[cardsChosenId[0]].removeEventListener('click', flipCard)
        cards[cardsChosenId[1]].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
      } else {
        cards[cardsChosenId[0]].setAttribute('src', '  blank.png')
        cards[cardsChosenId[1]].setAttribute('src', '  blank.png')
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length
      if  (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations! You found them all!'
      }
    }
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
      }
    }
  
    createBoard()
  })