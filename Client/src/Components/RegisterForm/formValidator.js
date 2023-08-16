export function validate(user) {
    let errors = {};
    
    // Validaciones para el formulario de registro
    if (!user.name) {
      errors.name = "Ingresa tu nombre";
    }
    if (!/^[A-Za-z]+$/.test(user.name)) {
      errors.name = "El nombre debe contener solo letras";
    }

    if (user.name.length < 2 || user.name.length > 50) {
      errors.name = "El nombre de tener entre 2 y 50 caracteres";
    }

    if (!user.lastName) {
      errors.lastName = "Ingresa tu apellido";
    }

    if (!/^[A-Za-z]+$/.test(user.lastName)) {
      errors.lastName = "El apellido debe contener solo letras";
    }

    if (!user.email) {
      errors.email = "Ingresa tu correo electrónico";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      errors.email = "Correo electrónico inválido";
    }

    if (!user.birthdate) {
      errors.birthdate = "Ingresa tu fecha de nacimiento";
    }

    if (!user.userName) {
      errors.userName = "Ingresa tu nombre de usuario";
    } else if (!/^[a-zA-Z0-9]+$/.test(user.userName)) {
      errors.userName = "El nombre de usuario solo puede contener letras y números";
    }

    if (!user.password) {
      errors.password = "Ingresa una contraseña";
    } else if (!/\d/.test(user.password)) {
      errors.password = "La contraseña debe contener al menos un número";
    } else if (user.password.length < 6 || user.password.length > 15) {
      errors.password = "La contraseña debe tener entre 6 y 15 caracteres";
    }

    if (!user.confirmPassword) {
      errors.confirmPassword = "Confirma tu contraseña";
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  }