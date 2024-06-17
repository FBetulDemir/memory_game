import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/images/helmet-1.png", matched:false },
  { "src": "/images/potion-1.png", matched:false },
  { "src": "/images/ring-1.png", matched:false },
  { "src": "/images/scroll-1.png", matched:false },
  { "src": "/images/shield-1.png", matched:false },
  { "src": "/images/sword-1.png", matched:false }
] 

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState (null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //function to shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id:Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //function to handle a choice
  const handleChoice = (card) => {
    if (choiceOne === null){
      setChoiceOne(card)
    }else{
      setChoiceTwo(card)
    }
  }


  //compares the two different choices
  useEffect (() => {
    
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(()=> resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }

  //game start page automaticly starting the game
  useEffect(()=>{
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          < SingleCard 
            key={card.id} 
            card = {card}
            handleChoice={handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled ={disabled} 
          />
        ))}
      </div>
      <div className="turns">
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default App;
