import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {

  return (
  <>
    <section className={`popup-overlay ${isOpen ? "popup-overlay_active" : ""}`} onClick={onClose}></section>
    <section className={`popup ${isOpen ? "popup_active" : ""} popup_state_picture-full`}>
        <div className="popup__window popup__window_state_picture-full">
          <button className="popup__close-button popup__close-button_state_picture-full" type="button" onClick={onClose}></button>
          <img className="popup__image" src={card ? card.link : ""} alt={card ? card.name : ""} />
          <h2 className="popup__caption">{card ? card.name : ""}</h2>
        </div>
    </section>
  </>
  );
}

export default ImagePopup;