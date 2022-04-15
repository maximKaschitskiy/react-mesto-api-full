import React from 'react';

import Card from '../components/Card.js';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main( {isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, onCardDel, onCardClick, cards, setCards, onCardLike} ) {

  const [currentUser] = React.useContext(CurrentUserContext);

  const handleLikeButton = (event) => {
    onCardLike(event);
  }

    return (
      <main>
        <section className="profile">
          <div className="profile__avatar-container">
            <button className="profile__avatar-edit" onClick={isEditAvatarPopupOpen}></button>
            <img className="profile__avatar" src={currentUser.avatar} alt="Картинка пользователя" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={isEditProfilePopupOpen}></button>
            <p className="profile__status">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={isAddPlacePopupOpen}></button>
        </section>
        <section className="elements">
        {cards && cards.map((item) => {
          return (
            <Card 
            item={item} 
            owner={item.owner === currentUser._id}
            onCardClick={onCardClick}
            onCardDel={onCardDel}
            onCardLike={(item)=>{handleLikeButton(item)}}
            key={item._id}
            />
            )
          }
        )}
        </section>
      </main>
    );
}

export default Main;
