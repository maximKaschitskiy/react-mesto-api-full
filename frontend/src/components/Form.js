import React from 'react';

import './Form.css';
import { Link } from "react-router-dom";

function Form({ name, buttonText, url, text, children, onLoad, onSubmit, formClassName, fieldsetClassName, bottomLink, linkText, refLink }) {
  return(
    <form name={name} method="post" className={`form ${formClassName}`} noValidate onSubmit={onSubmit} ref={refLink}>
      <fieldset className={`fieldset ${fieldsetClassName}`}>
      { children }
      <input type="submit" className="form__button" disabled={onLoad} value={buttonText}></input>
      <div className="form__subText-wrapper">
        <p className="form__text">{text}</p>
        <Link to={bottomLink} className="form__link">{linkText}</Link>
      </div>
      </fieldset>
    </form>
  );
}

export default Form;
