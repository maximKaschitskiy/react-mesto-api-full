import React from "react";
import { Link } from "react-router-dom";

function Register({onLoad, onSubmit}) {

const [inputField, setInputField] = React.useState({
    email: '',
    password: ''
  })

const handleChange = (event) =>{
    setInputField( { ...inputField,
      [event.target.name]: event.target.value
    } );
  }

const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputField);
}

React.useEffect(() => {
  setInputField({
    email: '',
    password: ''
  });
}, []);

  return (
    <section className="user-entrance user-entrance__screen_state_registration">
      <form className="user-entrance__form user-entrance__form_state_registration" onSubmit={handleSubmit} name="user-entrance__form_state_registration" noValidate>
        <h2 className="user-entrance__form-title">Регистрация</h2>
        <fieldset className="user-entrance__form-fieldset user-entrance__form-fieldset_state_registration">
          <input value={inputField.email} type="text" placeholder="Email" className="user-entrance__form-input user-entrance__form-input_field_email" name="email" id="email-register-field" onChange={(event)=>{handleChange(event)}}></input>
          <span className="user-entrance__form-error-text user-entrance__form-error-text_message_email email-field-error"></span>
          <input value={inputField.password} type="password" placeholder="Пароль" className="user-entrance__form-input user-entrance__form-input_field_password" name="password" id="password-register-field" onChange={(event)=>{handleChange(event)}} autoComplete="on"></input>
          <span className="user-entrance__form-error-text user-entrance__form-error-text_message_password password-field-error"></span>
          <input type="submit" className="user-entrance__form-submit-button user-entrance__form-submit-button_form_registration" disabled={onLoad} value="Зарегистрироваться"></input>
        </fieldset>
      </form>
      <Link to={'/sign-in'} className="user-entrance__bottom-link user-entrance__bottom-link_state_registration">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;
