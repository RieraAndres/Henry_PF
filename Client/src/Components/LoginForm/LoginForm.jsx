import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";


function LoginForm() {
  const navigate = useNavigate();

  function validate(user) {
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

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: " ",
    password: " ",
  });

  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta

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
      navigate("/inicio");
    } else {
      setShowAlert(true);
    }
  }

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Ocultar la alerta después de 3 segundos (3000 milisegundos)
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div>
       {showAlert && (
        <div className={` ${styles.alert} alert alert-warning`} role="alert">
          Datos incorrectos
        </div>
      )}
        <form className={styles.loginForm}>
        <h3>INICIAR SESIÓN</h3>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className={`form-control ${errors.userName ? styles.errorInput : ""}`}
            id="userName"
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />
          {errors.userName && <p className={styles.errorMsg}>{errors.userName}</p>}
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
          <button type="submit" onClick={handleSubmit}  >
            Iniciar Sesión
          </button>
          <Link to="/registro">
              <button type="button">Crear una cuenta</button>
          </Link>
        </div>
        <div className={styles.socialLogin}>
        <p>O inicia sesión con</p>
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