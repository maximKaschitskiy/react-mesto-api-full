import React from "react";

import "./Register.css";
import Form from "./Form";
import Input from "./Input";
import { Link } from "react-router-dom";

function Register({ onLoad, onSubmit }) {
  
  const [inputField, setInputField] = React.useState({});

  React.useEffect(() => {
    setInputField({});
  }, []);

  const handleChange = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputField);
  };

  return (
    <div className="register">
      <div className="register__wrapper">
        <h2 className="register__title">Регистрация</h2>
        <Form
          buttonText="Зарегистрироваться"
          text="Уже зарегистрированы?"
          url="/signin"
          linkText="Войти"
          onSubmit={handleSubmit}
          formClassName="form_state_register"
          bottomLink={"/sign-in"}
        >
          <Input
            id="user-login"
            type="text"
            name="login"
            inputTitle="Логин"
            minLength="2"
            maxLength="20"
            errorText=""
            value={inputField.login || ""}
            onChange={(event) => {
              handleChange(event);
            }}
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
            onChange={(event) => {
              handleChange(event);
            }}
            inputClassName="input__field_state_user-password"
            placeholder="Введите пароль"
            autoComplete={"on"}
          />
        </Form>
      </div>
    </div>
  );
}

export default Register;
