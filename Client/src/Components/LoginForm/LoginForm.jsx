import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar a la ruta de inicio después del inicio de sesión

import styles from "./LoginForm.module.css";
function LoginForm() {
  const navigate = useNavigate();

  function validate(user) {
    let errors = {};
    if (!user.username) {
      errors.username = "Enter your username";
    }
    if (user.username.length < 3 || user.username.length > 20) {
      errors.username = "Username must be 3 to 20 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(user.username)) {
      errors.username = "Username can only contain letters, numbers, and underscores";
    }
    if (!/\d/.test(user.password)) {
      errors.password = "Password must contain a number";
    }
    if (user.password.length < 6 || user.password.length > 15) {
      errors.password = "Password must be 6 to 15 characters";
    }
    if (!user.password) {
      errors.password = "Enter a password";
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
  if (!errors.username && !errors.password) {
    navigate("/inicio"); // redireccionamos a la ruta de inicio después del inicio de sesión.
  } else {
    alert("Datos incorrectos");
  }
}

  return (
    <div className={styles.loginForm}>
      <form>
        <h3>INICIAR SESIÓN</h3>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} >
            Iniciar Sesión
          </button>
          <button type="button">
            Crear una cuenta
          </button>
        </div>
      </form>
      <div className={styles.socialLogin}>
        <p>O inicia sesión con:</p>
        <div>
            <a href=""> <img src="https://img.freepik.com/iconos-gratis/google_318-258888.jpg" alt="googleLogo" /> </a>
            <a href=""> <img src= "https://img.freepik.com/iconos-gratis/facebook_318-157463.jpg" alt="facebookLogo" /> </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;