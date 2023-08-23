import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para readdressar a la ruta de inicio después del registro
import { postUser } from "../../Redux/Actions";
import { useDispatch , useSelector } from "react-redux";
import { validate } from "./formValidator";



import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userCreated = useSelector((state)=>state.userCreated) //para evaluar si debo navegar al login o no

  

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    birthdate: "",
    userName: "",
    password: "",
    confirmPassword: "",
    numberPhone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

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

  function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validate(user);
    if (Object.keys(formErrors).length === 0) {
      dispatch(postUser(user))
      if(!userCreated){
      navigate("/"); // Readdressamos a la ruta de inicio después del registro exitoso.
      }
    } else {
      setErrors(formErrors);
    }
  }

  return (
    <div className={styles.registerForm}>
      <form>
        <h3>REGISTRARSE</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? styles.errorInput : ""}`}
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
        </div>

        {/* Campo lastName */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? styles.errorInput : ""}`}
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className={styles.errorMsg}>{errors.lastName}</p>}
        </div>

        {/* Campo email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? styles.errorInput : ""}`}
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
        </div>

         {/* Campo userName */}
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

        {/* Campo Fecha de Nacimiento */}
        <div className="mb-3">
          <label htmlFor="birthdate" className="form-label">
            Fecha de Nacimiento
          </label>
          <input 
          type="date" 
          id="birthdate" 
          name="birthdate" 
          value={user.birthdate} 
          min="1905-01-01" 
          max="2023-01-01"
          onChange={handleChange} 
          className={`form-control ${errors.birthdate ? styles.errorInput : ""}`}/>
          {errors.birthdate && <p className={styles.errorMsg} style={{marginTop:"10px"}}>{errors.birthdate}</p>}
        </div>

        {/* Campo Teléfono */}
        <div className="mb-3">
          <label htmlFor="numberPhone" className="form-label">
            Teléfono
          </label>
          <input
            type="number"
            className={`form-control ${errors.numberPhone ? styles.errorInput : ""}`}
            id="numberPhone"
            name="numberPhone"
            value={user.numberPhone}
            onChange={handleChange}
          />
          {errors.numberPhone && <p className={styles.errorMsg}>{errors.numberPhone}</p>}
        </div>

        {/* Campo Dirección */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className={`form-control ${errors.address ? styles.errorInput : ""}`}
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
          {errors.address && <p className={styles.errorMsg}>{errors.address}</p>}
        </div>

        {/* Campo Contraseña */}
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

        {/* Campo Confirmar Contraseña */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? styles.errorInput : ""}`}
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword}</p>}
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            Crear una cuenta
          </button>
        </div>
      </form>
    </div>
  );
};


export default RegisterForm;