export function validate(userData) {
  let errors = {};
  //valida creacion de mail
  if (userData.createdEmail.length) {
    if (
      !/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(userData.createdEmail)
    ) {
      errors.createdEmail = "Correo electrónico inválido";
    }
  }

  //valida todas las contraseñas
  if (userData.userNewPasswordToDispatch.length) {
    if (!/\d/.test(userData.userNewPasswordToDispatch)) {
      errors.userNewPasswordToDispatch = "La contraseña debe tener un número";
    }
    if (
      userData.userNewPasswordToDispatch.length < 6 ||
      userData.userNewPasswordToDispatch.length > 15
    ) {
      errors.userNewPasswordToDispatch =
        "La contraseña debe tener entre 6 y 15 caracteres";
    }
  }

  if (userData.userNewPassword.length) {
    if (!/\d/.test(userData.userNewPassword)) {
      errors.userNewPassword = "La contraseña debe tener un número";
    }
    if (
      userData.userNewPassword.length < 6 ||
      userData.userNewPassword.length > 15
    ) {
      errors.userNewPassword =
        "La contraseña debe tener entre 6 y 15 caracteres";
    }
  }

  if (userData.createdPassword.length) {
    if (!/\d/.test(userData.createdPassword)) {
      errors.createdPassword = "La contraseña debe tener un número";
    }
    if (
      userData.createdPassword.length < 6 ||
      userData.createdPassword.length > 15
    ) {
      errors.createdPassword =
        "La contraseña debe tener entre 6 y 15 caracteres";
    }
  }

  if (userData.createdPasswordToDispatch.length) {
    if (!/\d/.test(userData.createdPasswordToDispatch)) {
      errors.createdPasswordToDispatch = "La contraseña debe tener un número";
    }
    if (
      userData.createdPasswordToDispatch.length < 6 ||
      userData.createdPasswordToDispatch.length > 15
    ) {
      errors.createdPasswordToDispatch =
        "La contraseña debe tener entre 6 y 15 caracteres";
    }
  }
  //valida userName
  if (!/^[a-zA-Z0-9]+$/.test(userData.userName)) {
    errors.userName =
      "El nombre de usuario solo puede contener letras y números";
  }
  if (userData.userName.length < 3 || userData.userName.length > 20) {
    errors.userName = "El nombre de usuario debe tener entre 3 y 20 caracteres";
  }

  //valida name
  if (userData.name.length < 2 || userData.name.length > 50) {
    errors.name = "El nombre de tener entre 2 y 50 caracteres";
  }

  //valida image
  if (!userData.image) {
    errors.image = "Por favor, inserte una imagen";
  } else {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/psd",
      "image/gif",
      "text",
    ];
    if (!allowedTypes.includes(userData.image.type)) {
      errors.image = "El formato de imagen debe ser: .jpg, .png, .psd o .gif";
    }
  }

  return errors;
}
