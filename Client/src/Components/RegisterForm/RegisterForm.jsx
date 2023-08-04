import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar a la ruta de inicio después del registro

import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const navigate = useNavigate();

  function validate(user) {
    let errors = {};

    // Validaciones para el formulario de registro
    if (!user.nombre) {
      errors.nombre = "Ingresa tu nombre";
    }

    if (!user.apellido) {
      errors.apellido = "Ingresa tu apellido";
    }

    if (!user.email) {
      errors.email = "Ingresa tu correo electrónico";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      errors.email = "Correo electrónico inválido";
    }

    if (!user.fechaNacimiento) {
      errors.fechaNacimiento = "Ingresa tu fecha de nacimiento";
    }

    if (!user.username) {
      errors.username = "Ingresa tu nombre de usuario";
    } else if (!/^[a-zA-Z0-9]+$/.test(user.username)) {
      errors.username = "El nombre de usuario solo puede contener letras y números";
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
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    username: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
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
      navigate("/inicio"); // Redireccionamos a la ruta de login después del registro.
    } else {
      setErrors(formErrors);
    }
  }

  return (
    <div className={styles.registerForm}>
      <form>
        <h3>REGISTRARSE</h3>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className={`form-control ${errors.nombre ? styles.errorInput : ""}`}
            id="nombre"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p className={styles.errorMsg}>{errors.nombre}</p>}
        </div>

        {/* Campo Apellido */}
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className={`form-control ${errors.apellido ? styles.errorInput : ""}`}
            id="apellido"
            name="apellido"
            value={user.apellido}
            onChange={handleChange}
          />
          {errors.apellido && <p className={styles.errorMsg}>{errors.apellido}</p>}
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
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

         {/* Campo Username */}
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

        {/* Campo Fecha de Nacimiento */}
        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">
            Fecha de Nacimiento
          </label>
          <input
            type="text"
            className={`form-control ${errors.fechaNacimiento ? styles.errorInput : ""}`}
            id="fechaNacimiento"
            name="fechaNacimiento"
            placeholder=" Año/mes/día"
            value={user.fechaNacimiento}
            onChange={handleChange}
          />
          {errors.fechaNacimiento && <p className={styles.errorMsg}>{errors.fechaNacimiento}</p>}
        </div>

        {/* Campo Teléfono */}
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className={`form-control ${errors.telefono ? styles.errorInput : ""}`}
            id="telefono"
            name="telefono"
            value={user.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <p className={styles.errorMsg}>{errors.telefono}</p>}
        </div>

        {/* Campo Dirección */}
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className={`form-control ${errors.direccion ? styles.errorInput : ""}`}
            id="direccion"
            name="direccion"
            value={user.direccion}
            onChange={handleChange}
          />
          {errors.direccion && <p className={styles.errorMsg}>{errors.direccion}</p>}
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