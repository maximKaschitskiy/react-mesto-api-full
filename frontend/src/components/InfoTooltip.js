import React from 'react';
import { useNavigate } from "react-router-dom";

import './InfoTooltip.css';

import succsessIcon from '../images/popup/success.svg';
import failIcon from '../images/popup/fail.svg';

function InfoTooltip({isOpen, onClose, onFail}) {

  const succsessText = { mainMessage: "Успешно",
                         altCaption: "Успешно" };
  const failText = { mainMessage: "Что-то пошло не так! Попробуйте ещё раз.",
                      altCaption: "Ошибка" };
  
  const navigate = useNavigate();

  function handleOnSuccess() {
    navigate('/sign-in');
    onClose();
  }

  return (
  <>
    <section className={`popup-overlay ${isOpen ? "popup-overlay_active" : ""}`} onClick={
      () => (!onFail ? handleOnSuccess() : onClose())
    }></section>
    <section className={`popup ${isOpen ? "popup_active" : ""}`}>
        <div className="popup__window">
        <button className="popup__close-button" type="button" onClick={
           () => (!onFail ? handleOnSuccess() : onClose())
          }></button>
          <div className="popup__form">
            <img className="popup__icon popup__icon_state_success-message" src={ onFail ? failIcon : succsessIcon } alt={ onFail ? failText.altCaption : succsessText.altCaption } />
            <p className="popup__form-caption">{ onFail ? `${failText.mainMessage}` : `${succsessText.mainMessage}` }</p>
          </div>
        </div>
    </section>
  </>
  );
}

export default InfoTooltip;
