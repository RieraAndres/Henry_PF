import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validate } from "./validateForm";
import {gapi} from 'gapi-script'
import { useDispatch, useSelector } from "react-redux";
import styles from "./LoginForm.module.css";
import { GoogleLogin } from '@react-oauth/google';
import { logInUser, loginUserGoogle } from "../../Redux/Actions";


function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogedIn = useSelector(state=>state.userLogedIn)


  const  ClientID = '933461258445-6obss3psoedlvnceq9d6d1kt0fa47tfm.apps.googleusercontent.com'

  useEffect(()=>{ //inicia la autentificacion con google
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

  function handleChange(e) {
    e.preventDefault();
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
  
    setUser(updatedUser);
  
    const formErrors = validate(updatedUser);
    setErrors(formErrors);
  }

  function handleSubmit(e){ // al dar submit despachara la action de logInUser
    e.preventDefault();
    dispatch(logInUser(user.userName,user.password))   
  }
  
  if(userLogedIn){ //si el usuario esta logueado que navegue a inicio
    navigate("/inicio")
  } 
  useEffect(() => {
    if (userLogedIn) {
      // Si el usuario ha iniciado sesión con éxito, navegar a la página de inicio
      navigate("/inicio");
    }
  }, [userLogedIn, navigate]);

  //GOOGLE
  const googleSuccess = (credentialResponse)=>{
    const token = credentialResponse.credential
    const [, payload, ] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    dispatch(loginUserGoogle(decodedPayload.email,decodedPayload.given_name,decodedPayload.family_name))
  }

  const googleError = ()=>{
    alert("Ocurrio un problema")
  }
  
  return (
    <div>
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
        <div className={styles.ButtonGoogle}>
          <GoogleLogin className={styles.google} type="standar" shape="pill" size="large" theme= "filled_blue" onSuccess={googleSuccess} onError={googleError}/>
        </div>
      </div>
      </form> 
    </div>
  );
};

export default LoginForm;