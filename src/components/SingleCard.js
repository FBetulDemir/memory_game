import './SingleCard.css'

const SingleCard = ({card}) => {
    return ( 
        <div className="card">
            <div>
                <img className="front-card" src={card.src} alt="card front side" />
                <img className="back-card" src="images/cover.png" alt="card back side" />
            </div>
        </div>
    );
}
 
export default SingleCard;