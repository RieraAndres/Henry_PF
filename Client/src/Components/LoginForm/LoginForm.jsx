import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validate } from "./validateForm";
import {gapi} from 'gapi-script'
import { useDispatch, useSelector } from "react-redux";
import styles from "./LoginForm.module.css";
import { GoogleLogin } from '@react-oauth/google';
import { logInUser,loginUserSuccess, loginUserGoogle } from "../../Redux/Actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDataStorage = useSelector(state => state.userData)
  


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

    dispatch(logInUser(user.userName, user.password))
    .then((result) => {
      if (result.success) {
        toast.success("Te logueaste con exito", {
          position: "top-center",
          autoClose: 1000,
          onClose:()=>{
            navigate("/inicio")
          }
        });
      } else {
        // Muestra un mensaje de error al usuario en caso de inicio de sesión fallido
        toast.error("Inicio de sesión fallido. Verifica tus credenciales.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    })
    .catch((error) => {
      console.error("Error en el inicio de sesión:", error);
    }); 

  }
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  useEffect(() => {
    // Verifica si el usuario ya está autenticado
    const authToken = localStorage.getItem("authUser");
    if (authToken) {
      navigate("/inicio"); // Redirige al inicio si el usuario ya está autenticado
    }
  }, [navigate]);

  //GOOGLE
  const googleSuccess = (credentialResponse)=>{
    const token = credentialResponse.credential
    const [, payload, ] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    dispatch(loginUserGoogle(decodedPayload.email,decodedPayload.given_name,decodedPayload.family_name))
    .then((response) => {
      if (response.success) {
        toast.success("Te logueaste con exito", {
          position: "top-center",
          autoClose: 1000,
          onClose:()=>{
            navigate("/inicio")
          }
        });
      } else {
        throw Error('Ingrese usuario valido')
      }
    });
    setIsGoogleLogin(true);
  
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
      <ToastContainer />
      </form> 
    </div>
  );
};

export default LoginForm;