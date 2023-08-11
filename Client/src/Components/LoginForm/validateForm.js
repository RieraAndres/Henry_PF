export function validate(user) {
    let errors = {};
    if (!user.userName) {
      errors.userName = "Ingresa tu nombre de usuario";
    }
    if (user.userName.length < 3 || user.userName.length > 20) {
      errors.userName = "El nombre de usuario debe tener entre 3 y 20 caracteres";
    }
    if (!/^[a-zA-Z0-9]+$/.test(user.userName)) {
      errors.userName = "El nombre de usuario solo puede contener letras y números";
    }


    if (!/\d/.test(user.password)) {
      errors.password = "Ingresa una contraseña válida";
    }
    if (user.password.length < 6 || user.password.length > 15) {
      errors.password = "La contraseña debe tener entre 6 y 15 caracteres";
    }
    if (!user.password) {
      errors.password = "Ingresa una contraseña válida";
    }
    return errors;
  }