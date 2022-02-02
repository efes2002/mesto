function showInputError(arg, inputElement, errorMessage) {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(arg.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(arg.errorClass);
};

function hideInputError(arg, inputElement) {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(arg.inputErrorClass);
  errorElement.classList.remove(arg.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(arg, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(arg, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(arg, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(arg, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(arg.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(arg.inactiveButtonClass);
  }
};

function setEventListeners(arg, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(arg.inputSelector));
  const buttonElement = formElement.querySelector(arg.submitButtonSelector);
  toggleButtonState(arg, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', ()=>{
      checkInputValidity(arg, inputElement);
      toggleButtonState(arg, inputList, buttonElement);
    });
  });
};

function enableValidation(arg) {
  const formList = Array.from(document.querySelectorAll(arg.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(arg, formElement);
  });
};


