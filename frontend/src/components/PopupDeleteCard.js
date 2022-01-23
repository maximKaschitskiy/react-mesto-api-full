import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function PopupDeleteCard( {card, isOpen, onClose, onLoad, onDeleteCard}  ) {

  const handleSubmit = (event) => {
    event.preventDefault();
    onDeleteCard(card);
  }

  return (
      <PopupWithForm
        className={"popup__form"}
        isOpen={isOpen}
        onClose={onClose}
        onLoad={onLoad}
        formTitle={"Вы уверены?"}
        buttonTitle={"Да"}
        buttonTitleLoading={"Удаление..."}
        onSubmit={handleSubmit}
      />
    );
  }

  export default PopupDeleteCard;