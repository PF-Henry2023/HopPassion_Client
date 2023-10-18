const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const numberRegex = /^(?:[0-9]|[1-9][0-9]{1,2}|1000)/;
const wordRegex = /^[A-Za-z\u00C0-\u024F\s]+$/;

function validation(input) {
  let errors = {};

  if (input.name && (!wordRegex.test(input.name) || input.name.length < 2)) {
    errors.name = true;
}

  if (
    input.lastName &&
    (!wordRegex.test(input.lastName) || input.lastName.length < 2)
  ) {
    errors.lastName = true;
  }

  if (
    input.password &&
    input.password.length > 0 &&
    !passwordRegex.test(input.password)
  ) {
    errors.password = true;
  }

  if (
    input.phone &&
    input.phone.length > 0 &&
    (!numberRegex.test(input.phone) || input.phone.length !== 10)
  ) {
    errors.phone = true;
  }

  return errors;
}

function isButtonDisabled(errors, input) {
  return (
    Object.values(errors).some((value) => value === true) ||
    (!input.name && !input.lastName && !input.password && !input.phone)
  );
}

export { validation, isButtonDisabled };
