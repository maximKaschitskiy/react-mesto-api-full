import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card ( { item, owner, onCardClick, onCardLike, onCardDel } ) {

  const [liked, setLiked] = React.useState(false);
  
  const [currentUser] = React.useContext(CurrentUserContext);

  const handleCardClick = function () {
    onCardClick(item)
  }
  
  const handleCardLike = function () {
    onCardLike(item)
  }

  const handleCardDelete = function () {
    onCardDel(item)
  }

  React.useEffect(() => {
    if (item.likes.some(item => item === currentUser._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    };
  }, [item.likes, currentUser._id]);

    return (
      <div className="elements__element">
        {
          owner 
          ? <button className="elements__delete-button" type="button" onClick={()=>{handleCardDelete(item)}} ></button>
          : null
        }
          <a className="elements__picture-link" href="#/" target="_self" onClick={handleCardClick}>
            <img className="elements__picture" alt={item.name} src={item.link}/>
          </a>
        <div className="elements__caption">
          <h2 className="elements__caption-text">{item.name}</h2>
          <div className="elements__like">
          <button className={`elements__like-button ${liked ? 'elements__like-button_active' : ''}`} type="button" onClick={()=>{handleCardLike(item)}}></button>
            <span className="elements__like-count">{item.likes.length}</span>
          </div>
        </div>
      </div>
    )
}

export default Card;
