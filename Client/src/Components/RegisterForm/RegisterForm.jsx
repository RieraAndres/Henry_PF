import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para readdressar a la ruta de inicio después del registro

import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const navigate = useNavigate();

  function validate(user) {
    let errors = {};

    // Validaciones para el formulario de registro
    if (!user.name) {
      errors.name = "Ingresa tu nombre";
    }

    if (!user.lastName) {
      errors.lastName = "Ingresa tu apellido";
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
      navigate("/inicio"); // Readdressamos a la ruta de login después del registro.
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
            type="text"
            className={`form-control ${errors.birthdate ? styles.errorInput : ""}`}
            id="birthdate"
            name="birthdate"
            placeholder=" Año/mes/día"
            value={user.birthdate}
            onChange={handleChange}
          />
          {errors.birthdate && <p className={styles.errorMsg}>{errors.birthdate}</p>}
        </div>

        {/* Campo Teléfono */}
        <div className="mb-3">
          <label htmlFor="numberPhone" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
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