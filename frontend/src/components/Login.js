import React from 'react';

import './Login.css';

import Form from "./Form.js";
import Input from "./Input.js";

import { Link } from 'react-router-dom';

function Login({onLoad, onSubmit}) {

  const [inputField, setInputField] = React.useState({})

  React.useEffect(() => {
    setInputField({});
  }, []);

const handleChange = (event) => {
    setInputField( { ...inputField,
      [event.target.name]: event.target.value
    } );
  }

const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputField);
}

  return(
    <div className="login">
      <div className="login__wrapper">
      <h2 className="login__title">Авторизация</h2>
      <Form
        buttonText="Войти"
        text="Еще не зарегистрированы?"
        url="/signup"
        linkText="Регистрация"
        onSubmit={handleSubmit}
        formClassName="form_state_login"
        bottomLink="/sign-up"
      >
        <Input
          id="user-login"
          type="login"
          name="login"
          inputTitle="Логин"
          minLength="2"
          maxLength="20"
          errorText=""
          value={inputField.login || ""}
          onChange={(event)=>{handleChange(event)}}
          inputClassName="input__field_state_user-login"
          placeholder="Введите логин"
        />
        <Input
          id="user-password"
          type="password"
          name="password"
          inputTitle="Пароль"
          minLength="8"
          maxLength="200"
          value={inputField.password || ""}
          onChange={(event)=>{handleChange(event)}}
          inputClassName="input__field_state_user-password"
          placeholder="Введите пароль"
          autoComplete={"on"}
        />
      </Form>
    </div>
    </div>
  );
}

export default Login;
