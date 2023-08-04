import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar a la ruta de inicio después del inicio de sesión
import RegisterForm from "../RegisterForm/RegisterForm";
import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";


function LoginForm() {
  const navigate = useNavigate();

  function validate(user) {
    let errors = {};
    if (!user.username) {
      errors.username = "Ingresa tu nombre de usuario";
    }
    else if (user.username.length < 3 || user.username.length > 20) {
      errors.username = "El nombre de usuario debe tener entre 3 y 20 caracteres";
    }
    else if (!/^[a-zA-Z0-9]+$/.test(user.username)) {
      errors.username = "El nombre de usuario solo puede contener letras y números";
    }


    if (!/\d/.test(user.password)) {
      errors.password = "Ingresa una contraseña válida";
    }
    else if (user.password.length < 6 || user.password.length > 15) {
      errors.password = "La contraseña debe tener entre 6 y 15 caracteres";
    }
    else if (!user.password) {
      errors.password = "Ingresa una contraseña válida";
    }
    return errors;
  }

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: " ",
    password: " ",
  });

  function handleChange(e) {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
  }

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   navigate("/inicio"); // redireccionamos a la ruta de inicio después del inicio de sesión.
  // };

  
function handleSubmit(e) {
  e.preventDefault();
  const formErrors = validate(user);
  setErrors(formErrors);
  if (Object.keys(formErrors).length === 0) {
    navigate("/inicio"); // redireccionamos a la ruta de inicio después del inicio de sesión.
  } else {
    alert("Datos incorrectos");
  }
}

  return (
    <div>
        <form className={styles.loginForm}>
        <h3>INICIAR SESIÓN</h3>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? styles.errorInput : ""}`}
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          {errors.username && <p className={styles.errorMsg}>{errors.username}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? styles.errorInput : ""}`}
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} >
            Iniciar Sesión
          </button>
          <Link to="/registro">
              <button type="button">Crear una cuenta</button>
          </Link>
        </div>
        <div className={styles.socialLogin}>
        <p>O inicia sesión con:</p>
        <div>
            <a href=""> <img src="https://img.freepik.com/iconos-gratis/google_318-258888.jpg" alt="googleLogo" /> </a>
            <a href=""> <img src= "https://img.freepik.com/iconos-gratis/facebook_318-157463.jpg" alt="facebookLogo" /> </a>
        </div>
      </div>
      </form>
    </div>
  );
};

export default LoginForm;