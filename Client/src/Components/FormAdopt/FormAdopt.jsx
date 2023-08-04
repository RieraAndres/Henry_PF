import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "../FormAdopt/FormAdopt.module.css";



const FormAdopt = () => {
  const petImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ9fXdpJB0hPO4koiUiXLJHsRKnAhyH7jrBQ&usqp=CAU";
  const petName = "Nombre de la mascota";

  // Estado para manejar el formulario y las validaciones
  const [formData, setFormData] = useState({
    name: "",
    telefono: "",
    email: "",
    releaseDate: "",
    description: ""
  });

  // Estado para manejar el formulario enviado y las validaciones
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validar el formulario
  const validateForm = () => {
    const { name, telefono, email, releaseDate, description } = formData;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const telefonoRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      nameRegex.test(name) &&
      telefonoRegex.test(telefono) &&
      emailRegex.test(email) &&
      releaseDate !== "" &&
      description.length >= 10
    );
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para enviar los datos del formulario
    // Por ejemplo, hacer una llamada a una API para procesar la adopción.
    setFormSubmitted(true); // Marcar el formulario como enviado
  };

  const isFormValid = validateForm();

  return (
    <div className={styles.createDog}>
      <div className={styles.titleCG}>
        <Link to={"/home"}>
          <button id="btnHomeCG" className={styles.goHome}>
            {" "}
            Atrás{" "}
          </button>
        </Link>
        <h1 className={styles.tituloCG}> Formulario Adopción </h1>
      </div>
      <div className={styles.container}>
        <div className={styles.createDogContainer}>
          {/* Form Create */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Name */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="name">
                {/* Nombre Completo */}
              </label>
              <input
                type="text"
                className={styles.input}
                name="name"
                required
                autoComplete="off"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
              />
              {/* <div>
                <p>{error.name}</p>
                </div> */}
            </div>
  
            {/* Telefono */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="telefono">
                {/* Teléfono */}
              </label>
              <input
                type="text"
                className={styles.input}
                name="telefono"
                autoComplete="off"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
  
            {/* Email */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="email">
                {/* Email */}
              </label>
              <input
                type="text"
                className={styles.input}
                name="email"
                required
                autoComplete="off"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
  
            {/* ReleaseDate */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="releaseDate">
                {/* Fecha de Adopción */}
              </label>
              <input
                type="date"
                name="releaseDate"
                id="dateCG"
                className={styles.input}
                required
                autoComplete="off"
                value={formData.releaseDate}
                onChange={handleChange}
              />
            </div>
  
            {/* Description */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="description">
                {/* Razones para adoptar */}
              </label>
              <textarea
                name="description"
                id="descriptionCG"
                minLength="10"
                maxLength="300"
                className={styles.input}
                required
                autoComplete="off"
                placeholder="¿Por qué quieres adoptar?"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
  
            {/* Botón de envío */}
            <button
              type="submit"
              className={`${styles.createBtn} ${isFormValid ? "" : styles.disabled}`}
              disabled={!isFormValid}
            >
              Enviar formulario
            </button>
          </form>
          {/* Mostrar un mensaje de éxito después de enviar el formulario */}
          {formSubmitted && <p>Formulario enviado con éxito.</p>}
        </div>
        {/* Div para la carta de la mascota */}
        <div className={styles.petCard}>
          <div className={styles.petInfo}>
            <h2>{petName}</h2>
            <div className={styles.petImage} style={{ backgroundImage: `url(${petImage})` }}></div>
            <div className={styles.petOptions}>
              <div className={styles.petOption}>Adulto</div>
              <div className={styles.petOption}>Macho</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAdopt;
