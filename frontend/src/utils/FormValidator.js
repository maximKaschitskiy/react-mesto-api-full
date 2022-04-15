const formSelectorsObj = { 
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__form-fieldset', 
  inputSelector: '.popup__form-input', 
  buttonSelector: '.popup__form-submit-button', 
  validationErrorSelector: 'popup__form-input_validation_error', 
  requiredForms: { 
      fieldNameSelector: 'popup__form-input_field_name', 
      fieldStatusSelector: 'popup__form-input_field_status', 
      fieldUserPicSelector: 'popup__form-input_field_userpic-link' 
  },
  editProfileFormSelector: '.popup__form_state_edit-profile', 
  addPlaceFormSelector: '.popup__form_state_add-place', 
  editUserPicFormSelector: '.popup__form_state_edit-userpic' 
} 

class FormValidator { 
  constructor(selectors, currentForm) { 
      this._formSelector = selectors.formSelector; 
      this._inputSelector = selectors.inputSelector; 
      this._fieldsetSelector = selectors.fieldsetSelector; 
      this._buttonSelector = selectors.buttonSelector; 
      this._validationErrorSelector = selectors.validationErrorSelector; 
      this._fieldNameSelector = selectors.fieldNameSelector; 
      this._fieldStatusSelector = selectors.fieldStatusSelector; 
      this._fieldUserPicSelector = selectors.fieldUserPicSelector; 
      this._editProfileFormSelector = selectors.editProfileFormSelector; 
      this._addPlaceFormSelector = selectors.addPlaceFormSelector; 
      this._editUserPicFormSelector = selectors.editUserPicFormSelector;

      this._currentForm = document.querySelector(currentForm);

      this._inputList = Array.from(this._currentForm.querySelectorAll(this._inputSelector));
  }; 

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, inputElement.validationMessage);
    }
  }
  _toggleButtonState(inputList) {
      if (this._hasInvalidInput(inputList)) {
        this._disableBtn();
      } else {
        this._enableBtn();
      }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._currentForm.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._currentForm.querySelector(`.${inputElement.id}-error`); 
    errorElement.textContent = '';
    inputElement.classList.remove(this._errorClass);
  }
  _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => { 
          return !inputElement.validity.valid; 
      }); 
  }
  _enableBtn() {
    const button = this._currentForm.querySelector(this._buttonSelector);
    button.disabled = false;
  }
  _disableBtn() {
    const button = this._currentForm.querySelector(this._buttonSelector);
    button.disabled = true;
  }
  _setEventListeners() {
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList)
      });
    });
  }
  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableBtn()
  }
  enableValidation() {
      this._currentForm.addEventListener('submit', (event) => {
      event.preventDefault();
    })
    this._setEventListeners();
  }
}

export { 
  FormValidator, 
  formSelectorsObj 
}; 