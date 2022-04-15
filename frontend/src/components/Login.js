import React from "react";

function Login({onLoad, onSubmit}) {

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
    <section className="user-entrance user-entrance__screen_state_login">
      <form className="user-entrance__form user-entrance__form_state_login" onSubmit={handleSubmit} name="user-entrance__form_state_login" noValidate>
        <h2 className="user-entrance__form-title">Вход</h2>
        <fieldset className="user-entrance__form-fieldset user-entrance__form-fieldset_state_login">
          <input value={inputField.email} type="text" placeholder="Email" className="user-entrance__form-input user-entrance__form-input_field_email" name="email" id="email-field" onChange={(event)=>{handleChange(event)}}></input>
          <span className="user-entrance__form-error-text user-entrance__form-error-text_message_email email-field-error"></span>
          <input value={inputField.password} type="password" placeholder="Пароль" className="user-entrance__form-input user-entrance__form-input_field_password" name="password" id="password-field" onChange={(event)=>{handleChange(event)}} autoComplete="on"></input>
          <span className="user-entrance__form-error-text user-entrance__form-error-text_message_password password-field-error"></span>
          <input type="submit" className="user-entrance__form-submit-button user-entrance__form-submit-button_form_login" disabled={onLoad} value="Войти"></input>
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
