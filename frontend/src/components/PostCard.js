import React from "react";

import "./PostCard.css";
import Form from "./Form.js";
import Input from "./Input.js";
import { Link } from "react-router-dom";

function PostCard({ onLoad, onSubmit }) {

  const thisform = React.useRef();

  const [inputField, setInputField] = React.useState({});
  React.useEffect(() => {
    setInputField({});
  }, []);

  const handleChange = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(thisform.current);
  };

  return (
    <div className="post-card">
      <div className="post-card__wrapper">
        <h2 className="post-card__title">Загрузить карточку</h2>
        <Form
          buttonText="Отправить"
          url="/signin"
          onSubmit={handleSubmit}
          formClassName="form_state_post-card"
          bottomLink={"/"}
          refLink={thisform}
        >
          <Input
            id="description-first"
            type="text"
            name="descriptionFirst"
            inputTitle="Описание"
            minLength="2"
            maxLength="20"
            errorText=""
            value={inputField.descriptionFirst || ""}
            onChange={(event) => {
              handleChange(event);
            }}
            inputClassName="input__field_state_post-card"
            placeholder="Первая строка"
          />
          <Input
            id="description-password"
            type="text"
            name="descriptionSecond"
            inputTitle="Описание"
            minLength="2"
            maxLength="20"
            value={inputField.descriptionSecond || ""}
            onChange={(event) => {
              handleChange(event);
            }}
            inputClassName="input__field_state_post-card"
            placeholder="Вторая строка"
            autoComplete={"on"}
          />
          <Input
            id="file"
            type="file"
            name="file"
            inputTitle="Файл"
            value={inputField.file || ""}
            onChange={event => {
              handleChange(event);
            }}
            inputClassName="input__field_state_upload-card"
            placeholder="Введите пароль"
            autoComplete={"on"}
            accept=".jpg,.jpeg,.png"
          />
        </Form>
      </div>
    </div>
  );
}

export default PostCard;
