import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validate } from "./validateForm";
import {gapi} from 'gapi-script'
import { useDispatch, useSelector } from "react-redux";

import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import styles from "./LoginForm.module.css";
import { logInUser, loginUserFacebook, loginUserGoogle } from "../../Redux/Actions";


function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogedIn = useSelector(state=>state.userLogedIn)
  const userDataStorage = useSelector(state => state.userData)
  


  const  ClientID = '933461258445-6obss3psoedlvnceq9d6d1kt0fa47tfm.apps.googleusercontent.com'
  const appID = '786345766571360'

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
    // Verifica si el usuario ya está autenticado
    const authToken = localStorage.getItem("authUser");
    if (authToken) {
      navigate("/inicio"); // Redirige al inicio si el usuario ya está autenticado
    }
  }, [navigate]);


  //GOOGLE
  const onSuccess = (response) => {
    console.log('login Success current user:', response.profileObj);
    dispatch(loginUserGoogle(response.profileObj.email,response.profileObj.givenName,response.profileObj.familyName ))
    navigate("/inicio")
  }

  const onFailure= (response) => {
    window.alert("Error de Servidor")
  }

  //FACEBOOK
  const responseFacebook = (response) => {
    console.log(response)
    dispatch(loginUserFacebook(response.id,response.first_name,response.last_name))
    navigate("/inicio")
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
        <div>
            {/* <a href=""> <img src="https://img.freepik.com/iconos-gratis/google_318-258888.jpg" alt="googleLogo" /> </a>
            <a href=""> <img src= "https://img.freepik.com/iconos-gratis/facebook_318-157463.jpg" alt="facebookLogo" /> </a> */}
            <GoogleLogin clientId={ClientID} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy="single_host_origin"  isSignedIn={false}/>
            <FacebookLogin appId={appID} autoLoad={false} fields="first_name,last_name" callback={responseFacebook} icon='fa-facebook' textButton="Facebook" buttonStyle={{backgroundColor: 'blue'}} scope="public_profile" redirectUri={`${window.location.origin}/facebook-redirect`}/>
        </div>
      </div>
      </form> 
    </div>
  );
};

export default LoginForm;