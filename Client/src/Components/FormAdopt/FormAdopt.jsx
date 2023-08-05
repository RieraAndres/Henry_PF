import React, { useState, useEffect } from "react";
import styles from "../FormAdopt/FormAdopt.module.css";

const FormAdopt = () => {
  const [formData, setFormData] = useState({
    name: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const nameRegex = /^[a-zA-Z\s]+$/;
  const telefonoRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    // Actualizar el valor de fechaNacimiento en el estado del formulario
    if (day && month && year) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fechaNacimiento: `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`,
      }));
    }
  }, [day, month, year]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const years = Array.from(
    { length: new Date().getFullYear() - 1904 },
    (_, i) => i + 1905
  );
  // Función para calcular la edad
  const calcularEdad = (fechaNacimiento) => {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - fechaNacimientoDate.getFullYear();
    const monthDiff = today.getMonth() - fechaNacimientoDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < fechaNacimientoDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Función para validar la fecha de nacimiento
  const validarFechaNacimiento = (fechaNacimiento) => {
    if (!fechaNacimiento) {
      return "Por favor, ingrese una fecha de nacimiento";
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fechaNacimiento)) {
      return "El formato de fecha no es válido";
    }

    const age = calcularEdad(fechaNacimiento);
    if (age < 21) {
      return "Debe tener al menos 21 años para adoptar";
    }

    // if (age >= 100) {
    //   return "La edad máxima permitida es de 99 años";
    // }

    return "";
  };

  const validateForm = () => {
    const { name, telefono, email, descripcion, fechaNacimiento } = formData;

    const newErrors = {};

    if (!name) {
      newErrors.name = "El nombre es obligatorio";
    } else if (!nameRegex.test(name)) {
      newErrors.name = "El nombre no es válido";
    }

    if (!telefono) {
      newErrors.telefono = "Por favor, ingrese número de teléfono";
    } else if (!telefonoRegex.test(telefono)) {
      newErrors.telefono = "El teléfono debe ser un número";
    }

    if (!email) {
      newErrors.email = "Por favor, ingrese un email válido";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Ingrese un email válido";
    }

    // Validar fecha de nacimiento
    const fechaNacimientoError = validarFechaNacimiento(fechaNacimiento);
    if (fechaNacimientoError) {
      newErrors.fechaNacimiento = fechaNacimientoError;
    }

    if (!descripcion || descripcion.length < 10) {
      newErrors.descripcion =
        "Por favor, ingrese una descripción con al menos 10 caracteres";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    // Devolvemos la validez del formulario actual
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormSubmitted(false); // Añade esta línea para habilitar el botón nuevamente al cambiar un campo

    // Validar campo de fecha al cambiar su valor
    if (name === "fechaNacimiento") {
      const errorMessage = validarFechaNacimiento(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className={styles.createDog}>
      <div className={styles.container}>
        <div className={styles.createDogContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Name */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="name">
                {/* Nombre Completo: */}
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
              {errors.name && (
                <p className={styles.errorText}>{errors.name}</p>
              )}
            </div>

            {/* Telefono */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="telefono">
                {/* Teléfono: */}
              </label>
              <input
                type="text"
                className={styles.input}
                name="telefono"
                required
                autoComplete="off"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
              />
              {errors.telefono && (
                <p className={styles.errorText}>{errors.telefono}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="email">
                {/* Email: */}
              </label>
              <input
                type="email"
                className={styles.input}
                name="email"
                required
                autoComplete="off"
                placeholder="Ingrese un email válido"
                value={formData.email}
                onChange={handleChange}
              />
              <div>
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                  // <span className={styles.errorTextEmail}>{errors.email}</span>
                )}
              </div>
            </div>

            {/* Fecha de Nacimiento */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="fechaNacimiento">
                Fecha de Nacimiento:
              </label>
              <div className={styles.customDateInput}>
                {/* <input
        type="date"
        name="fechaNacimiento"
        id="fecha"
        min="1905-01-01" max="2023-08-05"
        className={`${styles.input} ${styles.centerDate}`}
        required
        autoComplete="off"
        value={formData.fechaNacimiento}
        onChange={handleChange}
        onBlur={(e) => {
          const { name, value } = e.target;
          const errorMessage = validarFechaNacimiento(value);
          setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
        }}
      /> */}
                <div>
                  <label></label>
                  <select
                    className={styles.formGroup}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <label></label>
                  <select
                    className={styles.formGroup}
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {months.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <label></label>
                  <select
                    className={styles.formGroup}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.fechaNacimiento && (
                  <p className={styles.errorText}>{errors.fechaNacimiento}</p>
                )}
              </div>
            </div>

            {/* Descripcion */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="descripcion">
                Razones para adoptar:
              </label>
              <textarea
                name="descripcion"
                id="descripcionCG"
                rows="4"
                style={{ resize: "none" }} // Bloquear el estiramiento del textarea
                minLength="10"
                maxLength="300"
                //className={styles.input}
                required
                autoComplete="off"
                placeholder="¿Por qué quieres adoptar?"
                value={formData.descripcion}
                onChange={handleChange}
              ></textarea>
              {errors.descripcion && (
                <p className={styles.errorText}>{errors.descripcion}</p>
              )}
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              className={`${styles.createBtn} ${
                formSubmitted && !isFormValid ? styles.disabled : ""
              }`}
              disabled={formSubmitted && !isFormValid}
            >
              Enviar formulario
            </button>

            {/* Mostrar un mensaje de éxito después de enviar el formulario */}
            {formSubmitted && <p>Formulario enviado con éxito.</p>}
          </form>
        </div>
      </div>
      <div class="arrowRight"></div>
    </div>
  );
};

export default FormAdopt;
