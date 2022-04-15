import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function PopupAvatarEdit( {isOpen, onClose, onLoad, onChangeUserpic} ) {

  const [currentUser] = React.useContext(CurrentUserContext);
  const [inputField , setInputField] = React.useState({
    avatar: ''
  })

  const handleChange = (event) =>{
    setInputField( { ...inputField,
      [event.target.name]: event.target.value
    } );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onChangeUserpic(inputField);
  }

  React.useEffect(() => {
    setInputField( {avatar: currentUser.avatar
                  } );
  }, [currentUser, isOpen]);

  return (
      <PopupWithForm
      className={"popup__form popup__form_state_edit-userpic"}
      isOpen={isOpen}
      onClose={onClose}
      onLoad={onLoad}
      formTitle={"Обновить аватар"}
      buttonTitle={"Сохранить"}
      buttonTitleLoading={"Сохранение..."}
      onSubmit={handleSubmit}
      >
        <input type="url" placeholder="Ссылка на картинку" className="popup__form-input popup__form-input_field_userpic-link" name="avatar" id="userpic-link-field" value={inputField.avatar || ''} onChange={(event)=>{handleChange(event)}} required />
        <span className="popup__form-error-text popup__form-error-text_message_userpic-link userpic-link-field-error"></span>
      </PopupWithForm>
    );
  }

  export default PopupAvatarEdit;
