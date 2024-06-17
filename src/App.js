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
  const [choiceTwo, SetChoiceTwo] = useState(null)

  //function to shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id:Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  //function to handle a choice
  const handleChoice = (card) => {
    if (choiceOne === null){
      setChoiceOne(card)
    }else{
      SetChoiceTwo(card)
    }
  }

  useEffect (() => {
    if(choiceOne && choiceTwo){

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
        resetTurn()
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    SetChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
  }

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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
