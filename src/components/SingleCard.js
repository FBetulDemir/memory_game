import './SingleCard.css'

const SingleCard = ({card , handleChoice, flipped}) => {

    const handleClick = ()=> {
        handleChoice(card)
    }

    return ( 
        <div className="card">
            <div className= {flipped ? "flipped" : ""}>
                <img className="front-card" src={card.src} alt="card front side" />
                <img 
                    className="back-card" 
                    src="images/cover.png" 
                    onClick={handleClick} 
                    alt="card back side" 
                />
            </div>
        </div>
    );
}
 
export default SingleCard;