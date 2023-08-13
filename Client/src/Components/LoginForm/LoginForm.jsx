import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validate } from "./validateForm";
import {gapi} from 'gapi-script'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import styles from "./LoginForm.module.css";


function LoginForm() {
  const navigate = useNavigate();

  const ClientID = '933461258445-6obss3psoedlvnceq9d6d1kt0fa47tfm.apps.googleusercontent.com'
  const appID = '786345766571360'

  useEffect(()=>{
      function start(){
        gapi.client.init({
        ClientId: ClientID,
        scope:''
      })
    }
      gapi.load("client:auth2" , start)
    },[]
  )

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

  const onSuccess = (response) => {
    console.log('login Success current user:', response.profileObj);
    navigate("/inicio")
  }

  const onFailure= (response) => {
    console.log("Ocurrio un Problema", response);
  }

  const responseFacebook = (response) => {
    console.log(response);


  }

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
            {/* <a href=""> <img src="https://img.freepik.com/iconos-gratis/google_318-258888.jpg" alt="googleLogo" /> </a>
            <a href=""> <img src= "https://img.freepik.com/iconos-gratis/facebook_318-157463.jpg" alt="facebookLogo" /> </a> */}
            <GoogleLogin clientId={ClientID} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy="single_host_origin" isSignedIn={true}/>
            <FacebookLogin appId={appID} autoLoad={false} fields="first_name,last_name" callback={responseFacebook} icon='fa-facebook' textButton="Facebook" buttonStyle={{backgroundColor: 'blue'}} scope="public_profile" redirectUri={`${window.location.origin}/facebook-redirect`}/>
        </div>
      </div>
      </form> 
    </div>
  );
};

export default LoginForm;